import React, { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
function LanguageSwitcher() {
  const [lan, setLan] = useState("en");
  const { i18n } = useTranslation();
  
  const changeLanguage = (event) => {
    setLan(event.target.value);
  };
  useEffect(() => {
    i18n.changeLanguage(lan);
  }, [lan]);
  return (
    <Box sx={{ minWidth: 120,  border: "none"}}>
      <FormControl fullWidth sx={{ border: "none" }}>
        <InputLabel id="demo-simple-select-label" variant="standard"/>
        <Select
      sx={{border: "none"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lan}
          onChange={changeLanguage}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="am">Amharic</MenuItem>
          <MenuItem value="ti">Tigrinya</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default LanguageSwitcher;
