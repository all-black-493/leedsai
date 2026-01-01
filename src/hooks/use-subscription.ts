'use client'

import axios from "axios"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export const useSubscription = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)

  const onSubscribe = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      console.error("User not signed in or not loaded")
      return
    }
    setIsProcessing(true)
    try {
      const response = await axios.post('/api/payment', {
        email: user.emailAddresses[0].emailAddress,
        planCode: 'PLN_olram8lty0f34t9',
      })
      if (response.data.status === true) {
        window.location.href = response.data.authorization_url
      } else {
        console.error("Payment initialization failed", response.data)
        setIsProcessing(false)
      }
    } catch (err) {
      console.error("Error calling payment endpoint", err)
      setIsProcessing(false)
    }
  }

  return { onSubscribe, isProcessing }
}
