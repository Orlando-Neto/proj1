import { PrismaClient } from ".prisma/client";
import { buscarErro } from "../../../lib/erros_banco";

const prisma = new PrismaClient()

export default async function handler(req, res) {

    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const userData = JSON.parse(req.body)
    
    let status = 200
    const savedUser = await prisma.user.create({
        data: userData
    }).catch((e) => {
        let mensagem = buscarErro(e.code, (e.meta.target.length == 1)?e.meta.target[0]:null)
        status = 422
        return {'mensagem': mensagem, 'campos': e.meta.target}
    })

    res.status(status).json(savedUser)
}