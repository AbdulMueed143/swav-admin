import React from 'react'
import { useSelector } from 'react-redux'
import BarbersGrid from './BarbersGrid'

const Home = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    return <>
        <div class="flex flex-col h-full">
            <BarbersGrid ></BarbersGrid>
        </div>
    </>
}

export default Home
