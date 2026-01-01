'use client'

import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/use-queries'
import { AlertCircleIcon, BotIcon, MessageSquareIcon } from 'lucide-react'
import React from 'react'
import PostButton from '../post'

type Props = {
    id: string

}

const ThenNode = ({ id }: Props) => {

    const { data } = useQueryAutomation(id)
    const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')

    return !data?.data?.listener ? <></> : <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
        <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
            <span className="h-[9px] w-[9px] rounded-full" />
            <Separator
                orientation='vertical'
                className='bottom-full flex-1 border-2 bg-emerald-500'
            />
            <span className="h-[9px] w-[9px] rounded-full" />
        </div>
        <div className="flex gap-x-2">
            <AlertCircleIcon color='#32cd8f' />
            Then
        </div>
        <div className="p-3 bg-background/80 rounded-xl flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
                {data.data.listener.listener === 'MESSAGE' ?
                    (
                        <MessageSquareIcon color='#32cd8f' size={20} />
                    ) : (
                        <BotIcon color='#32cd8f' size={20} />
                    )
                }
                <p className="font-semibold text-lg">
                    {data.data.listener.listener === 'MESSAGE'
                        ? 'Send the user a message'
                        : 'Let Smart AI take over'}
                </p>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
                {data.data.listener.prompt}
            </p>
        </div>
        {
            data.data.posts.length > 0 ? (
                <></>
            ) : commentTrigger ? (
                <PostButton id={id} />
            ) : (
                <></>

            )
        }
    </div>
}

export default ThenNode
