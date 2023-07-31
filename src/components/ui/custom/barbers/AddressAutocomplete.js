import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useFormikContext } from 'formik';

const AddressAutocomplete = ({ setBusinessName, setGoogleAddress, setWebsite, setPlaceId, setOpeningHours }) => {
  const [value, setValue] = React.useState('');

  const options = {
    componentRestrictions: {
      country: "AU",
    },
    types: ['establishment'],
    fields: ['name', 'formatted_address',  'formatted_phone_number', 'website', 'opening_hours',  'place_id']
  };

  return (
    <Autocomplete
      className='input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      // onChange={setValue}
      options={options}
      onPlaceSelected={(place) => {
        console.log(place);
        setBusinessName(place.name);
        setGoogleAddress(place.formatted_address);
        setWebsite(place.website)
        setPlaceId(place.place_id)
        setOpeningHours(place.opening_hours)
      }}
    />
  );
};

export default AddressAutocomplete;