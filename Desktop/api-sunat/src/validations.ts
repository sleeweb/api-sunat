//Datos de la forma de pago
interface FormaPago {
    moneda: string;
    tipo: string;
}
//Datos del Cliente
interface Entity {
    tipoDoc: number;
    numDoc: number;
    rznSocial: string;
    address: Address;
}
//Datos de la Compañia
interface Company {
    ruc: number;
    razonSocial: string;
    nombreComercial: string;
    address: Address;
}
//Datos de la direccion 
interface Address {
    direccion: string;
    provincia: string;
    departamento: string;
    distrito: string;
    ubigueo: number;
}

//Datos del detalle del producto
interface Detalle {
    codProducto: string;
    unidad: string;
    descripcion: string;
    cantidad: number;
    mtoValorUnitario: number;
    mtoValorVenta: number;
    mtoBaseIgv: number;
    porcentajeIgv: number;
    igv: number;
    tipAfeIgv: number;
    totalImpuestos: number;
    mtoPrecioUnitario: number;
}
//Datos de la factura en general
interface FacturaData {
    ublVersion: string;
    fecVencimiento: string;
    tipoOperacion: string;
    tipoDoc: string;
    serie: string;
    correlativo: number;
    fechaEmision: string;
    formaPago: FormaPago;
    tipoMoneda: string;
    client: Entity;
    company: Company;
    mtoOperGravadas: number;
    mtoOperExoneradas: number;
    mtoIGV: number;
    totalImpuestos: number;
    valorVenta: number;
    subTotal: number;
    mtoImpVenta: number;
    details: Detalle[];
}

function validateField(value: any, type: string): boolean {
    if (type === 'number') {
        return typeof value === 'number' && !isNaN(value);
    }
    if (type === 'string') {
        return typeof value === 'string' && value.trim() !== '';
    }
    return false;
}

function validateFormaPago(formaPago: FormaPago): boolean {
    return (
        validateField(formaPago.moneda, 'string') &&
        validateField(formaPago.tipo, 'string')
    );
}
function validateEntity(entity: Entity): boolean {
    return (
        validateField(entity.tipoDoc, 'string') &&
        validateField(entity.numDoc, 'number') &&
        validateField(entity.rznSocial, 'string') &&
        validateAddress(entity.address)
    );
}
function validateCompany(company: Company): boolean {
    return (
        validateField(company.ruc, 'number') &&
        validateField(company.razonSocial, 'string') &&
        validateField(company.nombreComercial, 'string')&&
        validateAddress(company.address)
    );
}
function validateAddress(address: Address): boolean {
    return (
        validateField(address.direccion, 'string') &&
        validateField(address.provincia, 'string') &&
        validateField(address.departamento, 'string') &&
        validateField(address.distrito, 'string') &&
        validateField(address.ubigueo, 'number')
    );
}
function validateDetalle(detalle: Detalle): boolean {
    const {
        codProducto,
        unidad,
        descripcion,
        cantidad,
        mtoValorUnitario,
        mtoValorVenta,
        mtoBaseIgv,
        porcentajeIgv,
        igv,
        tipAfeIgv,
        totalImpuestos,
        mtoPrecioUnitario
    } = detalle;

    return (
        validateField(codProducto, 'string') && codProducto.trim().length > 0 &&
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
        validateField(mtoPrecioUnitario, 'number') && mtoPrecioUnitario >= 0
    );
}


export function validateFacturaData(data: FacturaData): string | true {

    
    // validacion para los datos string
    const requiredFields = [
        'ublVersion',
        'fecVencimiento',
        'tipoOperacion',
        'tipoDoc',
        'serie',
        'fechaEmision',
        'tipoMoneda'
    ];
    // validacion si un dato fue eliminado
    for (const field of requiredFields) {
        if (!(field in data)) {
            return `El dato ${field} se encuentra ausente`;
        }
    }    
    for (const field of requiredFields) {
        const fieldValue = (data as any)[field];
        // verificamos que no esté vacío los tipos string
        if (typeof data[field as keyof FacturaData] === 'string' && data[field as keyof FacturaData] === '') {
            return 'Todos los campos deben ser completados';
        }
        else if (!validateField(fieldValue, 'string') || fieldValue < 0) {
            return `El dato ${field} es inválido`;
        }
    }
    // validacion para los datos númericos
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
        const fieldValue = (data as any)[field];
        if (!validateField(fieldValue, 'number') || fieldValue < 0) {
            return `Campo ${field} es inválido`;
        }
    }
    
    // Validacion para las interface
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
    
    // Validacion para los compos de detalles del producto    
    for (const detalle of data.details) {
        if (!validateDetalle(detalle)) {
            return 'Detalle de factura inválido';
        }
    }

    return true;
}
