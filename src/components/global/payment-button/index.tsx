import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentButton = (props: Props) => {

    const { onSubscribe, isProcessing } = useSubscription()
    
    return (
        <Button
            disabled={isProcessing}
            onClick={onSubscribe}
            className='bg-linear-to-br
                 text-white
                 rounded-full
                 from-[#00cf80]
                 via-[#11a66d]
                 font-bold
                 to-[#316551]'
        >
            {isProcessing ? (
                <Loader2 className='animate-spin' />
            ) : (
                <CreditCardIcon />
            )}
            Upgrade
        </Button>
    )
}

export default PaymentButton
