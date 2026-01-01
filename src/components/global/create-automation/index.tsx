'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '../loader'
import { Bot } from 'lucide-react'
import { useCreateAutomation } from '@/hooks/use-automations'

type Props = {}

const CreateAutomation = (props: Props) => {

    const {
        isPending,
        mutate
    } = useCreateAutomation()

    return (
        <Button
            className='lg:px-10 py-6 bg-linear-to-br hover:opacity-80 text-white rounded-full from-[#00cf80] font-medium to-[#2a634d]'
            onClick={() => mutate({ 
                name: 'My Second Automation', 
                keywords:['foo', 'bar'] 
            })}
        >
            <Loader state={isPending}>
                <Bot />
                <p className="lg:inline hidden font-semibold text-sm">
                    Create an Automation
                </p>
            </Loader>
        </Button>
    )
}

export default CreateAutomation
