import React from 'react'
import RegisterForm from '../_components/registerFrom'
import Link from 'next/link'

const userRegisterPage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center  justify-center  px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Register Now</h1>

            <p className="mt-2 text-sm text-gray-500">
              Register to your FixItNow account
            </p>
          </div>

          <RegisterForm />

          
        </div>
      </div>
    </>
  )
}

export default userRegisterPage