import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.js'
import { logout } from "../../feature/authSlice.js"
const LogoutBtn = () => {
    const dispatch = useDispatch()

    const handelLogout = () => {
        authService.logoutAccount().then(() => {
            dispatch(logout())
        }).catch((error) => {
            console.error("Error :: handelLogout:", error);
        })
    }
    return <button style={{ padding: "4px 8px" }} onClick={handelLogout} className='bg-red-500 hover:cursor-pointer text-white rounded-md'>Logout</button>;
}

export default LogoutBtn
