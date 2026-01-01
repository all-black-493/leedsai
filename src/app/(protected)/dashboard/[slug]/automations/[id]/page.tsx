import { getAutomationInfo } from '@/actions/automations';
import PostNode from '@/components/global/automations/post/node';
import ThenNode from '@/components/global/automations/then/node';
import Trigger from '@/components/global/automations/trigger';
import AutomationsBreadCrumb from '@/components/global/bread-crumb/automations';
import { prefetchUserAutomation } from '@/lib/react-query/prefetch';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import React from 'react'

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: { params: { id: string } }) {

    const { id } = await params

    const info = await getAutomationInfo(id)
    return {
        title: info.data?.name
    }
}

const Page = async ({ params }: Props) => {


    const query = new QueryClient()

    const { id } = await params;
    await prefetchUserAutomation(query, id)


    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className='flex flex-col items-center gap-y-20'>
                <AutomationsBreadCrumb id={id} />
                <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
                    <div className="flex gap-x-2">
                        <AlertCircle color='#32cd8f' />
                        When ...
                    </div>
                    <Trigger id={id} />
                </div>
                <ThenNode id={id} />
                <PostNode id={id} />
            </div>
        </HydrationBoundary>
    )
}

export default Page
