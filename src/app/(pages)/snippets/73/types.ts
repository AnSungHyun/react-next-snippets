export type Product = {
  id: string;
  name: string;
};

export type Seller = {
  id: string;
  name: string;
  products: Product[];
};

export type CheckedMap = {
  [sellerId: string]: {
    [productId: string]: boolean;
  };
};