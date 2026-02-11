import React from 'react'

const Container = ({ children }) => {
    return <div style={{ padding: "4px" }} className='container w-full h-screen'>
        {children}
    </div>;
}

export default Container
