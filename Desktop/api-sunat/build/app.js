"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("./validations");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const facturas = [];
app.post('/api/registrar-factura', (req, res) => {
    const facturaData = req.body;
    const validationResult = (0, validations_1.validateFacturaData)(facturaData);
    if (validationResult !== true) {
        return res.status(400).json({ message: validationResult });
    }
    facturas.push(facturaData);
    console.log('Facturas registradas:', facturas);
    return res.status(201).json({ message: 'Factura registrada correctamente' });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
//# sourceMappingURL=app.js.map