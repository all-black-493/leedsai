"use client"

import { usePaths } from '@/hooks/user-nav'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/use-queries'
import CreateAutomation from '../create-automation'
import { format } from 'date-fns'
import { useMutationDataState } from '@/hooks/use-mutation-data'

type Props = {

}

const AutomationList = (props: Props) => {

    const { data } = useQueryAutomations()

    const { latestVariable } = useMutationDataState(['create-automation'])

    console.log("Latest Var: ", latestVariable)

    const { pathname } = usePaths()

    const optimisticUiData = useMemo(() => {
        if (latestVariable?.variables) {
            const test = [latestVariable.variables, ...data!.data]
            return { data: test }
        }
        return data
    }, [latestVariable, data])

    console.log("UI Data: ", optimisticUiData)

    if (data?.status !== 200 || data.data.length <= 0) {
        return (
            <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
                <h3 className="text-lg text-gray-400">
                    No Automations
                </h3>
                <CreateAutomation />
            </div>
        )
    }


    return (
        //If no automations exist, show no automations
        <div className='flex flex-col gap-y-3'>

            {optimisticUiData?.data!.map((automation) => (
                <Link
                    key={automation.id}
                    href={`${pathname}/${automation.id}`}
                    className='bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border flex border-[#545454]'
                >
                    <div className="flex flex-col flex-1 items-start">
                        <h2 className="text-xl font-semibold">
                            {automation.name}
                        </h2>
                        <p className="text-[#9B9CA0] text-sm font-light mb-2">
                            This is from the comment
                        </p>

                        {automation.keywords?.length > 0 ? (
                            <div className="flex gap-x-2 flex-wrap mt-3">
                                {
                                    //@ts-ignore
                                    automation.keywords.map((keyword, key) => (
                                        <div
                                            key={keyword.id}
                                            className={cn(
                                                'rounded-full px-4 py-1 capitalize font-semibold text-sm',
                                                (0 + 1) % 1 == 0 &&
                                                'bg-emerald-500/15 border-2 border-emerald-500',
                                                (1 + 1) % 2 == 0 &&
                                                'bg-purple-700/15 border-2 border-purple-400',
                                                (2 + 1) % 3 == 0 &&
                                                'bg-yellow-700/15 border-2 border-yellow-400',
                                                (3 + 1) % 4 == 0 &&
                                                'bg-red-500/15 border-2 border-red-500'
                                            )}
                                        >
                                            {keyword.word}
                                        </div>
                                    ))}

                            </div>
                        ) : (

                            <div className="rounded-full border -2 mt-3 border-dashed border-white/60 px-3 py-1">
                                <p className="text-sm text-[#bfc0c3]">
                                    No Keywords
                                </p>
                            </div>
                        )}

                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="capitalize text-sm font-semibold text-[#9B9CA0]">
                            {format(automation.createdAt, "dd MMMM yyyy")}
                        </p>
                        {automation.listener?.listener === 'SMARTAI' ? (
                            <GradientButton type='BUTTON' className='w-full bg-background/80 text-white hover:bg-background/80'>
                                Smart AI
                            </GradientButton>
                        ) : (
                            <Button className='bg-background/80 hover:bg-background/80 text-white'>
                                Starter
                            </Button>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default AutomationList
