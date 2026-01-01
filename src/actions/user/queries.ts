'use server'

import { prisma } from "@/lib/prisma"

export const findUser = async (clerkId: string) => {
    return await prisma.user.findUnique({
        where: {
            clerkId
        },
        include: {
            subscription: true,
            integrations: {
                select: {
                    id: true,
                    token: true,
                    expiresAt: true,
                    name: true
                }
            }
        }
    })
}

export const createUser = async (
    clerkId: string,
    firstname: string,
    lastname: string,
    email: string,
) => {
    return await prisma.user.create({
        data: {
            clerkId,
            firstname,
            lastname,
            email,
            subscription: {
                create: {},
            }
        },
        select: {
            firstname: true,
            lastname: true,
        }
    })
}

export const updateSubscriptionQuery = async (
    clerkId: string,
    props: {
        customerId?: string
        plan?: 'STARTER' | 'GROWTH' | 'BUSINESS'
    }
) => {

    try {
        const data = await prisma.user.update({
            where: { clerkId },
            data: {
                subscription: {
                    update: {
                        data: {
                            ...props
                        }
                    }
                }
            }
        })

        console.log('PRISMA QUERY :', data)
        return data
    } catch (error) {
        console.error('THE ERROR :', error)
    }


}