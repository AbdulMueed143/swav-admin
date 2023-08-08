import React, { useState } from 'react';
import {
    Accordion,
    Box,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Card,
  } from "@material-ui/core";

  import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ExpandMore } from '@material-ui/icons';
import AvailableTimes from './Availabletimes';
import ButtonWithIcon from 'components/ui/custom/barbers/ButtonWithIcon';
import Table from 'components/ui/Table'




import dayjs from 'dayjs';
import { Button,  IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { DatePicker } from 'components/ui';


  const useStyles = makeStyles((theme) =>
    createStyles({
      accordion: {
        margin: theme.spacing(3),
        width: theme.spacing(100),
      },
    })
  );

  const { Tr, Th, Td, THead, TBody } = Table



const CustomAccordion = () => {

  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const daysOfWeek = {'Holidays' : ['2nd August', '11th Sept'], 'Monday, 7th Aug' : ['8:30AM - 11:00 AM', 'Break', '12:00 AM - 5:00PM'], 'Tuesday, 8th Aug' : ['8:30AM - 11:00 AM'], 'Wednesday' : ['8:30AM - 11:00 AM'], 'Thursday' : ['8:30AM - 11:00 AM'], 'Friday' : ['8:30AM - 11:00 AM'], 'Saturday' : ['8:30AM - 11:00 AM'], 'Sunday' : ['Not Working']};

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setHolidays([...holidays, date]);
    setDatePickerOpen(false);
  };

  const classes = useStyles();

  const maxRows = Math.max(...Object.values(daysOfWeek).map(times => times.length));


  return (
    <div  >
       <Box className={classes.accordion} style={{width: '80%'}}>
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> <b>Abdul Mueed</b>(View and Update Barber Schedule)</Typography>
        </AccordionSummary>

        <AccordionDetails>

        <div className="grid grid-flow-row auto-rows-max gap-4 bg-zinc-50" >
            <div style={{ right: 20, position: 'absolute' }}>
                <IconButton >
                    <EditIcon />
                </IconButton>
            </div>

            <div className="shadow-lg" style={{ marginTop: '60px' }}>
              <div className="grid grid-rows-2 grid-flow-col gap-4">
                  <div className="row-span-2 col-span-4  grid place-content-center">
                      <Table>
                          <THead>
                              <Tr>
                                  {Object.keys(daysOfWeek).map(day => (
                                      <Th key={day} style={{ fontSize: '12px' }}>{day}</Th>
                                  ))}
                              </Tr>
                          </THead>
                          <TBody>
                              {/* Create a row for each time range */}
                              {Array.from({ length: maxRows }).map((_, rowIndex) => (
                                  <Tr key={rowIndex}>
                                      {Object.keys(daysOfWeek).map(day => (
                                          <Td key={day} style={{ fontSize: '11px' }}>
                                              {/* If the current day has a time range for this row, display it */}
                                              {daysOfWeek[day][rowIndex] || ''}
                                          </Td>
                                      ))}
                                  </Tr>
                              ))}
                          </TBody>
                      </Table>
                  </div>
              </div>
            </div>

          </div>
        </AccordionDetails>
      </Accordion>
      </Box> 
    </div>
  );
};

export default CustomAccordion;
