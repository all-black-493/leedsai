import { onOAuthInstagram } from '@/actions/integrations'
import { onUserInfo } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {
    title: string
    description: string
    icon: React.ReactNode
    strategy: 'INSTAGRAM' | 'CRM'

}

const IntegrationCard = ({ description, title, icon, strategy }: Props) => {

    const onInstaOAuth = () => onOAuthInstagram(strategy)

    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: onUserInfo
    })

    const integrated = data?.data?.integrations.find(
        (integration) => integration.name === strategy)

    return (
        <div className='border-2 border-[#0ead6d] rounded-2xl gap-x-5 p-5 flex items-center justify-between'>
            {icon}
            <div className="flex flex-col flex-1 ">
                <h3 className="text-xl">{title}</h3>
                <p className="text-[#9D9D9D] font-semibold text-sm w-full md:w-10/12 xl:w-8/12 2xl:w-6/12">
                    {description}
                </p>
            </div>
            <Button
                onClick={onInstaOAuth}
                disabled={integrated?.name === strategy}
                className='font-semibold text-sm bg-linear-to-br text-white rounded-full from-[#0ead6d] to-[#019258] hover:opacity-70 transition duration-100'
            >
                {integrated ? 'Connected' : 'Connect'}
            </Button>
        </div>
    )
}

export default IntegrationCard
