import { Input } from '@/components/ui/input'
import { useKeywords } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { useQueryAutomation } from '@/hooks/use-queries'
import { X } from 'lucide-react'
import React from 'react'


type Props = {
    id: string
}

const Keywords = ({ id }: Props) => {

    const { keyword, onValueChange, onKeyPress, deleteKeywordMutation } = useKeywords(id)
    const { latestVariable } = useMutationDataState(['add-keyword'])
    const { data } = useQueryAutomation(id)
    return (
        <div className='bg-background/80 flex flex-col gap-y-3 p-3 rounded-xl'>
            <p className="text-sm text-secondary">
                Add words that trigger automations
            </p>
            <div className="flex flex-wrap justify-start gap-2 items-center">
                {data?.data?.keywords &&
                    data.data.keywords.length > 0 &&
                    data.data.keywords.map(
                        (word) =>
                            word.id !== latestVariable?.variables.id &&
                            (
                                <div
                                    key={word.id}
                                    className='bg-background/90 flex items-center gap-x-2 capitalize text-sm font-semibold py-1 px-4 rounded-full'
                                >
                                    <p>{word.word}</p>

                                    <X
                                        size={15}
                                        color='red'
                                        onClick={() => deleteKeywordMutation({ id: word.id })}
                                    />
                                </div>
                            )
                    )
                }

                {latestVariable && latestVariable.status === 'pending' && (
                    <div className="bg-background/90 flex items-center gap-x-2 capitalize py-1 px-4 rounded-full">
                        {latestVariable.variables.keyword}
                    </div>
                )}
                <Input

                    placeholder='Add a keyword ...'
                    value={keyword}
                    className='p-0 bg-transparent ring-0 border-none outline-none'
                    onChange={onValueChange}
                    onKeyUp={onKeyPress}
                />
            </div>
        </div>
    )
}

export default Keywords
