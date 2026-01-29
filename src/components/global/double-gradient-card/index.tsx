import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

type Props = {
    label: string
    subLabel: string
    description: string
}

const DoubleGradientCard = ({ description, label, subLabel }: Props) => {
    return (
        <div className='relative border p-5 rounded-xl flex flex-col gap-y-20 overflow-hidden '>
            <div className="flex flex-col z-40">
                <h2 className="text-2xl font-medium">
                    {label}
                </h2>
                <p className="text-secondary text-sm">
                    {subLabel}
                </p>
            </div>
            <div className="flex justify-between items-center z-40 gap-x-10">
                <p className="text-secondary text-sm">
                    {description}
                </p>
                <Button className='rounded-full bg-emerald-500 w-10 h-10'>
                    <ArrowRight color='white' />
                </Button>
            </div>
            <div
                className='w-6/12 h-full absolute top-0 left-0 z-10'
                style={{
                    background:
                        `radial-gradient(closest-side at 0% 50%, rgba(4, 120, 87, 0.6), transparent 70%), 
                         radial-gradient(closest-side at 50% 50%, rgba(4, 120, 87, 0.4), transparent 80%)`
                }}
            />

            {/* Right gradient */}
            <div
                className='w-6/12 h-full absolute top-0 left-1/2 z-0'
                style={{
                    background:
                        `radial-gradient(closest-side at 100% 50%, rgba(4, 120, 87, 0.6), transparent 70%), 
                         radial-gradient(closest-side at 50% 50%, rgba(4, 120, 87, 0.4), transparent 80%)`
                }}
            />
        </div>
    )
}

export default DoubleGradientCard
