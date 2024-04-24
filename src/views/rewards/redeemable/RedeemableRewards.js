import { ActionLink, CalendarView, Loading } from 'components/shared'
import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'


const Home = () => {
    const userName = useSelector((state) => state.auth.user.userName)
    const loading = false
    return <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <FontAwesomeIcon icon={faGift} size="3x" style={{ marginBottom: '20px' }} />
      <h2 style={{ textAlign: 'center' }}>Rewards feature will be available soon</h2>
    </div>
    </>
}

export default Home
