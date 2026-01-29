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
                <p className="text-white text-sm">
                    {subLabel}
                </p>
            </div>
            <div className="flex justify-between items-center z-40 gap-x-10">
                <p className="text-white text-sm">
                    {description}
                </p>
                <Button className='rounded-full bg-emerald-500 w-10 h-10'>
                    <ArrowRight color='white' />
                </Button>
            </div>
            <div
                className="absolute inset-0 w-6/12 left-0 z-10"
                style={{
                    background: `
      radial-gradient(
        circle at 10% 50%, 
        rgba(4,120,87,0.3), 
        transparent 70%
      ),
      radial-gradient(
        circle at 30% 50%, 
        rgba(4,120,87,0.15), 
        transparent 90%
      )
    `,
                }}
            />

            <div
                className="absolute inset-0 w-6/12 left-1/2 z-0"
                style={{
                    background: `
      radial-gradient(
        circle at 90% 50%, 
        rgba(4,120,87,0.3), 
        transparent 70%
      ),
      radial-gradient(
        circle at 70% 50%, 
        rgba(4,120,87,0.15), 
        transparent 90%
      )
    `,
                }}
            />

        </div>
    )
}

export default DoubleGradientCard
