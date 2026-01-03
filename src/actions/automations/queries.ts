'use server'

import { prisma } from "@/lib/prisma"
import { findUser } from "../user/queries"

export const createAutomation = async (clerkId: string, params: { name: string, keywords?: string[] }) => {

    const user = await findUser(clerkId)

    return await prisma.automation.create({
        data: {
            userId: user?.id,
            name: params.name,
            ...(params.keywords && params.keywords.length > 0 && {
                keywords: {
                    create: params.keywords.map(w => ({ word: w }))
                }
            })
        }
    })
}


export const getAutomations = async (clerkId: string) => {

    return await prisma.user.findUnique({
        where: {
            clerkId
        },
        select: {
            automations: {
                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    keywords: true,
                    listener: true
                }
            }
        }
    })
}

export const findAutomation = async (id: string) => {
    return await prisma.automation.findUnique({
        where: {
            id
        },
        include: {
            keywords: true,
            trigger: true,
            posts: true,
            listener: true,
            User: {
                select: {
                    subscription: true,
                    integrations: true
                }
            }
        }
    })
}

export const updateAutomationQuery = async (
    id: string,
    update: {
        name?: string
        active?: boolean
    }
) => {
    return await prisma.automation.update({
        where: { id },
        data: {
            name: update.name,
            active: update.active,
        }
    })
}

export const addListenerQuery = async (
    automationId: string,
    listener: 'SMARTAI' | 'MESSAGE',
    prompt: string,
    reply?: string
) => {
    return await prisma.automation.update({
        where: {
            id: automationId,
        },
        data: {
            listener: {
                create: {
                    listener,
                    prompt,
                    commentReply: reply
                }
            }
        }
    })
}

export const addTriggerQuery = async (automationId: string, trigger: string[]) => {
    if (trigger.length === 2) {
        return await prisma.automation.update({
            where: { id: automationId },
            data: {
                trigger: {
                    createMany: {
                        data: [
                            { type: trigger[0] },
                            { type: trigger[1] }
                        ]
                    }
                }
            }
        })
    }

    return await prisma.automation.update({
        where: {
            id: automationId
        },
        data: {
            trigger: {
                create: {
                    type: trigger[0],
                }
            }
        }
    })
}

export const addKeywordQuery = async (automationId: string, keyword: string) => {
    return prisma.automation.update({
        where: {
            id: automationId,
        },
        data: {
            keywords: {
                create: {
                    word: keyword
                }
            }
        }
    })
}

export const deleteKeywordQuery = async (id: string) => {
    return prisma.keyword.delete({
        where: { id }
    })
}

export const addPostQuery = async (
    automationId: string,
    posts: {
        postid: string,
        caption?: string,
        media: string
        mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
    }[]
) => {
    try {
        return await prisma.automation.update({
            where: {
                id: automationId,
            },
            data: {
                posts: {
                    createMany: {
                        data: posts
                    }
                }
            }
        })
    } catch (error) {
        console.log('[AN ERROR OCCURRED :]', error)
    }
}

export const updateAutomationStateQuery = async (
    id: string,
    update: {
        name?: string
        active?: boolean
    }
) => {
    return await prisma.automation.update({
        where: { id },
        data: {
            name: update.name,
            active: update.active,
        }
    })
}