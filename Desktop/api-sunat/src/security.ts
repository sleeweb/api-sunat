import { Response, NextFunction, Request } from 'express';
import { body } from 'express-validator';
import escape from 'lodash/escape';

// Función para escapar datos
export function escapeData(data: string): string {
  return escape(data);
}

export function handleJsonError(err: any, _req: Request, res: Response, _next: NextFunction): Response<any, Record<string, any>> {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ message: 'El JSON está mal formado' });
    }
     // Detectar código malicioso en los datos y mostrar un mensaje de alerta
     const maliciousCode = detectMaliciousCode(_req.body);
     if (maliciousCode) {
         return res.status(400).json({ message: 'Se ha detectado código malicioso en la solicitud' });
     }
    return res.status(500).json({ message: 'Ha ocurrido un error interno' });
}
// Función para detectar código malicioso en los datos
function detectMaliciousCode(data: any): boolean {
    const pattern = /<script|<img|onerror|javascript:|&#x3C;|&#x3E;/i;
    return JSON.stringify(data).match(pattern) !== null;
}
export const validateRequestBody = [
    body('ublVersion').notEmpty(),
    body('fecVencimiento').notEmpty(),
    body('tipoOperacion').notEmpty(),
    body('tipoDoc').notEmpty(),
    body('serie').notEmpty(),
    body('correlativo').notEmpty(),
    body('fechaEmision').notEmpty(),
    body('formaPago.moneda').notEmpty(),
    body('formaPago.tipo').notEmpty(),
    body('tipoMoneda').notEmpty(),
    body('client.tipoDoc').notEmpty(),
    body('client.numDoc').notEmpty(),
    body('client.rznSocial').notEmpty(),
    body('client.address.direccion').notEmpty(),
    body('client.address.provincia').notEmpty(),
    body('client.address.departamento').notEmpty(),
    body('client.address.distrito').notEmpty(),
    body('client.address.ubigueo').notEmpty(),
    body('company.ruc').notEmpty(),
    body('company.razonSocial').notEmpty(),
    body('company.nombreComercial').notEmpty(),
    body('company.address.direccion').notEmpty(),
    body('company.address.provincia').notEmpty(),
    body('company.address.departamento').notEmpty(),
    body('company.address.distrito').notEmpty(),
    body('company.address.ubigueo').notEmpty(),
    body('mtoOperGravadas').notEmpty(),
    body('mtoOperExoneradas').notEmpty(),
    body('mtoIGV').notEmpty(),
    body('totalImpuestos').notEmpty(),
    body('valorVenta').notEmpty(),
    body('subTotal').notEmpty(),
    body('mtoImpVenta').notEmpty(),
    body('details.*.codProducto').notEmpty(),
    body('details.*.unidad').notEmpty(),
    body('details.*.descripcion').notEmpty(),
    body('details.*.cantidad').notEmpty(),
    body('details.*.mtoValorUnitario').notEmpty(),
    body('details.*.mtoValorVenta').notEmpty(),
    body('details.*.mtoBaseIgv').notEmpty(),
    body('details.*.porcentajeIgv').notEmpty(),
    body('details.*.igv').notEmpty(),
    body('details.*.tipAfeIgv').notEmpty(),
    body('details.*.totalImpuestos').notEmpty(),
    body('details.*.mtoPrecioUnitario').notEmpty(),
];

// Escapar datos antes de mostrarlos en las respuestas
export function escapeDataInResponse(req: Request, _data: any): any {
    const dataToSend = {
        ublVersion: escapeData(req.body.ublVersion),
        fecVencimiento: escapeData(req.body.fecVencimiento),
        tipoOperacion: escapeData(req.body.tipoOperacion),
        tipoDoc: escapeData(req.body.tipoDoc),
        serie: escapeData(req.body.serie),
        correlativo: req.body.correlativo,
        fechaEmision: escapeData(req.body.fechaEmision),
        formaPago: {
            moneda: escapeData(req.body.formaPago.moneda),
            tipo: escapeData(req.body.formaPago.tipo)
        },
        tipoMoneda: escapeData(req.body.tipoMoneda),
        client: {
            tipoDoc: req.body.client.tipoDoc,
            numDoc: req.body.client.numDoc,
            rznSocial: escapeData(req.body.client.rznSocial),
            address: {
                direccion: escapeData(req.body.client.address.direccion),
                provincia: escapeData(req.body.client.address.provincia),
                departamento: escapeData(req.body.client.address.departamento),
                distrito: escapeData(req.body.client.address.distrito),
                ubigueo: req.body.client.address.ubigueo
            }
        },
        company: {
            ruc: req.body.company.ruc,
            razonSocial: escapeData(req.body.company.razonSocial),
            nombreComercial: escapeData(req.body.company.nombreComercial),
            address: {
                direccion: escapeData(req.body.company.address.direccion),
                provincia: escapeData(req.body.company.address.provincia),
                departamento: escapeData(req.body.company.address.departamento),
                distrito: escapeData(req.body.company.address.distrito),
                ubigueo: req.body.company.address.ubigueo
            }
        },
        mtoOperGravadas: req.body.mtoOperGravadas,
        mtoOperExoneradas: req.body.mtoOperExoneradas,
        mtoIGV: req.body.mtoIGV,
        totalImpuestos: req.body.totalImpuestos,
        valorVenta: req.body.valorVenta,
        subTotal: req.body.subTotal,
        mtoImpVenta: req.body.mtoImpVenta,
        details: req.body.details.map((detalle: any) => ({
            codProducto: escapeData(detalle.codProducto),
            unidad: escapeData(detalle.unidad),
            descripcion: escapeData(detalle.descripcion),
            cantidad: detalle.cantidad,
            mtoValorUnitario: detalle.mtoValorUnitario,
            mtoValorVenta: detalle.mtoValorVenta,
            mtoBaseIgv: detalle.mtoBaseIgv,
            porcentajeIgv: detalle.porcentajeIgv,
            igv: detalle.igv,
            tipAfeIgv: detalle.tipAfeIgv,
            totalImpuestos: detalle.totalImpuestos,
            mtoPrecioUnitario: detalle.mtoPrecioUnitario
        }))
    };
    return dataToSend;
}