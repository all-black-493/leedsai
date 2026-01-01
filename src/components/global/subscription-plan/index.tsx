'use client'

import { useQueryUser } from '@/hooks/use-queries'
import React from 'react'

type Props = {
    type: "STARTER" | "GROWTH" | "BUSINESS"
    children: React.ReactNode
}

const SubscriptionPlan = ({ children, type }: Props) => {
    const { data } = useQueryUser()
    return data?.data?.subscription?.plan === type && children
}

export default SubscriptionPlan
