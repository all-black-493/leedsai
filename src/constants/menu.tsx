import { BotIcon, HomeIcon, RocketIcon, SettingsIcon } from 'lucide-react'
import {v4 as uuid } from 'uuid'

type FieldProps = {
    label: string
    id: string
}

type SideBarProps = {
    icon: React.ReactNode
} & FieldProps


export const SIDEBAR_MENU: SideBarProps[] = [
    {
        id: uuid(),
        label: 'home',
        icon:  <HomeIcon />
    },
    {
        id: uuid(),
        label: 'automations',
        icon:  <BotIcon />
    },
    {
        id: uuid(),
        label: 'integrations',
        icon:  <RocketIcon />
    },
    {
        id: uuid(),
        label: 'settings',
        icon:  <SettingsIcon />
    },

]
