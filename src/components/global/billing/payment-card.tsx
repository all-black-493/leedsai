// payment-card.tsx
import { Button } from '@/components/ui/button'
import { TIERS } from '@/constants/pages'
import { cn } from '@/lib/utils'
import { CircleCheck, Crown } from 'lucide-react'

type Props = {
    label: 'STARTER' | 'GROWTH' | 'BUSINESS'
    current: 'STARTER' | 'GROWTH' | 'BUSINESS'
    landing?: boolean
}

const PaymentCard = ({ current, label, landing }: Props) => {
    const getTierIndex = (tierLabel: string) => {
        switch (tierLabel) {
            case 'STARTER': return 0
            case 'GROWTH': return 1
            case 'BUSINESS': return 2
            default: return 0
        }
    }

    const getTierDisplayName = (tierLabel: string) => {
        switch (tierLabel) {
            case 'STARTER': return 'Starter'
            case 'GROWTH': return 'Growth Plan'
            case 'BUSINESS': return 'Business Plan'
            default: return 'Standard'
        }
    }

    const isCurrent = label === current
    const currentIndex = getTierIndex(current)
    const labelIndex = getTierIndex(label)

    let actionText: string
    if (landing) {
        actionText = TIERS[labelIndex].buttonText
    } else if (isCurrent) {
        actionText = 'Active'
    } else if (labelIndex > currentIndex) {
        actionText = 'Upgrade'
    } else if (labelIndex < currentIndex) {
        actionText = 'Downgrade'
    } else {
        actionText = 'Select'
    }

    const tier = TIERS[labelIndex]

    return (
        <div className={cn(
            !isCurrent ? 'bg-background' : 'bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-500',
            'p-0.5 rounded-xl overflow-hidden relative'
        )}>
            {tier.popular && (
                <div className="absolute top-0 right-0 mt-2 mr-2">
                    <span className="inline-flex items-center bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        <Crown className="w-3 h-3 mr-1" />
                        Most Popular
                    </span>
                </div>
            )}


            <div className={cn(
                landing,
                'flex flex-col rounded-xl pl-5 py-5 pr-10 bg-secondary h-full'
            )}>
                <h2 className='text-2xl'>
                    {landing
                        ? getTierDisplayName(label)
                        : (isCurrent ? 'Current Plan' : getTierDisplayName(label))
                    }
                </h2>

                <p className="text-text-secondary text-sm mb-2">
                    {tier.description}
                </p>

                <div className="mb-2">
                    {label === 'STARTER' ? (
                        <p className="font-bold mt-2 text-text-secondary">Standard</p>
                    ) : (
                        <span className='bg-linear-to-r from-emerald-500 via-emerald-300 to-emerald-600 bg-clip-text text-transparent font-bold'>
                            {label === 'GROWTH' ? 'Smart AI' : 'Enterprise AI'}
                        </span>
                    )}
                </div>

                <p className="mb-2">
                    <b className="text-xl">{tier.price}</b>
                    {label !== 'STARTER' && <span className="text-sm text-text-secondary">/month</span>}
                </p>

                {tier.features.map((feature) => (
                    <p key={feature} className="mt-2 text-muted-foreground flex gap-2">
                        <CircleCheck className='text-emerald-500' />
                        {feature}
                    </p>
                ))}

                <div className="mt-auto pt-4">
                    <Button
                        className='rounded-full w-full bg-background/80 text-white hover:text-background/80'
                        disabled={(!landing && isCurrent)}
                    >
                        {actionText}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PaymentCard
