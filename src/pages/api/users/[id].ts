import prisma from "../../../lib/prisma";
import { buscarErro } from "../../../lib/erros_banco";

export default async function handler(req, res) {

    if(req.method !== 'PUT' && req.method !== 'DELETE') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    if(req.method === 'PUT') {

        if(+req.query.id > 0) {
            const userData = JSON.parse(req.body)

            userData.dt_nascimento = new Date(userData.dt_nascimento)
            
            let status = 200
            const updatedUser = await prisma.user.update({
                where: {
                    id: +req.query.id,
                },
                data: userData,
            }).catch((e) => {
                status = 422
                
                let mensagem = buscarErro(e.code, (e.meta.target.length == 1)?e.meta.target[0]:null)
                return res.status(status).json({'mensagem': mensagem, 'campo': e.meta.target[0]})
            })
    
            if(updatedUser) {
                return res.status(status).json(updatedUser)
            }
        }
    }

    if(req.method === 'DELETE') {
        
        if(+req.query.id > 0) {
            
            let status = 200
            const deleteUser = await prisma.user.delete({
                where: {
                    id: +req.query.id,
                }
            }).catch((e) => {
                status = 422
                let mensagem = buscarErro(e.code, (e.meta.target.length == 1)?e.meta.target[0]:null)
                return res.status(status).json({'mensagem': mensagem, 'campos': e.meta.target})
            })

            if(deleteUser) {
                return res.status(status).json(deleteUser)
            }
        }
    }

}