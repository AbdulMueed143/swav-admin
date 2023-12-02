import React, { useState, useEffect, useMemo } from 'react';
// import Data from './barberAvailabilityData';
import { Loading } from 'components/shared';
import DataTable from 'components/shared/DataTable'
import Button from 'components/ui/Buttons/Button'
import Drawer from 'components/ui/Drawer'
import { FaEdit, FaPlusCircle, FaRecycle, FaTimes } from 'react-icons/fa'; // Importing the edit and times (x) icons
import Dialog from 'components/ui/Dialog'
import { TimePicker } from 'antd';
import moment from 'moment';
import useAvailabilityService from 'utils/hooks/CustomServices/useAvailabilityService';
import Alert from 'components/ui/Alert';


const UpdatedAvailabilityView = (props) => {
       //Alert
       const [serverError, setServerError] = useState(false);
       const [serverErrorMessage, setServerErrorMessage] = useState(false);
   
       const handleAlertClose = () => {
           setServerError(false);
           setServerErrorMessage('');
       }
   

    //Loading Different services to be used
    const { getBarbersWithAvailability, updateBarberAvailability  } = useAvailabilityService();

    //Dialog for entering date time of the shift ...
    const [dialogIsOpen, setIsOpen] = useState(false);
    const [currentDaySelected, setCurrentDaySelected] = useState(null);
    const [startTime, setStartTime] = useState(moment().format('HH:mm'));
    const [endTime, setEndTime] = useState(startTime);

    const openDialog = () => {
        setIsOpen(true)
        setStartTime(moment().format('HH:mm'));
        setEndTime(moment().format('HH:mm'));
    }


    const onDialogClose = () => {
        setIsOpen(false)
        setStartTime(moment().format('HH:mm'));
        setEndTime(moment().format('HH:mm'));

    }

    const saveAvailabilityUpdates = async (editedBarberAvailability) => {
        //To save the template update we have to make network request for each template
        //lets just make network request 

        //Close the drawer
        setHorizontalOpen(false);
        setLoading(true);

        const response = await updateBarberAvailability(editedBarberAvailability);

        //one we will show error in case there is error


        //if error show the error otherwise reload data ... show loading bar
        if(response.status === -1) {
            //something went wrong ...
                  //something went wrong ...
            setServerError(true);
            setServerErrorMessage(response.message);
        }
        else {
            fetchBarbers();
        }

        setLoading(false);

    }

    const onDialogOk = () => {

        setIsOpen(false)
        const selectedStartTime = moment(startTime, 'HH:mm');
        const selectedEndTime = moment(endTime, 'HH:mm');

        if(currentDaySelected) {

            //first we check if we already have atleast 1 value in template?
            //if yes we do following
            const hasSelectedDay = editBarber?.barberAvailability?.find(item => {
                if(item?.barberAvailabilitiesTemplate?.dayOfWeek == currentDaySelected)
                    return true;

                return false;
            });

            if(hasSelectedDay) {
                addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime);
            }
            else {
                //but add empty array to fill for the day ...
                addEmptyDayOfWeek(currentDaySelected);
                //then and this 
                addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime);
            }
         
        }
        else {
            //technically there should be error dialog
            console.log("There should have been selected day");
        }

        setStartTime(null);
        setEndTime(null);
    }

    function addEmptyDayOfWeek(theDay) {
      
        editBarber?.barberAvailability?.push(
            {
                barberAvailabilitiesTemplate: {
                    dayOfWeek: theDay,
                    timeSlots : []
                }
            }
        );
    }

    function addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime) {

        const startTimeObject = {
            hour: selectedStartTime.hour(),
            minute: selectedStartTime.minute()
        }

        const endTimeObject = {
            hour: selectedEndTime.hour(),
            minute: selectedEndTime.minute()
        }

        for (const barberAvailability of editBarber?.barberAvailability) {
      
            if(barberAvailability?.barberAvailabilitiesTemplate?.dayOfWeek == currentDaySelected) {
                barberAvailability?.barberAvailabilitiesTemplate?.timeSlots.push({
                    attendanceStatus: "TO_BE_MARKED",
                    slotName: currentDaySelected,
                    startTime: startTimeObject,
                    endTime: endTimeObject
                });
            }
        }
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
        setCurrentDaySelected(day);
        openDialog();
    };

    const handleDeleteShift = (shift) => {

    }

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

    function getDaysJoinedListFromDaysList(timeSlots) {
        if (!timeSlots || timeSlots.length === 0) {
            return "N/A";
        } else {
            // This assumes that your data rendering is simple text, modify if needed
            return <>
             <ul className="timeSlotList">
                {timeSlots.map((slot, index) => (
                    <li key={index} className="timeSlotListItem rounded">
                        {`${slot.startTime.hour}:${slot.startTime.minute.toString().padStart(2, '0')} to ${slot.endTime.hour}:${slot.endTime.minute.toString().padStart(2, '0')}`}
                    </li>
                ))}
            </ul>
            </>; 
        }
    }

    function getDaysJoinedListFromDaysListWithButton(timeSlots, dayName) {

        if (!timeSlots || timeSlots.length === 0) {
            return <>
                        <Button size="xs" onClick={() => handleAddItem(dayName)}>
                            <FaPlusCircle /> 
                        </Button>
            </>;
        } else {
            // This assumes that your data rendering is simple text, modify if needed
            return <>

              <ul className="timeSlotList">
                {timeSlots.map((slot, index) => (
                    <li key={index} className="timeSlotListItem" style={{fontSize:'13px'}}>
                        {`${slot.startTime.hour}:${slot.startTime.minute.toString().padStart(2, '0')} to ${slot.endTime.hour}:${slot.endTime.minute.toString().padStart(2, '0')}`}
                    </li>
                ))}

                <li key="button" className="timeSlotListItemrounded">
                    <Button size="xs" onClick={() => handleAddItem(dayName)}>
                        <FaPlusCircle /> 
                    </Button> 
                </li> 
            </ul>
            
            </>
            ; 
        }
    }


    function findTimeSlotsByDay(data, dayOfWeek) {
        // Find the object with matching dayOfWeek
        const matchingTemplate = data.find(item =>
            item.barberAvailabilitiesTemplate.dayOfWeek === dayOfWeek
        );
    
        // If a matching object is found, return its timeSlots, otherwise return an empty array
        return matchingTemplate ? matchingTemplate.barberAvailabilitiesTemplate.timeSlots : [];
    }


    const columnsForEditing = useMemo(() => {
        return [
            {
                header: 'MONDAY',
                accessorKey: 'barberAvailability.days.MONDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "MONDAY");
                    return getDaysJoinedListFromDaysListWithButton(timeSlots, "MONDAY");
                },
            },
            {
                header: 'TUESDAY',
                accessorKey: 'barberAvailability.days.TUESDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "TUESDAY");

                    return getDaysJoinedListFromDaysListWithButton(timeSlots, "TUESDAY");
                },
            },
            {
                header: 'WEDNESDAY',
                accessorKey: 'barberAvailability.days.WEDNESDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "WEDNESDAY");

                    return getDaysJoinedListFromDaysListWithButton(timeSlots, "WEDNESDAY");
                },
            },
            {
                header: 'THURSDAY',
                accessorKey: 'barberAvailability.days.THURSDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "THURSDAY");

                    return getDaysJoinedListFromDaysListWithButton(timeSlots, "THURSDAY");
                },
            },
            {
                header: 'FRIDAY',
                accessorKey: 'FRIDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "FRIDAY");
                    return getDaysJoinedListFromDaysListWithButton(timeSlots, "FRIDAY");
                },
            },
            {
                header: 'SATURDAY',
                accessorKey: 'barberAvailability.days.SATURDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "SATURDAY");
                    return getDaysJoinedListFromDaysListWithButton(timeSlots);

                },
            },
            {
                header: 'SUNDAY',
                accessorKey: 'barberAvailability.days.SUNDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "SUNDAY");
                    return getDaysJoinedListFromDaysListWithButton(timeSlots, "SUNDAY");
                },
            },
            // {
            //     header: '',
            //     id: 'action',
            //     cell: (props) => (
            //         <>
            //             <Button size="xs" onClick={() => handleDeleteShift(props.row.original)}>
            //                 <FaRecycle /> 
            //             </Button>
            //         </>
            //     ),
            // },
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
                accessorKey: 'barberAvailability.MONDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "MONDAY");
                    return getDaysJoinedListFromDaysList(timeSlots);
                },
            },
            {
                header: 'TUESDAY',
                accessorKey: 'barberAvailability.TUESDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "TUESDAY");
                    return getDaysJoinedListFromDaysList(timeSlots);
                },
            },
            {
                header: 'WEDNESDAY',
                accessorKey: 'barberAvailability.WEDNESDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "WEDNESDAY");
                    return getDaysJoinedListFromDaysList(timeSlots);
                },
            },
            {
                header: 'THURSDAY',
                accessorKey: 'barberAvailability.THURSDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "THURSDAY");
                    return getDaysJoinedListFromDaysList(timeSlots);
                },
            },
            {
                header: 'FRIDAY',
                accessorKey: 'FRIDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "FRIDAY");
                    return getDaysJoinedListFromDaysList(timeSlots);
                },
            },
            {
                header: 'SATURDAY',
                accessorKey: 'barberAvailability.days.SATURDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "SATURDAY");
                    return getDaysJoinedListFromDaysList(timeSlots);
                },
            },
            {
                header: 'SUNDAY',
                accessorKey: 'barberAvailability.days.SUNDAY',
                cell: (props) => {
                    const timeSlots = findTimeSlotsByDay(props.row.original.barberAvailability, "SUNDAY");
                    return getDaysJoinedListFromDaysList(timeSlots);
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



    //Methods to load all the barber  .... for availability page view .... 
    const [loading, setLoading] = useState(false);
    const [barbers, setBarbers] = useState([]); 
    let [editBarber, setEditBarber] = useState([]); 


    const fetchBarbers = async () => {
        setLoading(true);
        const barbersWithAvailability = await getBarbersWithAvailability();
        setBarbers(barbersWithAvailability);
        //We need copy for the edit view because we will allow that to be modified ...
        // setEditableListBarbers(barbersWithAvailability);
        setLoading(false);
        setTableData((prevData) => ({
            ...prevData,
            ...{ total: barbersWithAvailability.total },
        }))
    };

    return (
        <div >

            <Loading loading={loading} >

            {serverError && (
             <div>
                <Alert showIcon onClose={handleAlertClose} type="danger" title="Error!">
                    {serverErrorMessage}
                </Alert>
            </div>
            )}


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
                                pagination={false}
                                style={{ fontSize: '6px' }}
                                selectable={false}
                            />
                        </div>
                    </div>
                    <div class="right-column">

                    <Button 
                        onClick={() => saveAvailabilityUpdates(editBarber)}
                        color="primary">
                            Save Regular Hourly Shifts
                    </Button>
                    
                    </div>
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
                            <p>Start Time:</p>
                            <TimePicker 
                                 format="HH:mm" 
                                 onChange={(time) => setStartTime(time ? time.format('HH:mm') : null)} 
                                //  value={startTime ? moment(startTime, 'HH:mm') : null}
                                 minuteStep={15}

                            />
                        <p>End Time:</p>
                        <TimePicker 
                            format="HH:mm" 
                            onChange={(time) => setEndTime(time ? time.format('HH:mm') : null)} 
                            // value={endTime ? moment(endTime, 'HH:mm') : null}
                            minuteStep={15}

                        />
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
