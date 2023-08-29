export function validateFacturaData(data: any): string | true {

    const requiredFields = [
        'ublVersion',
        'fecVencimiento',
        'tipoOperacion',
        'tipoDoc',
        'serie',
        'correlativo',
        'fechaEmision',
        'formaPago',
        'tipoMoneda',
        'client',
        'company',
        'mtoOperGravadas',
        'mtoOperExoneradas',
        'mtoIGV',
        'totalImpuestos',
        'valorVenta',
        'subTotal',
        'mtoImpVenta',
        'details'
    ];    

    for (const field of requiredFields) {
        if (!data[field]) {
            return 'Todos los datos deben ser rellenados';
        }
    }

    if (
        typeof data.ublVersion !== 'string' ||
        typeof data.fecVencimiento !== 'string' ||
        typeof data.tipoOperacion !== 'string' ||
        typeof data.tipoDoc !== 'string' ||
        typeof data.serie !== 'string' ||
        typeof data.correlativo !== 'number' ||
        typeof data.fechaEmision !== 'string' ||
        typeof data.formaPago !== 'object' ||
        typeof data.formaPago.moneda !== 'string' ||
        typeof data.formaPago.tipo !== 'string' ||
        typeof data.tipoMoneda !== 'string' ||
        typeof data.client !== 'object' ||
        typeof data.client.tipoDoc !== 'string' ||
        typeof data.client.numDoc !== 'number' ||
        typeof data.client.rznSocial !== 'string' ||
        typeof data.client.address !== 'object' ||
        typeof data.client.address.direccion !== 'string' ||
        typeof data.client.address.provincia !== 'string' ||
        typeof data.client.address.departamento !== 'string' ||
        typeof data.client.address.distrito !== 'string' ||
        typeof data.client.address.ubigueo !== 'number' ||
        typeof data.company !== 'object' ||
        typeof data.company.ruc !== 'number' ||
        typeof data.company.razonSocial !== 'string' ||
        typeof data.company.nombreComercial !== 'string' ||
        typeof data.company.address !== 'object' ||
        typeof data.company.address.direccion !== 'string' ||
        typeof data.company.address.provincia !== 'string' ||
        typeof data.company.address.departamento !== 'string' ||
        typeof data.company.address.distrito !== 'string' ||
        typeof data.company.address.ubigueo !== 'number' ||
        typeof data.mtoOperGravadas !== 'number' ||
        typeof data.mtoOperExoneradas !== 'number' ||
        typeof data.mtoIGV !== 'number' ||
        typeof data.totalImpuestos !== 'number' ||
        typeof data.valorVenta !== 'number' ||
        typeof data.subTotal !== 'number' ||
        typeof data.mtoImpVenta !== 'number' ||
        !Array.isArray(data.details) ||
        data.details.length === 0
    ) {
        return 'Un dato proporcionado en el campo es inválido';
    }

    return true; // Si todos los campos numéricos son válidos
}
