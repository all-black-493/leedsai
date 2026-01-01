'use client'

import React from 'react'
import PaymentCard from './payment-card'
import { useQueryUser } from '@/hooks/use-queries'

type Props = {}

const Billing = (props: Props) => {

    const { data } = useQueryUser()
    // Fetch billing info, determine user’s actual current plan (e.g. from API / state)
    // For example assume current plan is 'GROWTH'
    const currentPlan: 'STARTER' | 'GROWTH' | 'BUSINESS' = 'STARTER'

    return (
        <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
            <PaymentCard current={data?.data?.subscription?.plan!} label='STARTER' />
            <PaymentCard current={data?.data?.subscription?.plan!} label='GROWTH' />
            <PaymentCard current={data?.data?.subscription?.plan!} label='BUSINESS' />
        </div>
    )
}

export default Billing
