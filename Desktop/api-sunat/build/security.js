"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeDataInResponse = exports.validateRequestBody = exports.handleJsonError = exports.escapeData = void 0;
const express_validator_1 = require("express-validator");
const escape_1 = __importDefault(require("lodash/escape"));
function escapeData(data) {
    return (0, escape_1.default)(data);
}
exports.escapeData = escapeData;
function handleJsonError(err, _req, res, _next) {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ message: 'El JSON está mal formado' });
    }
    const maliciousCode = detectMaliciousCode(_req.body);
    if (maliciousCode) {
        return res.status(400).json({ message: 'Se ha detectado código malicioso en la solicitud' });
    }
    return res.status(500).json({ message: 'Ha ocurrido un error interno' });
}
exports.handleJsonError = handleJsonError;
function detectMaliciousCode(data) {
    const pattern = /<script|<img|onerror|javascript:|&#x3C;|&#x3E;/i;
    return JSON.stringify(data).match(pattern) !== null;
}
exports.validateRequestBody = [
    (0, express_validator_1.body)('ublVersion').notEmpty(),
    (0, express_validator_1.body)('fecVencimiento').notEmpty(),
    (0, express_validator_1.body)('tipoOperacion').notEmpty(),
    (0, express_validator_1.body)('tipoDoc').notEmpty(),
    (0, express_validator_1.body)('serie').notEmpty(),
    (0, express_validator_1.body)('correlativo').notEmpty(),
    (0, express_validator_1.body)('fechaEmision').notEmpty(),
    (0, express_validator_1.body)('formaPago.moneda').notEmpty(),
    (0, express_validator_1.body)('formaPago.tipo').notEmpty(),
    (0, express_validator_1.body)('tipoMoneda').notEmpty(),
    (0, express_validator_1.body)('client.tipoDoc').notEmpty(),
    (0, express_validator_1.body)('client.numDoc').notEmpty(),
    (0, express_validator_1.body)('client.rznSocial').notEmpty(),
    (0, express_validator_1.body)('client.address.direccion').notEmpty(),
    (0, express_validator_1.body)('client.address.provincia').notEmpty(),
    (0, express_validator_1.body)('client.address.departamento').notEmpty(),
    (0, express_validator_1.body)('client.address.distrito').notEmpty(),
    (0, express_validator_1.body)('client.address.ubigueo').notEmpty(),
    (0, express_validator_1.body)('company.ruc').notEmpty(),
    (0, express_validator_1.body)('company.razonSocial').notEmpty(),
    (0, express_validator_1.body)('company.nombreComercial').notEmpty(),
    (0, express_validator_1.body)('company.address.direccion').notEmpty(),
    (0, express_validator_1.body)('company.address.provincia').notEmpty(),
    (0, express_validator_1.body)('company.address.departamento').notEmpty(),
    (0, express_validator_1.body)('company.address.distrito').notEmpty(),
    (0, express_validator_1.body)('company.address.ubigueo').notEmpty(),
    (0, express_validator_1.body)('mtoOperGravadas').notEmpty(),
    (0, express_validator_1.body)('mtoOperExoneradas').notEmpty(),
    (0, express_validator_1.body)('mtoIGV').notEmpty(),
    (0, express_validator_1.body)('totalImpuestos').notEmpty(),
    (0, express_validator_1.body)('valorVenta').notEmpty(),
    (0, express_validator_1.body)('subTotal').notEmpty(),
    (0, express_validator_1.body)('mtoImpVenta').notEmpty(),
    (0, express_validator_1.body)('details.*.codProducto').notEmpty(),
    (0, express_validator_1.body)('details.*.unidad').notEmpty(),
    (0, express_validator_1.body)('details.*.descripcion').notEmpty(),
    (0, express_validator_1.body)('details.*.cantidad').notEmpty(),
    (0, express_validator_1.body)('details.*.mtoValorUnitario').notEmpty(),
    (0, express_validator_1.body)('details.*.mtoValorVenta').notEmpty(),
    (0, express_validator_1.body)('details.*.mtoBaseIgv').notEmpty(),
    (0, express_validator_1.body)('details.*.porcentajeIgv').notEmpty(),
    (0, express_validator_1.body)('details.*.igv').notEmpty(),
    (0, express_validator_1.body)('details.*.tipAfeIgv').notEmpty(),
    (0, express_validator_1.body)('details.*.totalImpuestos').notEmpty(),
    (0, express_validator_1.body)('details.*.mtoPrecioUnitario').notEmpty(),
];
function escapeDataInResponse(req, _data) {
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
        details: req.body.details.map((detalle) => ({
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
exports.escapeDataInResponse = escapeDataInResponse;
//# sourceMappingURL=security.js.map