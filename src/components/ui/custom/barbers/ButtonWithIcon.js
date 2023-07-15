
// import { Button } from '@/components/ui'
import { Button } from 'components/ui'
import { HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn } from 'react-icons/hi'
import { useState } from 'react';


const ButtonWithIcon = ({ label, onClick }) => {
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        onClick && onClick()
    }

    return (
        <div className="flex-wrap inline-flex xl:flex items-center gap-2">
            <Button
                className="mr-2"
                variant="solid"
                onClick={handleClick}
                loading={loading}
                icon={<HiOutlineInboxIn />}
            >
                <span>{label}</span>
            </Button>
        </div>
    )
}

export default ButtonWithIcon

