import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!

export async function POST(req: NextRequest) {
    const user = await currentUser()
    if (!user) return NextResponse.json({ status: 404 })

    try {
        const { email, planCode } = await req.json()

        if (!email) return NextResponse.json({ error: 'Missing email', status: 400 })
            
        const payload: Record<string, any> = {
            email,
            plan: planCode,
            amount: 1000,
            callback_url: `${process.env.NEXT_PUBLIC_HOST_URL}/api/payment/callback`
        }

        const initResp = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const data = await initResp.json()

        // console.log("Paystack Response :", data)

        if (!data.status) {
            console.log('Paystack init error', data)
            return NextResponse.json({ error: 'Paystack initialization failed' }, { status: 502 })
        }

        return NextResponse.json({
            status: data.status,
            authorization_url: data.data.authorization_url,
            reference: data.data.reference
        })

    } catch (error) {
        console.error('Error in /api/payment route', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}