"use client"

import { usePaths } from '@/hooks/user-nav'
import LogoSmall from '@/svgs/logo-small'
import React from 'react'
import Items from './items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpCircleIcon } from 'lucide-react'
import SubscriptionPlan from '../subscription-plan'
import UpgradeCard from './upgrade'

type Props = {
    slug: string

}

const Sidebar = ({ slug }: Props) => {

    const { page } = usePaths()

    return (
        <div className='w-[250px] border radial fixed left-0 lg:inline-block border-[#545454] bg-linear-to-b from-[#00cf80] via-[#171717] to-[#00cf80] hidden bottom-0 top-0 m-3 rounded-3xl overflow-hidden'>
            <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop-blur-3xl">
                <div className="flex gap-x-2 items-center py-4   px-20 justify-center">
                    <LogoSmall />
                </div>
                <div className="flex flex-col py-3">
                    <Items page={page} slug={slug} />
                </div>
                <div className="px-6">
                    <Separator
                        orientation='horizontal'
                        className='bg-[#5C5C5F]'
                    />
                </div>
                <div className="px-3 flex flex-col gap-y-5">
                    <div className="flex gap-x-2">
                        <ClerkAuthState />
                        <p className="text-[#9B9CA0]">
                            Profile
                        </p>
                    </div>
                    <div className="flex gap-x-3">
                        <HelpCircleIcon />
                        <p className="text-[#9B9CA0]">
                            Help
                        </p>
                    </div>
                </div>

                <SubscriptionPlan type='STARTER'>
                    <div className="flex flex-1 flex-col justify-end">
                        <UpgradeCard />
                    </div>
                </SubscriptionPlan>
            </div>
        </div>
    )
}

export default Sidebar
