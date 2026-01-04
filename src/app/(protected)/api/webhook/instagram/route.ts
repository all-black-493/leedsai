import { findAutomation } from "@/actions/automations/queries";
import { getChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword, trackResponse } from "@/actions/webhook/queries";
import { openai } from "@/lib/aiclient";
import { sendDM, sendPrivateMessage } from "@/lib/fetch";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createChatHistory } from "@/actions/webhook/create-history-query";

export async function GET(req: NextRequest) {
    console.log("[WEBHOOK] GET endpoint called");
    const hub = req.nextUrl.searchParams.get('hub.challenge')
    console.log("[WEBHOOK] hub.challenge value:", hub);
    return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
    console.log("[WEBHOOK] POST endpoint called");
    const webhook_payload = await req.json()
    console.log("[WEBHOOK] Received payload type:", webhook_payload.entry?.[0]?.messaging ? 'messaging' : webhook_payload.entry?.[0]?.changes ? 'changes' : 'unknown');
    
    let matcher
    
    try {
        if (webhook_payload.entry[0].messaging) {
            console.log("[WEBHOOK] Processing messaging event");
            const event = webhook_payload.entry[0].messaging[0];
            // Only run if it's actually a message with text
            if (event.message && event.message.text) {
                console.log("[WEBHOOK] Message text found:", event.message.text.substring(0, 100));
                matcher = await matchKeyword(event.message.text)
                console.log("[WEBHOOK] Keyword match result:", matcher ? `Found automationId: ${matcher.automationId}` : "No match");
            } else {
                console.log("[WEBHOOK] No text message found in messaging event");
            }
        }

        if (webhook_payload.entry[0].changes) {
            console.log("[WEBHOOK] Processing changes event");
            const changeEvent = webhook_payload.entry[0].changes[0];
            console.log("[WEBHOOK] Change field:", changeEvent.field);

            // Check if value and text exist
            if (changeEvent.value && changeEvent.value.text) {
                console.log("[WEBHOOK] Change text found:", changeEvent.value.text.substring(0, 100));
                matcher = await matchKeyword(changeEvent.value.text)
                console.log("[WEBHOOK] Keyword match result:", matcher ? `Found automationId: ${matcher.automationId}` : "No match");
            } else {
                console.log("[WEBHOOK] No text found in change event");
            }
        }

        if (matcher && matcher.automationId) {
            console.log("[WEBHOOK] Matcher found with automationId:", matcher.automationId);
            
            if (webhook_payload.entry[0].messaging) {
                console.log("[WEBHOOK] Processing messaging automation flow");

                const messagingEvent = webhook_payload.entry[0].messaging[0];
                console.log("[WEBHOOK] Sender ID:", messagingEvent.sender?.id);

                // Double check message existence before processing
                if (!messagingEvent.message || !messagingEvent.message.text) {
                    console.log("[WEBHOOK] Ignoring non-text messaging event");
                    return NextResponse.json({ message: 'Ignored non-text event' }, { status: 200 });
                }

                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    true
                )
                console.log("[WEBHOOK] Automation retrieved:", automation ? `ID: ${automation.id}, Listener: ${automation.listener?.listener}` : "Not found");
                console.log("[WEBHOOK] User subscription plan:", automation?.User?.subscription?.plan);

                if (automation && automation.trigger) {
                    console.log("[WEBHOOK] Automation trigger is active");
                    
                    if (automation.listener &&
                        automation.listener.listener === "MESSAGE") {
                        console.log("[WEBHOOK] Processing MESSAGE listener type");
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listener?.prompt,
                            automation.User?.integrations[0].token!
                        )
                        console.log("[WEBHOOK] DM send status:", direct_message.status);
                        
                        if (direct_message.status === 200) {
                            const tracked = await trackResponse(
                                automation.id, 'DM'
                            )
                            console.log("[WEBHOOK] Response tracking result:", tracked ? "Success" : "Failed");
                            
                            if (tracked) {
                                console.log("[WEBHOOK] MESSAGE automation completed successfully");
                                return NextResponse.json(
                                    { message: 'Message Sent' },
                                    { status: 200 }
                                )
                            }
                        } else {
                            console.log("[WEBHOOK] DM send failed with status:", direct_message.status);
                        }
                    }

                    if (automation.listener &&
                        automation.listener.listener === 'SMARTAI' &&
                        automation.User?.subscription?.plan === 'STARTER'
                    ) {
                        console.log("[WEBHOOK] Processing SMARTAI listener for STARTER plan");
                        const smart_ai_message = await openai.chat.completions.create({
                            model: "gemini-2.5-flash",
                            messages: [
                                {
                                    role: 'assistant',
                                    content: `${automation.listener?.prompt}: Keep responses under 2 sentences`
                                }
                            ]
                        })
                        console.log("[WEBHOOK] OpenAI API call completed, choices:", smart_ai_message.choices.length);

                        if (smart_ai_message.choices[0].message.content) {
                            console.log("[WEBHOOK] OpenAI response received");
                            
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
                            console.log("[WEBHOOK] Chat history saved to database");

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!
                            )
                            console.log("[WEBHOOK] AI DM send status:", direct_message.status);

                            if (direct_message.status === 200) {
                                const tracked = await trackResponse(automation.id, 'DM')
                                console.log("[WEBHOOK] AI response tracking result:", tracked ? "Success" : "Failed");
                                
                                if (tracked) {
                                    console.log("[WEBHOOK] SMARTAI automation completed successfully");
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent'
                                        },
                                        {
                                            status: 200
                                        }
                                    )
                                }
                            } else {
                                console.log("[WEBHOOK] AI DM send failed with status:", direct_message.status);
                            }

                        } else {
                            console.log("[WEBHOOK] OpenAI response has no content");
                        }
                    }
                } else {
                    console.log("[WEBHOOK] Automation not found or trigger not active");
                }
            }

            if (
                webhook_payload.entry[0].changes &&
                webhook_payload.entry[0].changes[0].field === 'comments'
            ) {
                console.log("[WEBHOOK] Processing comments automation flow");
                
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    false
                )
                console.log("[WEBHOOK] Comments automation retrieved:", automation ? `ID: ${automation.id}` : "Not found");

                const automations_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id,
                    automation?.id!
                )
                console.log("[WEBHOOK] Automation post check:", automations_post ? "Found" : "Not found");

                if (
                    automation &&
                    automations_post &&
                    automation.trigger
                ) {
                    console.log("[WEBHOOK] Comments automation conditions met");
                    
                    if (automation.listener) {
                        if (automation.listener.listener === 'MESSAGE') {
                            console.log("[WEBHOOK] Processing MESSAGE listener for comment");
                            const direct_message = await sendPrivateMessage(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!
                            )
                            console.log("[WEBHOOK] Private message send status:", direct_message.status);
                            
                            if (direct_message.status === 200) {
                                const tracked = await trackResponse(
                                    automation.id,
                                    'COMMENT'
                                )
                                console.log("[WEBHOOK] Comment response tracking result:", tracked ? "Success" : "Failed");
                                
                                if (tracked) {
                                    console.log("[WEBHOOK] Comment MESSAGE automation completed successfully");
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent'
                                        },
                                        {
                                            status: 200
                                        }
                                    )
                                }
                            } else {
                                console.log("[WEBHOOK] Private message send failed with status:", direct_message.status);
                            }
                        }

                        if (
                            automation.listener.listener === 'SMARTAI' &&
                            automation.User?.subscription?.plan === 'STARTER'
                        ) {
                            console.log("[WEBHOOK] Processing SMARTAI listener for comment");
                            const smart_ai_message = await openai.chat.completions.create({
                                model: 'gemini-2.5-flash',
                                messages: [
                                    {
                                        role: 'assistant',
                                        content: `${automation.listener?.prompt}: Keep responses under 2 sentences`
                                    }
                                ]
                            })
                            console.log("[WEBHOOK] OpenAI API call for comment completed, choices:", smart_ai_message.choices.length);

                            if (smart_ai_message.choices[0].message.content) {
                                console.log("[WEBHOOK] OpenAI response for comment received");

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
                                console.log("[WEBHOOK] Comment chat history saved to database");

                                const direct_message = await sendPrivateMessage(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.id,
                                    automation.listener?.prompt,
                                    automation.User?.integrations[0].token!
                                )
                                console.log("[WEBHOOK] Comment AI private message send status:", direct_message.status);

                                if (direct_message.status === 200) {
                                    const tracked = await trackResponse(automation.id, 'COMMENT')
                                    console.log("[WEBHOOK] Comment AI response tracking result:", tracked ? "Success" : "Failed");
                                    
                                    if (tracked) {
                                        console.log("[WEBHOOK] Comment SMARTAI automation completed successfully");
                                        return NextResponse.json(
                                            {
                                                message: 'Message sent'
                                            },
                                            {
                                                status: 200
                                            }
                                        )
                                    }
                                } else {
                                    console.log("[WEBHOOK] Comment AI private message send failed with status:", direct_message.status);
                                }
                            } else {
                                console.log("[WEBHOOK] OpenAI response for comment has no content");
                            }
                        }
                    }
                } else {
                    console.log("[WEBHOOK] Comments automation conditions not met");
                }
            }
        }

        if (!matcher) {
            console.log("[WEBHOOK] No keyword match found, checking for existing chat history");
            
            const messagingEvent = webhook_payload.entry[0].messaging?.[0];

            if (messagingEvent && messagingEvent.message && messagingEvent.message.text) {
                console.log("[WEBHOOK] Found messaging event with text for history check");

                const customer_history = await getChatHistory(
                    messagingEvent.recipient.id,
                    messagingEvent.sender.id,
                )
                console.log("[WEBHOOK] Chat history retrieved, entries:", customer_history.history.length);
                console.log("[WEBHOOK] Previous automationId:", customer_history.automationId);

                if (customer_history.history.length > 0) {
                    console.log("[WEBHOOK] Has previous chat history");
                    const automation = await findAutomation(customer_history.automationId!)
                    console.log("[WEBHOOK] Previous automation found:", automation ? `ID: ${automation.id}, Plan: ${automation.User?.subscription?.plan}` : "Not found");

                    if (automation?.User?.subscription?.plan === 'STARTER' &&
                        automation.listener?.listener === 'SMARTAI'
                    ) {
                        console.log("[WEBHOOK] Continuing SMARTAI conversation for STARTER plan");
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
                        console.log("[WEBHOOK] OpenAI API call with history completed, choices:", smart_ai_message.choices.length);

                        if (smart_ai_message.choices[0].message.content) {
                            console.log("[WEBHOOK] OpenAI response with history received");

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
                            console.log("[WEBHOOK] Continued chat history saved to database");

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                messagingEvent.sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!
                            )
                            console.log("[WEBHOOK] Continued conversation DM send status:", direct_message.status);

                            if (direct_message.status === 200) {
                                console.log("[WEBHOOK] Continued conversation completed successfully");
                                return NextResponse.json({ message: 'Message Sent' }, { status: 200 })
                            } else {
                                console.log("[WEBHOOK] Continued conversation DM send failed with status:", direct_message.status);
                            }
                        } else {
                            console.log("[WEBHOOK] OpenAI response with history has no content");
                        }
                    } else {
                        console.log("[WEBHOOK] Not continuing conversation - conditions not met (plan or listener type)");
                    }
                } else {
                    console.log("[WEBHOOK] No previous chat history found");
                }
            } else {
                console.log("[WEBHOOK] No messaging event with text found for history check");
            }

            console.log("[WEBHOOK] No automation matched or triggered");
            return NextResponse.json({ message: 'No automation set' }, { status: 200 })
        }

        console.log("[WEBHOOK] End of processing, no automation set");
        return NextResponse.json({ message: 'No automation set' }, { status: 200 })

    } catch (error) {
        console.log("[WEBHOOK ERROR]:", error)
        console.log("[WEBHOOK] Error payload:", JSON.stringify(webhook_payload, null, 2));

        return NextResponse.json(
            {
                message: 'No automation set'
            },
            {
                status: 200
            }
        )
    }
}