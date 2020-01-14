import React from "react";
import { Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

/* const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
}; */

const PlacesAutoComplete = props => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Enter destination"
      minLength={3} // minimum length of text to search
      //autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        //console.tron.log(data, details);
        const geometry = details.geometry.location;
        const formatted_address = details.formatted_address;
        const description = data.description;
        console.tron.log(
          "geometry",
          geometry,
          "formatted_address",
          formatted_address,
          "data",
          data
        );
        props.onChange({ geometry, formatted_address, description });
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ",
        language: "en", // language of the results
        //types: "(cities)" // default: 'geocode'
        types: "establishment"
      }}
      /*     styles={{
        textInputContainer: {
          width: "100%"
        },
        description: {
          fontWeight: "bold"
        },
        predefinedPlacesDescription: {
          color: "#1faadb"
        }
      }} */
      //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      //currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        type: "cafe"
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: "formatted_address,geometry"
      }} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities //predefinedPlaces={[homePlace, workPlace]}
      /* filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3"
      ]}  */ debounce={
        200
      } // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      /*  renderLeftButton={() => (
        <Image source={require("path/custom/left-icon")} />
      )} */
      /* renderRightButton={() => <Text>Custom text after the input</Text>} */
    />
  );
};

export default PlacesAutoComplete;
