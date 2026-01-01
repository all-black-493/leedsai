import Infobar from '@/components/global/infobar'
import Sidebar from '@/components/global/sidebar'
import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { prefetchUserAutomations, prefetchUserProfile } from '@/lib/react-query/prefetch'
// import Sheet from '@/components/global/sheet'
// import { Menu } from 'lucide-react'

type Props = {
    children: React.ReactNode
    params: { slug: string }

}

const Layout = async ({ children, params }: Props) => {
    // Query
    // WIP: Query client fetch data
    const { slug } = await params

    const query = new QueryClient()

    await prefetchUserProfile(query)

    await prefetchUserAutomations(query)

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className='p-3'>
                <Sidebar slug={slug} />
                {/* Infobar */}
                <div className="
                    lg:ml-[250px]
                    lg:pl-10
                    lg:py-5
                    flex
                    flex-col
                    overflow-auto
                    "
                >
                    {/* <Sheet trigger={<Menu />} side='left' className='lg-hidden'> */}
                    <Infobar slug={slug} />
                    {/* </Sheet> */}
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Layout
