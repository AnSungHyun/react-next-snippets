import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const MasterCheckbox: React.FC<Props> = ({ checked, onChange }) => (
  <FormControlLabel
    label="전체 선택"
    control={
      <Checkbox
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
    }
  />
);

export default MasterCheckbox;