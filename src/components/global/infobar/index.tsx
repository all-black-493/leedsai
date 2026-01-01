
"use client"

import Sheet from '../sheet'
import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
import { usePaths } from '@/hooks/user-nav'
import { HelpCircleIcon, Menu } from 'lucide-react'
import React from 'react'
import SubscriptionPlan from '../subscription-plan'
import UpgradeCard from '../sidebar/upgrade'
import Items from '../sidebar/items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import LogoSmall from '@/svgs/logo-small'
import CreateAutomation from '../create-automation'
import Search from './search'
import Notifications from './notifications'
import MainBreadCrumb from '../bread-crumb/main-bread-crumb'

type Props = {
    slug: string
}


const Infobar = ({ slug }: Props) => {
    const { page } = usePaths()
    const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug
    return currentPage && (
        <div className="flex flex-col">
            <div className="flex gap-x-3 lg:gap-x-5 justify-end">
                <span className="lg:hidden flex items-center flex-1 gap-x-2">
                    <Sheet
                        side='left'
                        trigger={<Menu />}
                        className="lg:hidden"
                    >
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
                            <SubscriptionPlan type='GROWTH'>
                                <div className="flex flex-1 flex-col justify-end">
                                    <UpgradeCard />
                                </div>
                            </SubscriptionPlan>
                        </div>
                    </Sheet>
                </span>
                <Search />
                <CreateAutomation />
                <Notifications />
            </div>
            <MainBreadCrumb
                page={page === slug ? 'Home' : page}
                slug={slug}
            />
        </div>
    )
}

export default Infobar
