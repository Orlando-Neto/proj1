import prisma from "../../../lib/prisma";
import { buscarErro } from "../../../lib/erros_banco";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const userData = JSON.parse(req.body)
    
    let status = 200
    if(userData.senha2) {
        if(userData.senha != userData.senha2) {
            status = 400
            return res.status(status).send({'mensagem': 'Senhas não batem', 'campo': 'senha'})
        }
        userData.senha2 = undefined
    }
    
    const savedUser = await prisma.user.create({
        data: userData
    }).catch((e) => {
        let mensagem = buscarErro(e.code, (e.meta.target.length == 1)?e.meta.target[0]:null)
        
        status = 422
        return res.status(status).json({'mensagem': mensagem, 'campo': e.meta.target[0]})
    })

    if(savedUser) {
        return res.status(status).json(savedUser)
    }
}