import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { login } from '../feature/authSlice'
import { useDispatch } from 'react-redux'
import InputFields from './InputFields'
import Button from './Button'
const Signup = () => {
    const [error, setError] = useState("")
    const { register, handelSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signup = async (data) => {
        setError("")
        try {
            const accountCreate = await authService.createAccount(data)
            if (accountCreate) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            console.log("Signup :: Error", error);
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-md' style={{ padding: '2rem', margin: '1rem' }}>
                <h2 className='text-2xl font-bold text-gray-900 text-center' style={{ marginBottom: '1.5rem' }}>
                    Sign Up
                </h2>

                {error && (
                    <p className='text-red-500 text-sm text-center' style={{ marginBottom: '1rem' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handelSubmit(signup)}>
                    <InputFields
                        labelName="Name"
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: true,
                        })}
                    />

                    <InputFields
                        labelName="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                            }
                        })}
                    />

                    <InputFields
                        labelName="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />

                    <Button
                        buttontitle="Sign Up"
                        type="submit"
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200'
                        style={{ paddingTop: '0.625rem', paddingBottom: '0.625rem', marginTop: '1rem' }}
                    />
                </form>

                <p className='text-sm text-gray-600 text-center' style={{ marginTop: '1.5rem' }}>
                    Already have an account?{' '}
                    <span className='text-blue-600 hover:text-blue-700 cursor-pointer font-medium'>
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Signup
