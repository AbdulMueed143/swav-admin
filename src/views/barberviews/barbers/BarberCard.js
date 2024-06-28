import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card } from 'components/ui'
import Button from 'components/ui/Buttons/Button'
import Switcher from 'components/ui/Switcher'

const BarberCard = ({ barber, onStatusSwitcherToggle, onSettingsClicked }) => {
    const {
        barberId,
        firstName,
        lastName,
        email,
        phoneNumber,
        amenities,
        about,
        status,
    } = barber

    const cardFooter = (
        <div cclassName="flex flex-col items-start">
            <div className="flex items-center mb-2">
                <Avatar
                    size={30}
                    className="mr-2"
                    shape="circle"
                    src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                />
                <span className="truncate">
                    <h6 className="text-sm">Services</h6>
                    <div className="text-xs overflow-hidden ">
                        {amenities && amenities.length > 0 ? (
                            amenities.map((amenity, index) => (
                                <span key={index}>{amenity.name}</span>
                            ))
                        ) : (
                            <div>No services available</div>
                        )}
                    </div>
                </span>
            </div>

            <div className="flex items-center mb-2">
                <span>
                    <h6 className="text-sm">Detials</h6>
                    <div className="text-xs">{email}</div>
                    <div className="text-xs">{phoneNumber}</div>
                </span>
            </div>

            <div className="flex">
                <Switcher
                    className="mr-2 mb-2"
                    defaultChecked={status !== 'DISABLED'}
                    onChange={(checked) =>
                        onStatusSwitcherToggle(checked, barberId)
                    }
                />
            </div>
        </div>
    )

    const cardHeader = (
        <div
            className="rounded-tl-lg rounded-tr-lg overflow-hidden relative"
            style={{ height: '250px', width: '300px' }}
        >
            <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src="https://images.unsplash.com/photo-1630827020718-3433092696e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                alt="card header"
            />
            <FontAwesomeIcon
                icon={faCog}
                className="absolute top-0 right-0 m-2 text-white"
                onClick={() => onSettingsClicked(barberId)}
            />
        </div>
    )

    return (
        <div
            className="max-w-xs"
            style={{ width: '300px', minHeight: '500px' }}
        >
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={cardHeader}
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                {/* <span className="text-emerald-600 font-semibold">
                    Cost 60 AUD
                </span> */}
                <h4 className="font-bold my-3">
                    {firstName} {lastName}
                </h4>
                <p /*className="truncate"*/>{about}</p>
            </Card>
        </div>
    )
}

export default BarberCard
