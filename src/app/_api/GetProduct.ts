import commonAxios from "@/app/_config/axios/commonAxios";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string; // ISO 8601 format
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  barcode: string;
  qrCode: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProductsApi = (): Promise<ProductResponse> => {
  return commonAxios.get({url: '/test/products?limit=3&delay=1000',})
}
