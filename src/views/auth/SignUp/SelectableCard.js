import React, { useState } from 'react';

const SelectableCard = ({ title, description, selected, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: selected ? '#f0f0f0' : '#fff',
                marginBottom:'8px',
                flex: 1
            }}
        >
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default SelectableCard;