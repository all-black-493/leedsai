import { ComputerIcon, InstagramIcon, RatIcon, Satellite } from "lucide-react"

type Props ={
    title: string
    icon: React.ReactNode
    description: string
    strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
    {
        title: 'Connect Instagram',
        description: 'Instagram Connection Description',
        icon: <InstagramIcon />,
        strategy: 'INSTAGRAM',
    },
    // {
    //     title: 'Connect Whatsapp',
    //     description: 'Whatsapp Connection Description',
    //     icon: <ComputerIcon />,
    //     strategy: 'WHATSAPP',
    // },
    // {
    //     title: 'Connect TikTok',
    //     description: 'TikTok Connection Description',
    //     icon: <RatIcon />,
    //     strategy: 'TIKTOK',
    // },
    {
        title: 'Connect Salesforce',
        description: 'Salesforce Connection Description',
        icon: <Satellite />,
        strategy: 'CRM',
    },
]