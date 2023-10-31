import { useParamsStore } from '@/hooks/useParamsStore'
import React from 'react'
import Heading from './Heading'
import { Button } from 'flowbite-react'

type Props = {
    title?: string
    subtitle?: string
    showReset?: boolean
}

export default function EmptyFilter({ title = 'No matches for this filter', subtitle = 'try changing or resetting the filter', showReset }: Props) {

    const reset = useParamsStore(store => store.reset);
    return (

        <div className='h-[40] flex flex-col gap-2 justofy-center items-center shadow-lg'>
            <Heading
                title={title}
                subtitle={subtitle}
                center
            />
            <div className="m-20">
                {showReset && <Button outline onClick={reset}>
                    Remove Filters
                </Button>}
            </div>
        </div>

    )

}
