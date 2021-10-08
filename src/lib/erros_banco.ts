export function buscarErro(codigo, campo?) {

    let msg = ''
    switch(codigo) {
        case 'P2002':
            if(campo)
                msg = `${campo} já existente`
            else
                msg = `Registro já existente`
        break;
        default:
            msg = codigo
        break;
    }

    return msg
}
