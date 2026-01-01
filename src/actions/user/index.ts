"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createUser, findUser, updateSubscriptionQuery } from "./queries"
import { refreshToken } from "../../lib/fetch"
import { updateIntegration } from "../integrations/queries"

export const onCurrentUser = async () => {
    const user = await currentUser()
    if (!user) return redirect('/sign-in')
    return user
}

export const onBoardUser = async () => {
    const user = await onCurrentUser()

    try {
        const found = await findUser(user.id)

        if (found) {
            if (found.integrations.length > 0) {
                const today = new Date()
                const time_left = found.integrations[0].expiresAt?.getTime()! - today.getTime()
                const days = Math.round(time_left / (1000 * 3600 * 24))
                if (days < 5) {
                    console.log('refresh')

                    const refresh = await refreshToken(found.integrations[0].token)

                    const today = new Date()
                    const expire_date = today.setDate(today.getDate() + 60)
                    const update_token = await updateIntegration(
                        refresh.access_token,
                        new Date(expire_date),
                        found.integrations[0].id
                    )
                    if (!update_token) {
                        console.log('Update token failed')
                    }
                }
            }
            return {
                status: 200,
                data: {
                    firstname: found.firstname,
                    lastname: found.lastname,
                }
            }
        }
        const created = await createUser(
            user.id,
            user.firstName!,
            user.lastName!,
            user.emailAddresses[0].emailAddress
        )
        return {
            status: 201,
            data: created
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            error_data: error
        }
    }
}

export const onUserInfo = async () => {
    const user = await onCurrentUser()
    try {
        const profile = await findUser(user.id)
        if (profile) return { status: 200, data: profile }
        return { status: 404 }
    } catch (error) {
        return { status: 500 }
    }
}

export const onSubscribe = async (reference: string) => {

    const user = await onCurrentUser()

    console.log('CUREENT USER :', user.id)

    try {
        const subscription = await getSubscription(reference)

        // console.log("SUBSCRIPTION : ", subscription.data)
        
        if (subscription) {

            console.log('CustomerID :', subscription.data.customer.id)
            console.log('Plan: ', subscription.data.plan_object.name )
            
            const subscribed = await updateSubscriptionQuery(user.id, {
                customerId: String(subscription.data.customer.id),
                plan: subscription.data.plan_object.name

            })

            console.log('SUBSCRIBED :', subscribed)

            if (subscribed) {
                return { status: 200 }
            } else {
                return { status: 401 }
            }

        }
        return { status: 404 }

    } catch (error) {
        return { status: 500 }
    }
}

async function getSubscription(reference: string) {

    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!
    const resp = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
        }
    })

    const json = await resp.json()

    if (!json.status) {
        throw new Error(`Paystack verification failed: ${JSON.stringify(json)}`)
    }

    const data = json.data

    if (data.status === 'success') {
        // console.log('JSON DATA :', data)

        return { status: 200, data: data }
    }

    return { status: 500 }

}
