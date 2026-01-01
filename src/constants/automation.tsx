import { BotIcon, Instagram, MessageSquareIcon } from "lucide-react"
import { v4 } from "uuid"

export type AutomationListenerProps = {
    id: string
    label: string
    icon: React.ReactNode
    description: string
    type: 'SMARTAI' | 'MESSAGE'
}

export type AutomationTriggerProps = {
    id: string
    label: string
    icon: React.ReactNode
    description: string
    type: 'COMMENT' | 'DM'
}

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
    {
        id: v4(),
        label: 'Send the user a message',
        icon: <MessageSquareIcon />,
        description: 'Enter the message that you want  to send to the user',
        type: 'MESSAGE',
    },
    {
        id: v4(),
        label: 'Let Smart AI take over',
        icon: <BotIcon />,
        description: 'Tell AI about your project. (Upgrade to use this feature)',
        type: 'SMARTAI',
    }
]

export const AUTOMATION_TRIGGERS: AutomationTriggerProps[] = [
    {
        id: v4(),
        label: 'User comments on my post',
        icon: <Instagram size={20} />,
        description: 'Select if you want to automate responding to comments on your post',
        type: 'COMMENT'
    },
    {
        id: v4(),
        label: 'User sends me a Direct Message with a keyword',
        icon: <Instagram size={20} />,
        description: 'Select if you want to automate DMs on your profile',
        type: 'DM'
    }
]