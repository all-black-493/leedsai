import { v4 } from "uuid"

type Props = {
    id: string
    label: string
    subLabel: string
    description: string
}

export const DASHBOARD_CARDS: Props[] = [
    {
        id: v4(),
        label: 'Generate Auto Replies',
        subLabel: 'Deliver a product lineup through Instagram',
        description: 'Get products in front of your followers in as many places'
    },
    {
        id: v4(),
        label: 'Answer customer queries with AI',
        subLabel: 'Identify and respond to questions with personalized AI',
        description: 'The intention of the message will be automatically detected'
    },
    {
        id: v4(),
        label: 'Customize your automations',
        subLabel: 'Change how you want to respond to multiple customers at once',
        description: 'Choose which posts you want your AI to respond to and control multiple automations'
    }
]