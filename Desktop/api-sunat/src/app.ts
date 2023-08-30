import express from 'express';
import { Request, Response } from 'express';
import 'express-validator';
import { handleJsonError, validateRequestBody, escapeDataInResponse } from './security';
import { validateFacturaData } from './validations';

const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware para capturar errores en el JSON
app.use(handleJsonError);

// Simulación de una base de datos para almacenar las facturas
const facturas: any[] = [];

// Endpoint para registrar una factura
app.post('/api/registrar-factura', validateRequestBody, (req: Request, res: Response) => {
    const facturaData = req.body;

    // Escapar los datos antes de almacenarlos en la base de datos
    const escapedFacturaData = escapeDataInResponse(req, facturaData);

    // Validar los datos y obtener el mensaje de error si falla la validación
    const validationResult = validateFacturaData(facturaData);
    if (validationResult !== true) {
        return res.status(400).json({ message: validationResult });
    }

    // Agregar la factura a la base de datos
    facturas.push(escapedFacturaData);

    // Mostrar las facturas registradas en la consola
    console.log('Facturas registradas:', facturas);

    // Responder con una confirmación
    return res.status(201).json({ message: 'Factura registrada correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
