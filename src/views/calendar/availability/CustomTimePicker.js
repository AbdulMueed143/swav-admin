import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function CustomTimePicker({ value, onChange, labelText }) {
    const handleChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue);
    };
    return (
        <Grid>
            <Grid item>
                <TextField
                    label={labelText}
                    type="time"
                    value={value}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            minWidth: '150px',
                            fontWeight: 600,
                            textAlign: 'left'
                        }
                    }}
                    inputProps={{
                        step: 300, // 5-minute intervals
                    }}
                    style={{
                        width: '100%',
                        // border: '1px solid #ccc'
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default CustomTimePicker;