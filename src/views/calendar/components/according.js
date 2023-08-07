import React, { useState } from 'react';
import {
    Accordion,
    Box,
    AccordionSummary,
    AccordionDetails,
    Typography,
  } from "@material-ui/core";

  import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ExpandMore } from '@material-ui/icons';

  const useStyles = makeStyles((theme) =>
    createStyles({
      accordion: {
        margin: theme.spacing(3),
        width: theme.spacing(100),
      },
    })
  );

const CustomAccordion = () => {

  const classes = useStyles();

  return (
    <div>
       <Box className={classes.accordion}>
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Barber 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box> 
    </div>
  );
};

export default CustomAccordion;
