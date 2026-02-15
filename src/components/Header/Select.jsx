import React, { forwardRef, useId } from 'react'

const Select = ({
    labelName,
    options = [],
    className = '',
    ...props
}, ref) => {

    const id = useId()
    return (
        <div className='w-full' style={{ marginBottom: '1rem' }}>
            {labelName && <label className='inline-block text-sm font-medium text-gray-700' style={{ marginBottom: '0.5rem' }} htmlFor={id}>{labelName}</label>}
            <select
                ref={ref}
                id={id}
                className={`w-full rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${className}`}
                style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)
