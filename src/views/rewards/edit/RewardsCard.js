import { hide } from '@popperjs/core';
import {  Avatar, Card } from 'components/ui';
import Button  from 'components/ui/Buttons/Button';


/**
 * 
 * Reward consists of 
 * 
 * 
 * Shop Name (Which shop is giving this reward?)
 *  + Ideally this is going to be geolocated shop, with place id
 * 
 * Number of visits required to get this reward
 * Repeat? (One Time, Multiple times) Is this reward going to be repeated after it has been given to user once?
 * Expire Date? After what date, this reward should get out of the users reach
 * RewardType? Determining is it percentage wise or it is dollar value
 * RewardValue? 10$ or 10%
 * 
*/


const RewardCard = ({ reward, onUpdateClick, onDeleteClick }) => {

    const formatDate = (dateObject) => {
        const date = new Date(dateObject);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); 
    };
    
    const getRewardTypeAsString = (rewardType) => {

        if(rewardType === 'CREDITS')
            return "$";

        if(rewardType === 'HAIRCUT')
            return "%";
    
        if(rewardType === 'DISCOUNT')
            return "%";

        if(rewardType === 'HAIRCUT')
            return "";

    }

    const RewardType = {
        Haircut : "HAIRCUT",
        Item : "ITEM",
        Credits: "CREDITS",
        Discount : "DISCOUNT"
    };

    //To make reward type immutable ...
    Object.freeze(RewardType);

    const RewardSource = {
        Internal: "INTERNAL", //default source, means shop itself is providing this reward
        External: "EXTERNAL", //some external sßhop
        Online: "ONLINE",
    };

    Object.freeze(RewardSource);

    const cardFooter = (
        <div cclassName="flex flex-col items-start">
           <div className="flex items-center mb-2">
                <Avatar
                    size={30}
                    className="mr-2"
                    shape="circle"
                />
                <span>
                    <p className="text-xs">Source: {reward?.source}</p>
                    <p className="text-xs">Expires On: {formatDate(reward?.expiryDate)}</p>
                </span>
            </div>

            <div className="flex">
                <Button className="mr-2 mb-2" variant="twoTone" color="red-600" onClick={() => onDeleteClick(reward)}>
                    Delete 
                </Button>
                <Button className="mr-2 mb-2" variant="twoTone" color="green-600" onClick={() => onUpdateClick(reward)}>
                    Update
                </Button>
            </div>
        </div>
    )

    return (
        <div className="max-w-xs w-full md:w-4/4 lg:w-5/5">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                footer={cardFooter}
                footerBorder={false}
            >
                <span className="text-emerald-600 font-semibold">
                    {reward?.shopName}
                </span>
                <p>
                    {reward?.description}
                </p>
                <h4 className="font-bold my-3"> Details </h4>
                <p className="truncate">
                    Required Number of Visists: {reward?.numberOfVisits}
                </p>
                <p className="truncate">
                    {reward?.type} of {reward?.value} {getRewardTypeAsString(reward?.type)}
                </p>
            </Card>
        </div>
    )
}

export default RewardCard

