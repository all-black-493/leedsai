'use server'

import { prisma } from "@/lib/prisma"

export const matchKeyword = async (keyword: string) => {
    try {
        return await prisma.keyword.findFirst({
            where: {
                word: {
                    equals: keyword,
                    mode: 'insensitive'
                }
            }
        })
    } catch (error) {
        console.log("[MATCHKEYWORD ERROR]:", error)
    }
}

export const getKeywordAutomation = async (
    automationId: string,
    dm: boolean
) => {
    return await prisma.automation.findUnique({
        where: {
            id: automationId,
        },
        include: {
            dms: dm,
            trigger: {
                where: {
                    type: dm ? 'DM' : 'COMMENT'
                }
            },
            listener: true,
            User: {
                select: {
                    subscription: {
                        select: {
                            plan: true
                        }
                    },
                    integrations: {
                        select: {
                            token: true
                        }
                    }
                }
            }
        }
    })
}

export const trackResponse = async (
    automationId: string,
    type: 'COMMENT' | 'DM'
) => {

    try {

        if (type === 'COMMENT') {
            return await prisma.listener.update({
                where: {
                    automationId
                },
                data: {
                    commentCount: {
                        increment: 1
                    }
                }
            })
        }

        if (type === 'DM') {
            return await prisma.listener.update({
                where: {
                    automationId
                },
                data: {
                    dmCount: {
                        increment: 1
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
    }

}



export const getChatHistory = async (sender: string, receiver: string) => {
    const history = await prisma.dms.findMany({
        where: {
            OR: [
                {
                    senderId: sender,
                    receiver: receiver,
                },
                {
                    senderId: receiver,
                    receiver: sender,
                },
            ],
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    const chatSession = history.map((chat) => {
        return {
            role: (chat.senderId === receiver ? 'user' : 'system') as 'user' | 'system',
            content: chat.message || '',
        }
    })

    return {
        history: chatSession,
        automationId: history[history.length - 1]?.automationId,
    }
}

export const getKeywordPost = async (
    postId: string,
    automationId: string
) => {
    return await prisma.post.findFirst({
        where: {
            AND: [{ postid: postId }, { automationId }]
        },
        select: { automationId: true }
    })
}