import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {

    if(req.method !== 'PUT') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    if(+req.query.id > 0) {
        const userData = JSON.parse(req.body)
        
        const updatedUser = await prisma.user.update({
            where: {
                id: +req.query.id,
            },
            data: userData,
        })

        res.json(updatedUser)
    }
}