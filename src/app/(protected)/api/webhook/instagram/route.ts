import { findAutomation } from "@/actions/automations/queries";
import { getChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword, trackResponse } from "@/actions/webhook/queries";
import { openai } from "@/lib/aiclient";
import { sendDM, sendPrivateMessage } from "@/lib/fetch";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createChatHistory } from "@/actions/webhook/create-history-query";

export async function GET(req: NextRequest) {
    const hub = req.nextUrl.searchParams.get('hub.challenge')
    return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
    const webhook_payload = await req.json()
    let matcher
    try {
        if (webhook_payload.entry[0].messaging) {
            const event = webhook_payload.entry[0].messaging[0];
            // Only run if it's actually a message with text
            if (event.message && event.message.text) {
                matcher = await matchKeyword(event.message.text)
            }
        }

        if (webhook_payload.entry[0].changes) {
            const changeEvent = webhook_payload.entry[0].changes[0];

            // Check if value and text exist
            if (changeEvent.value && changeEvent.value.text) {
                matcher = await matchKeyword(changeEvent.value.text)
            }
        }

        if (matcher && matcher.automationId) {
            if (webhook_payload.entry[0].messaging) {

                const messagingEvent = webhook_payload.entry[0].messaging[0];

                // Double check message existence before processing
                if (!messagingEvent.message || !messagingEvent.message.text) {
                    return NextResponse.json({ message: 'Ignored non-text event' }, { status: 200 });
                }

                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    true
                )

                if (automation && automation.trigger) {
                    if (automation.listener &&
                        automation.listener.listener === "MESSAGE") {
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listener?.prompt,
                            automation.User?.integrations[0].token!
                        )
                        if (direct_message.status === 200) {
                            const tracked = await trackResponse(
                                automation.id, 'DM'
                            )
                            if (tracked) {
                                return NextResponse.json(
                                    { message: 'Message Sent' },
                                    { status: 200 }
                                )
                            }
                        }
                    }

                    if (automation.listener &&
                        automation.listener.listener === 'SMARTAI' &&
                        automation.User?.subscription?.plan === 'STARTER'
                    ) {
                        const smart_ai_message = await openai.chat.completions.create({
                            model: "gemini-2.5-flash",
                            messages: [
                                {
                                    role: 'assistant',
                                    content: `${automation.listener?.prompt}: Keep responses under 2 sentences`
                                }
                            ]
                        })

                        if (smart_ai_message.choices[0].message.content) {
                            const receiver = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message.text
                            )

                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message.content
                            )

                            await prisma.$transaction([receiver, sender])

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!
                            )

                            if (direct_message.status === 200) {
                                const tracked = await trackResponse(automation.id, 'DM')
                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent'
                                        },
                                        {
                                            status: 200
                                        }
                                    )
                                }
                            }

                        }
                    }
                }
            }

            if (
                webhook_payload.entry[0].changes &&
                webhook_payload.entry[0].changes[0].field === 'comments'
            ) {
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    false
                )

                const automations_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id,
                    automation?.id!
                )

                if (
                    automation &&
                    automations_post &&
                    automation.trigger
                ) {
                    if (automation.listener) {
                        if (automation.listener.listener === 'MESSAGE') {
                            const direct_message = await sendPrivateMessage(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!
                            )
                            if (direct_message.status === 200) {
                                const tracked = await trackResponse(
                                    automation.id,
                                    'COMMENT'
                                )
                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent'
                                        },
                                        {
                                            status: 200
                                        }
                                    )
                                }
                            }
                        }

                        if (
                            automation.listener.listener === 'SMARTAI' &&
                            automation.User?.subscription?.plan === 'STARTER'
                        ) {
                            const smart_ai_message = await openai.chat.completions.create({
                                model: 'gemini-2.5-flash',
                                messages: [
                                    {
                                        role: 'assistant',
                                        content: `${automation.listener?.prompt}: Keep responses under 2 sentences`
                                    }
                                ]
                            })

                            if (smart_ai_message.choices[0].message.content) {

                                const receiver = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].value.text
                                )

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].message.content
                                )

                                await prisma.$transaction([receiver, sender])

                                const direct_message = await sendDM(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content,
                                    automation.User?.integrations[0].token!
                                )

                                if (direct_message.status === 200) {
                                    const tracked = await trackResponse(automation.id, 'COMMENT')
                                    if (tracked) {
                                        return NextResponse.json(
                                            {
                                                message: 'Message sent'
                                            },
                                            {
                                                status: 200
                                            }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!matcher) {

            const messagingEvent = webhook_payload.entry[0].messaging?.[0];

            if (messagingEvent && messagingEvent.message && messagingEvent.message.text) {

                const customer_history = await getChatHistory(
                    messagingEvent.recipient.id,
                    messagingEvent.sender.id,
                )

                if (customer_history.history.length > 0) {
                    const automation = await findAutomation(customer_history.automationId!)

                    if (automation?.User?.subscription?.plan === 'STARTER' &&
                        automation.listener?.listener === 'SMARTAI'
                    ) {
                        const smart_ai_message = await openai.chat.completions.create({
                            model: "gemini-2.5-flash",
                            messages: [
                                {
                                    role: 'assistant',
                                    content: `${automation.listener?.prompt}: Keep responses under 2 sentences` // Fixed typo: Kepp -> Keep
                                },
                                ...customer_history.history,
                                {
                                    role: 'user',
                                    content: messagingEvent.message.text,
                                }
                            ]
                        })

                        if (smart_ai_message.choices[0].message.content) {
                            const receiver = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                messagingEvent.sender.id,
                                messagingEvent.message.text,
                            )

                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                messagingEvent.sender.id,
                                smart_ai_message.choices[0].message.content,
                            )

                            await prisma.$transaction([receiver, sender])

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                messagingEvent.sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!
                            )

                            if (direct_message.status === 200) {
                                return NextResponse.json({ message: 'Message Sent' }, { status: 200 })
                            }
                        }
                    }
                }
            }

            return NextResponse.json({ message: 'No automation set' }, { status: 200 })
        }

        return NextResponse.json({ message: 'No automation set' }, { status: 200 })

    } catch (error) {

        console.log("[WEBHOOK ERROR: ]", error)

        return NextResponse.json(
            {
                message: 'No automation set'
            },
            {
                status: 500
            }
        )
    }
}