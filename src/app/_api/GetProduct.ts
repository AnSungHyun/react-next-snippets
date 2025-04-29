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
  tags?: string[];
  brand: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
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

export interface ProductListProps {
  products: Product[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// API 파라미터 타입 정의
export interface ProductParams {
  limit?: number;
  delay?: number;
  skip?: number;
  search?: string;
  category?: string;
  sort?: 'asc' | 'desc';
  // 필요한 다른 파라미터들 추가
}

export interface ProductAddRequest {
  title: string;    // 필수
  description: string;    // 필수
  price: number;    // 필수
  category?: string;   // 선택
  brand?: string;    // 선택
  stock?: number;    // 선택
  thumbnail?: string;  // 선택
  images?: string[];   // 선택
}


// 상품 조회
export const getProductsApi = (): Promise<ProductResponse> => {
  return commonAxios.get({url: '/products?limit=3&delay=1000',})
}

// 상품 조회
export const getErrorProductsApi = (): Promise<ProductResponse> => {
  return commonAxios.get({url: '/error/products?limit=3&delay=1000',})
}

// 상품 조회 with param
export const getProductsApiWithParam = (params?: ProductParams): Promise<ProductResponse> => {
  return commonAxios.get({ url: '/products', params: params });
}

// 상품 추가
export const postProductsApi = (data: ProductAddRequest): Promise<ProductResponse> => {
  return commonAxios.post({url: '/products/add', data: data});
}