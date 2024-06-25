import React from 'react'
import { useSelector } from 'react-redux'
import ServicesGrid from './ServicesGrid'

const Home = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    return (
        <>
            <div class="flex flex-col h-full">
                <div class="flex gap-4">
                    <ServicesGrid />
                </div>
            </div>
        </>
    )
}

export default Home
