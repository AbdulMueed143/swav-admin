
import Timeline from 'components/ui/Timeline'
import Avatar from 'components/ui/Avatar'
import Badge from 'components/ui/Badge'
import Card from 'components/ui/Card'
import Tag from 'components/ui/Tag'
import { HiTag } from 'react-icons/hi'

const AppointmentTimeline = () => {
    return (
        <div className="max-w-[700px]">
            <Timeline>
                <Timeline.Item
                    media={
                        <Avatar className="bg-amber-500">
                            C
                        </Avatar>
                    }
                >
                    <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            1:30 PM{' '}
                        </span>
                        <span className="mx-2"> Appointments </span>
                        <Badge className="bg-emerald-500" />
                        <span className="ml-1 rtl:mr-1 font-semibold text-gray-900 dark:text-gray-100">
                            In Progress
                        </span>
                        <span className="ml-3 rtl:mr-3">Now</span>
                    </p>

                    <Card className="mt-4">
                    <Timeline.Item
                        media={
                            <Avatar
                                alt="NOW"
                                className="bg-amber-500"
                            />
                        }
                    >
                        <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Chat GPT
                        </span>
                        <span className="mx-2"> Appointment with </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Neil Barber
                        </span>
                        </p>
                    </Timeline.Item>

                    </Card>
                </Timeline.Item>
                <Timeline.Item
                    media={
                        <Avatar
                            alt="NOW"
                            className="bg-amber-500"
                        />
                    }
                >
                    <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            2:30 PM
                        </span>
                        <span className="mx-2"> Appointments </span>
                        {/* <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Appointment
                        </span>
                        <span className="ml-3 rtl:mr-3">at 2:30 PM</span> */}
                    </p>
                    <Card className="mt-4">
                    <Timeline.Item
                        media={
                            <Avatar
                                alt="NOW"
                                className="bg-amber-500"
                            />
                        }
                    >
                        <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Philip Existential Crisis
                        </span>
                        <span className="mx-2"> Appointment with </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Neil Barber
                        </span>
                        </p>
                    </Timeline.Item>
                    <Timeline.Item
                        media={
                            <Avatar
                                alt="NOW"
                                className="bg-amber-500"
                            />
                        }
                    >
                        <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Friedrich Neitche
                        </span>
                        <span className="mx-2"> Appointment with </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Country Roads
                        </span>
                        </p>
                    </Timeline.Item>


                    </Card>
                </Timeline.Item>
                <Timeline.Item
                    media={
                        <Avatar className="text-gray-700 bg-gray-200 dark:text-gray-100">
                            <HiTag />
                        </Avatar>
                    }
                >
                    <p className="flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            4:30 PM{' '}
                        </span>
                        <span className="mx-2"> Appointments </span>
                        {/* <Tag
                            prefix
                            className="mr-2 rtl:ml-2 cursor-pointer"
                            prefixClass="bg-rose-500"
                        >
                            Live Issue
                        </Tag>
                        <Tag
                            prefix
                            className="mr-2 rtl:ml-2 cursor-pointer"
                            prefixClass="bg-blue-600"
                        >
                            Backend
                        </Tag> */}
                    </p>

                    <Card className="mt-4">
                    <Timeline.Item
                        media={
                            <Avatar
                                alt="NOW"
                                className="bg-amber-500"
                            />
                        }
                    >
                        <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Charles
                        </span>
                        <span className="mx-2"> Appointment with </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Neil Barber
                        </span>
                        </p>
                    </Timeline.Item>
                    <Timeline.Item
                        media={
                            <Avatar
                                alt="NOW"
                                className="bg-amber-500"
                            />
                        }
                    >
                        <p className="my-1 flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Karl Max
                        </span>
                        <span className="mx-2"> Appointment with </span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Country Roads
                        </span>
                        </p>
                    </Timeline.Item>


                    </Card>
                </Timeline.Item>
            </Timeline>
        </div>
    )
}

export default AppointmentTimeline

