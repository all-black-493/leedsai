'use server'

import { onSubscribe } from '@/actions/user'
import { redirect } from 'next/navigation'

type Props = {
    searchParams: {
        reference?: string,
        cancel?: boolean
    }
}

const Page = async ({ searchParams }: Props) => {
    const { reference, cancel } = await searchParams

    console.log('Reference and URL: ', reference)

    if (reference) {
        const customer = await onSubscribe(reference)
        console.log("STATUS :",customer.status)

        if (customer.status === 200) {
            redirect('/dashboard')
        } else {
            

            return (
                <div className="flex flex-col justify-center items-center h-screen w-full">
                    <h4 className='text-5xl font-bold'>
                        404
                    </h4>
                    <p className="text-xl font-bold">
                        Oops! Something went wrong
                    </p>
                </div>
            )
        }


    }

    if (cancel) {
        return (
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <h4 className='text-5xl font-bold'>
                    404
                </h4>
                <p className="text-xl font-bold">
                    Oops! Something went wrong. Cancelled.
                </p>
            </div>
        )
    }

}

export default Page