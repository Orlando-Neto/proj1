import prisma from '../../lib/prisma'

export default async function handler(req, res) {

    let body = JSON.parse(req.body)

    let email = body.email
    let senha = body.senha

    const user = await prisma.user.findFirst({
        where: {
            email,
            senha
        }
    })

    if(user) {
        return res.status(200).json(user)
    } else {
        return res.status(404).json({error: "Não foi mané"})
    }
}