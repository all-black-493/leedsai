import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { PowerCircle } from 'lucide-react'
import { useQueryAutomation } from '@/hooks/use-queries'
import { useMutationData } from '@/hooks/use-mutation-data'
import { activateAutomation } from '@/actions/automations'


type Props = {
  id: string
}

const ActivateAutomationButton = ({ id }: Props) => {

  const { data } = useQueryAutomation(id)
  const { mutate, isPending } = useMutationData(
    ['activate'],
    (data: { state: boolean }) => activateAutomation(id, data.state),
    'automation-info'
  )
  return (
    <Button
      onClick={() => mutate({ state: !data?.data?.active })}
      className='lg:px-10 hover:opacity-80 bg-linear-to-br from-[#32cd8f] to-[#218b60] text-white text-sm font-semibold rounded-full mx-4'>
      <Loader state={isPending}>
        <PowerCircle />
        <p className="lg:inline hidden">
          {data?.data?.active ? 'Disable' : 'Activate'}
        </p>
      </Loader>
    </Button>
  )
}

export default ActivateAutomationButton
