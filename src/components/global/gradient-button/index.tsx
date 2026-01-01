import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
    type: 'BUTTON' | 'LINK'
    href?: string
    className?: string
}

const GradientButton = ({ children, type, href, className }: Props) => {

    const gradients = 'bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-xl p-[2px]'

    switch (type) {
        case "BUTTON":
            return (
                <div className={gradients}>
                    <Button className={cn(className, 'rounded-xl text-sm font-semibold')}>
                        {children}
                    </Button>
                </div>
            )

        case "LINK":
            return (
                <div className={gradients}>
                    <Link href={href!} className={cn(className, 'rounded-xl text-sm font-semibold')}>
                        {children}
                    </Link>
                </div>
            )

        default:
            return null
    }

}

export default GradientButton
