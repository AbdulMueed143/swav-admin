import {  Avatar, Card } from 'components/ui'
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import React, { useState } from 'react';

const SubscriptionCard = ({ subscription }) => {

       // State to manage whether the subscription is selected or not
       const [isSelected, setIsSelected] = useState(false);

       const toggleSubscription = () => {
           setIsSelected(!isSelected);
       }

       const cardHeader = (
            <h4>{subscription.title}</h4>
        )
    
        const cardFooter = (

            <ButtonWithIcon 
            label={isSelected ? 'Subscribed' : 'Subscribe'}
            onClick={toggleSubscription}>
             
            </ButtonWithIcon>
        )


       return (
        <Card 
            header={cardHeader}
            footer={cardFooter}
            className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"

            >

               
                    Famouse for styles that have never been seen by humanity.
                <ul>
                    {subscription.features.map((feature, i) => 
                        <li key={i}>
                            {/* Show check mark if feature is included */}
                            {feature.included ? '✔️' : '❌'} {feature.name}
                        </li>
                    )}
                </ul>

                <small className="text-muted">Free Trial</small>

        </Card>
        )
}

export default SubscriptionCard;

