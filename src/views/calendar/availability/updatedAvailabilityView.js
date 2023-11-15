import React, { useState, useEffect, useMemo } from 'react';
// import Data from './barberAvailabilityData';
import styles from './updatedAvailabilityView.module.css';
import { Link } from 'react-router-dom';
import { Loading } from 'components/shared';
import useBookingServices from 'utils/hooks/useBookingService'
import DataTable from 'components/shared/DataTable'
import Button from 'components/ui/Buttons/Button'
import Drawer from 'components/ui/Drawer'
import { FaEdit, FaPlusCircle, FaRecycle, FaTimes } from 'react-icons/fa'; // Importing the edit and times (x) icons
import Dialog from 'components/ui/Dialog'
import { TimePicker } from 'antd';
import moment from 'moment';


const UpdatedAvailabilityView = (props) => {

    //Dialog for entering date time of the shift ...
    const [dialogIsOpen, setIsOpen] = useState(false);
    const [currentDaySelected, setCurrentDaySelected] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const openDialog = () => {
        setIsOpen(true)
        setStartTime(null);
        setEndTime(null);
    }


    const onDialogClose = () => {
        setIsOpen(false)
        setStartTime(null);
        setEndTime(null);

    }

    const onDialogOk = () => {

        setIsOpen(false)
        const selectedStartTime = moment(startTime, 'HH:mm').format('HH:mm');
        const selectedEndTime = moment(endTime, 'HH:mm').format('HH:mm');

        //first find the if we have the selected day?
        //there is probability of index out of bound
        // console.log("Current Selected day");
        // console.log(currentDaySelected);
        // console.log(editBarber.barberAvailability.days);
        // console.log(editBarber.barberAvailability.days[currentDaySelected]);


        if(currentDaySelected) {
            // if(!editBarber.days || editBarber.days.length == 0) {
            //     editBarber.days[currentDaySelected] = [{startTime: selectedStartTime, endTime: selectedEndTime}]
            // }
            // else {
                editBarber.barberAvailability.days[currentDaySelected] = [...editBarber.barberAvailability.days[currentDaySelected], {startTime: selectedStartTime, endTime: selectedEndTime}]
            // }
        }
        else {
            //technically there should be error dialog
            console.log("There should have been selected day");
        }

        setStartTime(null);
        setEndTime(null);
    }


    const handleCancel = () => {
    };


    //Bottom Drawer for editing
    const [horizontalOpen, setHorizontalOpen] = useState(false)
    const onHorizontalOpen = (barberWeClickedOn) => {
        setHorizontalOpen(true)
        setEditBarber(barberWeClickedOn);
        console.log(editBarber);

    }

    const onDrawerClose = () => {
        setHorizontalOpen(false)
    }

    const handleAddItem = (day) => {
        console.log("selected day");
        console.log(day);
        setCurrentDaySelected(day);
        openDialog();
    };

    const handleDeleteShift = (shift) => {

    }


    const days = ["NAME", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const editableDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];


    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    });

    const [editableTableData, setEditableTableData] = useState({
        total: 1,
        pageIndex: 1,
        pageSize: 1,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    });

    function getDaysJoinedListFromDaysList(day) {
        if (!day || day.length === 0) {
            return "N/A";
        } else {
            // This assumes that your data rendering is simple text, modify if needed
            return day.join(', '); 
        }
    }


    function getDaysJoinedListFromDaysListWithButton(days, dayName) {
        if (!days || days.length === 0) {
            return <>
                        <Button size="xs" onClick={() => handleAddItem(dayName)}>
                            <FaPlusCircle /> 
                        </Button>
            </>;
        } else {
            // This assumes that your data rendering is simple text, modify if needed
            return days.map((day, index) => (
                <div key={index} style={{borderRadius: '50%', padding: '10px', border: '1px solid black', display: 'inline-block', margin: '5px'}}>
                    {day.startTime} - {day.endTime}
                </div>
            ))
            ; 
        }
    }


    const columnsForEditing = useMemo(() => {
        return [
            {
                header: 'MONDAY',
                accessorKey: 'barberAvailability.days.MONDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysListWithButton(props.row.original.barberAvailability?.days?.MONDAY, "MONDAY");
                },
            },
            {
                header: 'TUESDAY',
                accessorKey: 'barberAvailability.days.TUESDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysListWithButton(props.row.original.barberAvailability?.days?.TUESDAY, "TUESDAY");
                },
            },
            {
                header: 'WEDNESDAY',
                accessorKey: 'barberAvailability.days.WEDNESDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysListWithButton(props.row.original.barberAvailability?.days?.WEDNESDAY, "WEDNESDAY");
                },
            },
            {
                header: 'THURSDAY',
                accessorKey: 'barberAvailability.days.THURSDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysListWithButton(props.row.original.barberAvailability?.days?.THURSDAY, "THURSDAY");
                },
            },
            {
                header: 'FRIDAY',
                accessorKey: 'FRIDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysListWithButton(props.row.original.barberAvailability?.days?.FRIDAY, "FRIDAY");
                },
            },
            {
                header: 'SATURDAY',
                accessorKey: 'barberAvailability.days.SATURDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysListWithButton(props.row.original.barberAvailability?.days?.SATURDAY, "SATURDAY");

                },
            },
            {
                header: 'SUNDAY',
                accessorKey: 'barberAvailability.days.SUNDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysListWithButton(props.row.original.barberAvailability?.days?.SUNDAY, "SUNDAY");
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <>
                        <Button size="xs" onClick={() => handleDeleteShift(props.row.original)}>
                            <FaRecycle /> 
                        </Button>
                    </>
                ),
            },
        ]
    }, []);

    const columns = useMemo(() => {
        return [
            {
                header: 'NAME',
                accessorKey: 'firstName',
            },
            {
                header: 'MONDAY',
                accessorKey: 'barberAvailability.days.MONDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysList(props.row.original.barberAvailability?.days?.MONDAY);
                },
            },
            {
                header: 'TUESDAY',
                accessorKey: 'barberAvailability.days.TUESDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysList(props.row.original.barberAvailability?.days?.TUESDAY);
                },
            },
            {
                header: 'WEDNESDAY',
                accessorKey: 'barberAvailability.days.WEDNESDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysList(props.row.original.barberAvailability?.days?.WEDNESDAY);
                },
            },
            {
                header: 'THURSDAY',
                accessorKey: 'barberAvailability.days.THURSDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysList(props.row.original.barberAvailability?.days?.THURSDAY);
                },
            },
            {
                header: 'FRIDAY',
                accessorKey: 'FRIDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysList(props.row.original.barberAvailability?.days?.FRIDAY);
                },
            },
            {
                header: 'SATURDAY',
                accessorKey: 'barberAvailability.days.SATURDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysList(props.row.original.barberAvailability?.days?.SATURDAY);
                },
            },
            {
                header: 'SUNDAY',
                accessorKey: 'barberAvailability.days.SUNDAY',
                cell: (props) => {
                    return getDaysJoinedListFromDaysList(props.row.original.barberAvailability?.days?.SUNDAY);
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <>
                        <Button size="xs" onClick={() => onHorizontalOpen(props.row.original)}>
                            <FaEdit /> 
                        </Button>
                    </>
                ),
            },
            
        ]
    }, []);



    const handlePaginationChange = (pageIndex) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageIndex } }))
    }

    const handleSelectChange = (pageSize) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageSize } }))
    }

    const handleSort = ({ order, key }) => {
        setTableData((prevData) => ({
            ...prevData,
            sort: { order, key }
        }))
    }

    useEffect(() => {
        fetchBarbers();
    }, []); // Empty dependency array means the effect will only run once


    //Loading Different services to be used
    const { getBarbers } = useBookingServices();


    //Methods to load all the barber  .... for availability page view .... 
    const [loading, setLoading] = useState(false);
    const [barbers, setBarbers] = useState([]); 
    let [editBarber, setEditBarber] = useState([]); 


    const fetchBarbers = async () => {
        setLoading(true);
        const data = await getBarbers();
        setBarbers(data);
        setLoading(false);
        setTableData((prevData) => ({
            ...prevData,
            ...{ total: data.total },
        }))
    };

    return (
        <div >

            <Loading loading={loading} >

            <DataTable 
                columns={columns}
                data={barbers}
                loading={loading}
                pagingData={{
                    total: tableData.total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
            />
            </Loading>


            <Drawer
                title={editBarber.firstName+' '+editBarber.lastName}
                isOpen={horizontalOpen}
                placement="bottom"
                height="70vh"
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <div class="gridview">
                    <div class="left-column">
                        <div class="left-row">
                            <DataTable 
                                columns={columnsForEditing}
                                data={[editBarber]}
                                loading={loading}
                                pagingData={{
                                    total: editableTableData.total,
                                    pageIndex: editableTableData.pageIndex,
                                    pageSize: editableTableData.pageSize,
                                }}
                                onPaginationChange={handlePaginationChange}
                                onSelectChange={handleSelectChange}
                                onSort={handleSort}
                            />
                        </div>
                        <div class="left-row">Left Roasd fas fsad fsa asfsa saf sa fsaf s w 2</div>
                    </div>
                    <div class="right-column">Right Column</div>
                </div>
            </Drawer>


            <Dialog
                isOpen={dialogIsOpen}
                style={{
                    content: {
                        marginTop: 250,
                    },
                }}
                contentClassName="pb-0 px-0"
                onClose={()=>onDialogClose()}
                onRequestClose={()=>onDialogClose()}
            >
                <div className="px-6 pb-6">
                    <h5 className="mb-4">Add Shift</h5>
                    <div>
                        {/* <div>
                            <p>Start Time:</p>
                            <TimePicker 
                                format="HH:mm" 
                                onChange={(time) => setStartTime(time ? time.format('HH:mm') : null)} 
                                value={startTime ? moment(startTime, 'HH:mm') : null}
                            />
                        </div>
                <div>
                    <p>End Time:</p>
                    <TimePicker 
                        format="HH:mm" 
                        onChange={(time) => setEndTime(time ? time.format('HH:mm') : null)} 
                        value={endTime ? moment(endTime, 'HH:mm') : null}
                    />
                </div> */}
                    </div>
                </div>
                <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={()=>onDialogClose()}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={()=>onDialogOk()}>
                        Okay
                    </Button>
                </div>
            </Dialog>


        </div>
    )
}

export default UpdatedAvailabilityView
