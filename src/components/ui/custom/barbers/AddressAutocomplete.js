import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useFormikContext } from 'formik';

const AddressAutocomplete = ({ setName, setAddress }) => {
  const [value, setValue] = React.useState('');

  const options = {
    componentRestrictions: {
      country: "AU",
    },
    types: ["street_address"],
    fields: ['name', 'formatted_address',  'place_id']
  };

  return (
    <Autocomplete
      className='input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
      apiKey="AIzaSyB01eSc8cHSkUO3H1HXBiaeGWE8qBJcjoI"
      onChange={setValue}
      options={options}
      onPlaceSelected={(place) => {
        console.log(place);
        setName(place.name);
        setAddress(place.formatted_address);
      }}
    />
  );
};

export default AddressAutocomplete;