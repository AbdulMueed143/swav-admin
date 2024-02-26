import React from 'react'
import { useSelector } from 'react-redux'
import Tabs from 'components/ui/Tabs'


const Home = () => {

    const userName = useSelector((state) => state.auth.user.userName)
    return <>
        <div class="flex flex-col h-full">
        <div>
          
        </div>
        </div>
    </>
}

export default Home
