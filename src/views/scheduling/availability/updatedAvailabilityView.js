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
import AvailabilityGrid from './availabilitycard/AvailabilityGrid';


const UpdatedAvailabilityView = (props) => {
       //Alert
       const [serverError, setServerError] = useState(false);
       const [serverErrorMessage, setServerErrorMessage] = useState(false);
   
       const handleAlertClose = () => {
           setServerError(false);
           setServerErrorMessage('');
       }
   
    //Loading Different services to be used
    const { updateBarberAvailability  } = useAvailabilityService();

    //Dialog for entering date time of the shift ...
    const [currentDaySelected, setCurrentDaySelected] = useState(null);



    // const saveAvailabilityUpdates = async (editedBarberAvailability) => {
    //     //To save the template update we have to make network request for each template
    //     //lets just make network request 

    //     //Close the drawer
    //     setHorizontalOpen(false);
    //     setLoading(true);

    //     const response = await updateBarberAvailability(editedBarberAvailability);

    //     //one we will show error in case there is error


    //     //if error show the error otherwise reload data ... show loading bar
    //     if(response.status === -1) {
    //         //something went wrong ...
    //               //something went wrong ...
    //         setServerError(true);
    //         setServerErrorMessage(response.message);
    //     }
    //     else {
    //         // fetchBarbers();
    //     }

    //     setLoading(false);

    // }

    // const onDialogOk = () => {

    //     setIsOpen(false)
    //     const selectedStartTime = moment(startTime, 'HH:mm');
    //     const selectedEndTime = moment(endTime, 'HH:mm');

    //     if(currentDaySelected) {

    //         //first we check if we already have atleast 1 value in template?
    //         //if yes we do following
    //         const hasSelectedDay = editBarber?.barberAvailability?.find(item => {
    //             if(item?.barberAvailabilitiesTemplate?.dayOfWeek == currentDaySelected)
    //                 return true;

    //             return false;
    //         });

    //         if(hasSelectedDay) {
    //             addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime);
    //         }
    //         else {
    //             //but add empty array to fill for the day ...
    //             addEmptyDayOfWeek(currentDaySelected);
    //             //then and this 
    //             addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime);
    //         }
         
    //     }
    //     else {
    //         //technically there should be error dialog
    //         console.log("There should have been selected day");
    //     }

    //     setStartTime(null);
    //     setEndTime(null);
    // }

    // function addEmptyDayOfWeek(theDay) {
      
    //     editBarber?.barberAvailability?.push(
    //         {
    //             barberAvailabilitiesTemplate: {
    //                 dayOfWeek: theDay,
    //                 timeSlots : []
    //             }
    //         }
    //     );
    // }

    // function addStartTimeAndEndTimeToEditBarber(selectedStartTime, selectedEndTime) {

    //     const startTimeObject = {
    //         hour: selectedStartTime.hour(),
    //         minute: selectedStartTime.minute()
    //     }

    //     const endTimeObject = {
    //         hour: selectedEndTime.hour(),
    //         minute: selectedEndTime.minute()
    //     }

    //     for (const barberAvailability of editBarber?.barberAvailability) {
      
    //         if(barberAvailability?.barberAvailabilitiesTemplate?.dayOfWeek == currentDaySelected) {
    //             barberAvailability?.barberAvailabilitiesTemplate?.timeSlots.push({
    //                 attendanceStatus: "TO_BE_MARKED",
    //                 slotName: currentDaySelected,
    //                 startTime: startTimeObject,
    //                 endTime: endTimeObject
    //             });
    //         }
    //     }
    // }


    // const handleCancel = () => {
    // };


    // //Bottom Drawer for editing
    // const [horizontalOpen, setHorizontalOpen] = useState(false)
    // const onHorizontalOpen = (barberWeClickedOn) => {
    //     setHorizontalOpen(true)
    //     setEditBarber(barberWeClickedOn);
    //     console.log(editBarber);
    // }

    // const onDrawerClose = () => {
    //     setHorizontalOpen(false)
    // }

    // const handleAddItem = (day) => {
    //     setCurrentDaySelected(day);
    //     openDialog();
    // };

    // const handleDeleteShift = (shift) => {

    // }

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

    // function getDaysJoinedListFromDaysList(timeSlots) {
    //     if (!timeSlots || timeSlots.length === 0) {
    //         return "N/A";
    //     } else {
    //         // This assumes that your data rendering is simple text, modify if needed
    //         return <>
    //          <ul className="timeSlotList">
    //             {timeSlots.map((slot, index) => (
    //                 <li key={index} className="timeSlotListItem rounded">
    //                     {`${slot.startTime.hour}:${slot.startTime.minute.toString().padStart(2, '0')} to ${slot.endTime.hour}:${slot.endTime.minute.toString().padStart(2, '0')}`}
    //                 </li>
    //             ))}
    //         </ul>
    //         </>; 
    //     }
    // }

    // function getDaysJoinedListFromDaysListWithButton(timeSlots, dayName) {

    //     if (!timeSlots || timeSlots.length === 0) {
    //         return <>
    //                     <Button size="xs" onClick={() => handleAddItem(dayName)}>
    //                         <FaPlusCircle /> 
    //                     </Button>
    //         </>;
    //     } else {
    //         // This assumes that your data rendering is simple text, modify if needed
    //         return <>

    //           <ul className="timeSlotList">
    //             {timeSlots.map((slot, index) => (
    //                 <li key={index} className="timeSlotListItem" style={{fontSize:'13px'}}>
    //                     {`${slot.startTime.hour}:${slot.startTime.minute.toString().padStart(2, '0')} to ${slot.endTime.hour}:${slot.endTime.minute.toString().padStart(2, '0')}`}
    //                 </li>
    //             ))}

    //             <li key="button" className="timeSlotListItemrounded">
    //                 <Button size="xs" onClick={() => handleAddItem(dayName)}>
    //                     <FaPlusCircle /> 
    //                 </Button> 
    //             </li> 
    //         </ul>
            
    //         </>
    //         ; 
    //     }
    // }


    // function findTimeSlotsByDay(data, dayOfWeek) {
    //     // Find the object with matching dayOfWeek
    //     const matchingTemplate = data.find(item =>
    //         item.barberAvailabilitiesTemplate.dayOfWeek === dayOfWeek
    //     );
    
    //     // If a matching object is found, return its timeSlots, otherwise return an empty array
    //     return matchingTemplate ? matchingTemplate.barberAvailabilitiesTemplate.timeSlots : [];
    // }




    //Methods to load all the barber  .... for availability page view .... 
    const [loading, setLoading] = useState(false);
    let [editBarber, setEditBarber] = useState([]); 


    // const fetchBarbers = async () => {
    //     setLoading(true);
    //     const barbersWithAvailability = await getBarbersWithAvailability();
    //     setBarbers(barbersWithAvailability);
    //     //We need copy for the edit view because we will allow that to be modified ...
    //     // setEditableListBarbers(barbersWithAvailability);
    //     setLoading(false);
    //     setTableData((prevData) => ({
    //         ...prevData,
    //         ...{ total: barbersWithAvailability.total },
    //     }))
    // };

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
            </Loading>

            <AvailabilityGrid />



        </div>
    )
}

export default UpdatedAvailabilityView
