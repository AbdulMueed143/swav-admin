import React, {useState} from 'react'
import { Loading } from 'components/shared'


const Home = () => {
    const loading = false

    return <>
        <div class="flex flex-col h-full">

            <Loading loading={loading} >


            </Loading>
        </div>
    </>
}

export default Home
