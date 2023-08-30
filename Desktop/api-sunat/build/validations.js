"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFacturaData = void 0;
function validateField(value, type) {
    if (type === 'number') {
        return typeof value === 'number' && !isNaN(value);
    }
    if (type === 'string') {
        return typeof value === 'string' && value.trim() !== '';
    }
    return false;
}
function validateFormaPago(formaPago) {
    return (validateField(formaPago.moneda, 'string') &&
        validateField(formaPago.tipo, 'string'));
}
function validateEntity(entity) {
    return (validateField(entity.tipoDoc, 'string') &&
        validateField(entity.numDoc, 'number') &&
        validateField(entity.rznSocial, 'string') &&
        validateAddress(entity.address));
}
function validateCompany(company) {
    return (validateField(company.ruc, 'number') &&
        validateField(company.razonSocial, 'string') &&
        validateField(company.nombreComercial, 'string') &&
        validateAddress(company.address));
}
function validateAddress(address) {
    return (validateField(address.direccion, 'string') &&
        validateField(address.provincia, 'string') &&
        validateField(address.departamento, 'string') &&
        validateField(address.distrito, 'string') &&
        validateField(address.ubigueo, 'number'));
}
function validateDetalle(detalle) {
    const { codProducto, unidad, descripcion, cantidad, mtoValorUnitario, mtoValorVenta, mtoBaseIgv, porcentajeIgv, igv, tipAfeIgv, totalImpuestos, mtoPrecioUnitario } = detalle;
    return (validateField(codProducto, 'string') && codProducto.trim().length > 0 &&
        validateField(unidad, 'string') && unidad.trim().length > 0 &&
        validateField(descripcion, 'string') && descripcion.trim().length > 0 &&
        validateField(cantidad, 'number') && cantidad > 0 &&
        validateField(mtoValorUnitario, 'number') && mtoValorUnitario >= 0 &&
        validateField(mtoValorVenta, 'number') && mtoValorVenta >= 0 &&
        validateField(mtoBaseIgv, 'number') && mtoBaseIgv >= 0 &&
        validateField(porcentajeIgv, 'number') &&
        validateField(igv, 'number') && igv >= 0 &&
        validateField(tipAfeIgv, 'number') &&
        validateField(totalImpuestos, 'number') && totalImpuestos >= 0 &&
        validateField(mtoPrecioUnitario, 'number') && mtoPrecioUnitario >= 0);
}
function validateFacturaData(data) {
    const requiredFields = [
        'ublVersion',
        'fecVencimiento',
        'tipoOperacion',
        'tipoDoc',
        'serie',
        'fechaEmision',
        'tipoMoneda'
    ];
    for (const field of requiredFields) {
        if (!(field in data)) {
            return `El dato ${field} se encuentra ausente`;
        }
    }
    for (const field of requiredFields) {
        const fieldValue = data[field];
        if (typeof data[field] === 'string' && data[field] === '') {
            return 'Todos los campos deben ser completados';
        }
        else if (!validateField(fieldValue, 'string') || fieldValue < 0) {
            return `El dato ${field} es inválido`;
        }
    }
    const numericFields = [
        'correlativo',
        'mtoOperGravadas',
        'mtoOperExoneradas',
        'mtoIGV',
        'totalImpuestos',
        'valorVenta',
        'subTotal',
        'mtoImpVenta'
    ];
    for (const field of numericFields) {
        const fieldValue = data[field];
        if (!validateField(fieldValue, 'number') || fieldValue < 0) {
            return `Campo ${field} es inválido`;
        }
    }
    if (!validateEntity(data.client)) {
        return 'Datos del cliente inválidos';
    }
    if (!validateCompany(data.company)) {
        return 'Datos de la empresa inválidos';
    }
    if (!validateFormaPago(data.formaPago)) {
        return 'Forma de pago inválida';
    }
    if (!validateAddress(data.client.address) || !validateAddress(data.company.address)) {
        return 'Dirección de cliente o empresa inválida';
    }
    for (const detalle of data.details) {
        if (!validateDetalle(detalle)) {
            return 'Detalle de factura inválido';
        }
    }
    return true;
}
exports.validateFacturaData = validateFacturaData;
//# sourceMappingURL=validations.js.map