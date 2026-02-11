import React from 'react'

const Button = ({
    buttontitle,
    type = "button",
    className = "",
    ...props
}) => {
    return (
        <div>
            <button type={type} className={className} {...props}>
                {buttontitle}
            </button>
        </div>
    )
}

export default Button
