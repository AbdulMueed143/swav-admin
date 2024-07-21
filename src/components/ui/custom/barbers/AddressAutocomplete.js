import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { useFormikContext } from 'formik';

const AddressAutocomplete = ({ currentAddress, setBusinessName, setGoogleAddress, setWebsite, 
  setPlaceId, setOpeningHours, setPhoneNumber, setPostCode,setState, setCity, setCountry, setLat, setLng }) => {
  const [value, setValue] = React.useState('');

  let streetNumber = '';
  let route = '';
  let city = '';
  let state = '';
  let country = '';
  let postalCode = '';

  const options = {
    componentRestrictions: {
      country: "AU",
    },
    types: ['establishment'],
    fields: ['name', 'formatted_address', 'address_components', 'formatted_phone_number', 'website', 'opening_hours',  'place_id', 'geometry']
  };

  return (
    <Autocomplete
      className='input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      // onChange={setValue}
      options={options}
      onPlaceSelected={(place) => {
        setBusinessName(place.name);
        setGoogleAddress(place.formatted_address);
        setWebsite(place.website);
        setPlaceId(place.place_id);
        setOpeningHours(place.opening_hours);
        setPhoneNumber(place.formatted_phone_number);
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());

        place.address_components.forEach(component => {
            if (component.types.includes("street_number")) {
                streetNumber = component.long_name;
            } else if (component.types.includes("route")) {
                route = component.long_name;
            } else if (component.types.includes("locality")) {
                setCity(component.long_name);
            } else if (component.types.includes("administrative_area_level_1")) {
                setState(component.short_name);
            } else if (component.types.includes("country")) {
                setCountry(component.long_name);
            } else if (component.types.includes("postal_code")) {
                setPostCode(component.long_name);
            }
        });

      }}
    />
  );
};

export default AddressAutocomplete;