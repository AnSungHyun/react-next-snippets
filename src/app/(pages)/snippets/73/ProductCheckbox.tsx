import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Product } from "./types";

interface Props {
  checked: boolean;
  product: Product;
  onChange: (checked: boolean) => void;
}

const ProductCheckbox: React.FC<Props> = ({ checked, product, onChange }) => (
  <FormControlLabel
    label={product.name}
    control={
      <Checkbox
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
    }
    style={{ display: "block" }}
  />
);

export default ProductCheckbox;