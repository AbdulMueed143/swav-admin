import {  Avatar, Card } from 'components/ui'

const BaseMatrixCard = ({value, label, description}) => {

    return (
        <div className="max-w-xs">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                // header={cardHeader}
                // footer={cardFooter}
                // headerClass="p-0"
                // footerBorder={false}
                // headerBorder={false}
            >
            <div className="flex items-center">
            <Avatar
                size={60}
                className="mr-2"
                shape="circle"
                src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                
            />
            <span>
                <span className="text-emerald-600 font-semibold">
                    {value} {label}
                </span>
                <p>
                    {description}
                </p>
            </span>
        </div>
            </Card>
        </div>
    )
}

export default BaseMatrixCard

