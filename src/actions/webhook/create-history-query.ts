import { prisma } from "@/lib/prisma"

export const createChatHistory = (
    automationId: string,
    sender: string,
    receiver: string,
    message: string
) => {
    return prisma.automation.update({
        where: {
            id: automationId,
        },
        data: {
            dms: {
                create: {
                    receiver,
                    senderId: sender,
                    message,
                }
            }
        }
    })

}