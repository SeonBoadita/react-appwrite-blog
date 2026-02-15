import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthLayout = ({ children, authentication = true }) => {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    useEffect(() => {
        // If route requires authentication and user is not logged in, redirect to login
        if (authentication && authStatus === false) {
            navigate("/login")
        }
        // If route is for guests only (like login/signup) and user is logged in, redirect to home
        else if (!authentication && authStatus === true) {
            navigate("/")
        }
    }, [authStatus, navigate, authentication])

    return <>{children}</>
}

export default AuthLayout
