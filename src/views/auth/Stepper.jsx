import React, { useState } from 'react';

const steps = [
  { label: "1", description: "Account Information" },
  { label: "2", description: "Business Type" },
  { label: "3", description: "Business Details" },
  // Add more steps here...
];

const Stepper = ({ currentStep }) =>  {

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: '20px' }}>
        {steps.map((step, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: currentStep >= index ? 'blue' : '#ccc',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              {(currentStep) > index ? '✓' : step.label}
            </div>
            {index < steps.length - 1 && (
                <div
                    style={{
                        flex: 1,
                        width: '200px',
                        borderBottom: '2px solid',
                        borderBottomColor: index < currentStep  ? 'blue' : '#e0e0e0',
                        margin: '0 1px'
                    }}
                >  </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px', display: "flex", alignContent:'centre'}}>
        <h3>{steps[currentStep].description.toUpperCase()}</h3>
      </div>

    </div>
  );
}


export default Stepper;
