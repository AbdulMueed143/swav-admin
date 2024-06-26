import { ActionLink, CalendarView, Loading } from 'components/shared'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import './rewards.css';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon'
import AddRewardDialog from './dialog/AddRewardDialog'
import RewardsGrid from './RewardsGrid'
import RewardsCycleGrid from './RewardCycle/RewardsCycleGrid'

const Home = () => {

    const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const userName = useSelector((state) => state.auth.user.userName)
  
  return <>
    <div>

    <div id="rewards" class="section">
        <RewardsGrid />
    </div>
    <div id="reward-cycle" class="section">
        <RewardsCycleGrid />
    </div>

    </div>
    </>
}

export default Home
