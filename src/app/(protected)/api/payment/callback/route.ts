import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!

export async function GET(req: NextRequest) {
    const reference = req.nextUrl.searchParams.get("reference");

    if (!reference) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/payment/failed`);
    }

    const verifyResp = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
    }
    );
    const result = await verifyResp.json();

    // console.log('Verification Result', result)

    if (result.data.status === "success") {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/payment?reference=${reference}`);
    } else if (result.data.status === "failed") {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`);
    } else {
        console.log('Status not captured : ', result.data.status)
    }
}
