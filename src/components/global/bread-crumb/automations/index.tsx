'use client'

import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import ActivateAutomationButton from '../../activate-automation-button'
import { useQueryAutomation } from '@/hooks/use-queries'
import { useEditAutomation } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { Input } from '@/components/ui/input'


type Props = {
    id: string
}

const AutomationsBreadCrumb = ({ id }: Props) => {

    const { data } = useQueryAutomation(id)
    const {
        edit,
        enableEdit,
        disableEdit,
        inputRef,
        isPending
    } = useEditAutomation(id)

    const { latestVariable } = useMutationDataState(['update-automation'])

    return (
        <div className='rounded-full w-full p-5 bg-[#18181B1A] flex justify-between items-center'>
            <div className="flex items-center gap-x-3 min-w-0">
                <p className="text-[#9B9CA0] truncate font-semibold text-sm">Automations</p>
                <ChevronRight color='#9B9CA0' className='shrink-0' />
                <span className="flex gap-x-3 items-center min-w-0">

                    {edit ? (
                        <Input
                            ref={inputRef}
                            placeholder={
                                isPending ? latestVariable.variables : "Add a new name"
                            }
                            className='bg-transparent h-auto outline-none text-base border-none p-0'
                        />
                    ) : (
                        <p className="text-[#9B9CA0] truncate">
                            {latestVariable?.variables
                                ? latestVariable?.variables.name
                                : data?.data?.name}
                        </p>
                    )}

                    {edit ? (
                        <></>
                    ) : (
                        <span className="cursor-pointer hover:opacity-75 duration-100 transition shrink-0 mr-4"
                            onClick={enableEdit}>
                            <PencilIcon size={15} color='#9B9CA0' />
                        </span>
                    )}
                </span>
            </div>
            <div className="flex gap-x-5 ml-auto">
                <p className="text-[#9B9CA0] text-sm hidden md:block min-w-0 truncate">
                    All updates are automatically saved
                </p>
                <div className="flex gap-x-5 truncate">
                    <p className="text-[#9B9CA0] text-sm font-semibold min-w-0">Changes saved</p>
                </div>
            </div>
            <ActivateAutomationButton id={id} />
        </div>
    )
}

export default AutomationsBreadCrumb
