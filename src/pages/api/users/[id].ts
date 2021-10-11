import prisma from "../../../lib/prisma";
import { buscarErro } from "../../../lib/erros_banco";

export default async function handler(req, res) {

    if(req.method !== 'PUT') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    if(+req.query.id > 0) {
        const userData = JSON.parse(req.body)
        
        let status = 200
        const updatedUser = await prisma.user.update({
            where: {
                id: +req.query.id,
            },
            data: userData,
        }).catch((e) => {
            status = 422
            let mensagem = buscarErro(e.code, (e.meta.target.length == 1)?e.meta.target[0]:null)
            return {'mensagem': mensagem, 'campos': e.meta.target}
        })

        res.status(status).json(updatedUser)
    }
}