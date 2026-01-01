import React from 'react'
import PaymentButton from '../payment-button'

type Props = {}

const UpgradeCard = (props: Props) => {
    return (
        <div className="p-3 rounded-2xl bg-[#252525] flex flex-col gap-y-3">
            <span className='text-sm'>
                Upgrade to {''}
                <span className="
                bg-linear-to-r 
                from-[#00cf80] 
                font-bold 
                to-[#45a47f] 
                bg-clip-text 
                text-transparent"
                >
                    Smart AI
                </span>
            </span>
            <p className="text-[#9B9CA0] font-light text-sm">
                Unlock all features <br /> including AI and more
            </p>
            <PaymentButton />
        </div>
    )
}

export default UpgradeCard
