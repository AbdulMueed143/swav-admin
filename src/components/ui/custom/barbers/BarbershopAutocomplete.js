import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useFormikContext } from 'formik';

const BarberShopAutocomplete = ({ setName, setWebsite }) => {
  const [value, setValue] = React.useState('');

  const options = {
    componentRestrictions: {
      country: "AU",
    },
    types: ["establishment"],
    fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'opening_hours', 'place_id']
  };

  return (
    <Autocomplete
      className='input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
      apiKey="AIzaSyB80I3jK3Bb3PiUOr1KGEEmxx5UyiUm8do"
      onChange={setValue}
      options={options}
      onPlaceSelected={(place) => {
        console.log(place);
        setName(place.name);
        setWebsite(place.website);
      }}
    />
  );
};

export default BarberShopAutocomplete;