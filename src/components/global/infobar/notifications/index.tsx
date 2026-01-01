import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'

const Notifications = () => {
    return (
        <Button className='rounded-full py-6'>
            <Bell
                color='#fff'
            />
        </Button>
    )
}

export default Notifications
