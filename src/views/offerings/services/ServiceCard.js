import { hide } from '@popperjs/core'
import { Avatar, Card } from 'components/ui'
import Button from 'components/ui/Buttons/Button'

const ServiceCard = ({ service, onUpdateClick, onDeleteClick }) => {
    const { id, name, description, price, averageTimeInMinutes } = service

    const cardFooter = (
        <div cclassName="flex flex-col items-start">
            <div className="flex items-center mb-2">
                <Avatar
                    size={30}
                    className="mr-2"
                    shape="circle"
                    src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                />
                <span>
                    <h6 className="text-sm">Duration</h6>
                    <span className="text-xs">
                        Takes approx {averageTimeInMinutes} Mint
                    </span>
                </span>
            </div>

            <div className="flex items-center mb-2">
                <span>
                    <h6 className="text-sm">Price</h6>
                    {price} AUD
                </span>
            </div>

            <div className="flex">
                <Button
                    className="mr-2 mb-2"
                    variant="twoTone"
                    color="red-600"
                    onClick={() => onDeleteClick(id)}
                >
                    Delete
                </Button>
                <Button
                    className="mr-2 mb-2"
                    variant="twoTone"
                    color="green-600"
                    onClick={() => onUpdateClick(service)}
                >
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
               
                <h4 className="font-bold my-3">{name}</h4>
                <p className="truncate">{description}</p>
                
            </Card>
        </div>
    )
}

export default ServiceCard
