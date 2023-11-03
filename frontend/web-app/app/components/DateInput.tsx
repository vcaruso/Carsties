import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

type Params = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps & Partial<ReactDatePickerProps>

export default function DateInput(props: Params) {

    const { fieldState, field } = useController({ ...props, defaultValue: '' });

    return (
        <div className='block'>
            {props.showLabel && (
                <div className="mb-2 block">
                    <Label htmlFor={field.name} value={props.label} />
                </div>
            )}
            <DatePicker
                {...props}
                {...field}
                onChange={value => field.onChange(value)}
                selected={field.value}
                placeholderText={props.label}
                className={`
                    rounded-lg w-[100%] flex flex-col
                    ${fieldState.error
                        ? 'bg-red-50 border-red-500 text-red-900'
                        : (!fieldState.invalid && fieldState.isDirty) ? 'bg-green-50 border-green-500 text-green-900' : ''
                    }
                `}
            />
            {fieldState.error && (
                <div className="trxt-red-500 text-sm">{fieldState.error.message}</div>
            )}
        </div>
    )
}
