import { BotIcon, HomeIcon, RocketIcon, Settings, Users2Icon } from "lucide-react"

export const PAGE_BREAD_CRUMBS: string[] = [
  'contacts',
  'automations',
  'integrations',
  'settings',
]

type Props = {
  [page in string]: React.ReactNode
}

export const PAGE_ICON: Props = {
  AUTOMATIONS: <BotIcon />,
  CONTACTS: <Users2Icon />,
  INTEGRATIONS: <RocketIcon />,
  SETTINGS: <Settings />,
  HOME: <HomeIcon />
}

export const TIERS = [
  {
    name: "Starter",
    price: "Kshs 2,999",
    description: "Perfect for testing the waters.",
    features: ["1,000 AI responses/month", "Basic automation flows", "Instagram only", "Email support", "7-day retention"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "Kshs 7,999",
    description: "Scale your reach with advanced tools.",
    features: [
      "10,000 AI responses/month",
      "Advanced flow builder",
      "Omnipresence (Instagram, WhatsApp, TikTok)",
      "CRM integrations",
      "Priority support",
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    name: "Business",
    price: "Kshs 39,999",
    description: "Maximum power for serious volume.",
    features: [
      "Unlimited AI responses",
      "Custom AI training",
      "All channels + API access",
      "Dedicated account manager",
      "SLA & Enterprise security",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
]