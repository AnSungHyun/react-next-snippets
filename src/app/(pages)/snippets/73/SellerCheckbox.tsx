import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Seller, CheckedMap } from "./types";
import ProductCheckbox from "./ProductCheckbox";

interface Props {
  seller: Seller;
  checked: boolean;
  onChange: (checked: boolean) => void;
  checkedMap: CheckedMap;
  onProductChange: (productId: string, checked: boolean) => void;
}

const SellerCheckbox: React.FC<Props> = ({
                                           seller,
                                           checked,
                                           onChange,
                                           checkedMap,
                                           onProductChange,
                                         }) => (
  <div style={{ marginLeft: 16 }}>
    <FormControlLabel
      label={seller.name}
      control={
        <Checkbox
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
      }
    />
    <div style={{ marginLeft: 24 }}>
      {seller.products.map(product => (
        <ProductCheckbox
          key={product.id}
          checked={checkedMap[seller.id][product.id]}
          product={product}
          onChange={checked => onProductChange(product.id, checked)}
        />
      ))}
    </div>
  </div>
);

export default SellerCheckbox;