import React from 'react'
import {
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from '@clerk/nextjs'
import { User2Icon } from 'lucide-react'
import Loader from '../loader'
import { Button } from '@/components/ui/button'

type Props = {}

const ClerkAuthState = (props: Props) => {
    return (
        <>
            <ClerkLoading>
                <Loader state>
                    <>
                    </>
                </Loader>
            </ClerkLoading>
            <SignedOut>
                <SignInButton>
                    <Button className='rounded-xl bg-[#252525] text-white hover:bg-[#252525]/70'>
                        <User2Icon />
                        Login
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton>
                    <UserButton.UserProfileLink
                        label="Dashboard"
                        url={`/dashboard`}
                        labelIcon={<User2Icon size={16} />}
                    />
                </UserButton>
            </SignedIn>
        </>
    )
}

export default ClerkAuthState
