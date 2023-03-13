import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";

type Props = {
  setMapCenter: (position: google.maps.LatLngLiteral) => void;
};

const Places = ({ setMapCenter }: Props) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handelSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const result = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(result[0]);

    setMapCenter({ lat, lng });
  };

  useEffect(() => {
    setValue("");
  }, []);

  return (
    <Autocomplete
      autoComplete
      value={data.find((x) => x.description === value) || null}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add a location"
          fullWidth
          disabled={!ready}
        />
      )}
      options={data}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      noOptionsText="No locations"
      filterOptions={(x) => x}
      includeInputInList
      filterSelectedOptions
      isOptionEqualToValue={(option: any, value: any) =>
        option.description === value.description
      }
      onChange={(event: any, newValue: any) => {
        handelSelect(newValue.description);
      }}
    />
  );
};
export default Places;
