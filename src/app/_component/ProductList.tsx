// components/ProductList.tsx
'use client';

import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating, Button,
} from '@mui/material';
import { Product, ProductAddRequest, ProductListProps } from '../_api/GetProduct';
// import { Product, ProductListProps } from '../types/product';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import _ from 'lodash';

export interface ProductCardProps {
  product: Product;
  onDelete?: (product: ProductAddRequest) => void;
}

// const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
const ProductCard = React.memo(({ product, onDelete }: ProductCardProps) => {
  const router = useRouter();

  console.log(`ProductCard rendering: ${product.id}`);
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Image
          src={product.thumbnail}
          width={200}
          height={200}
          alt="Picture of the author"
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography>상품 id : {product.id}</Typography>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({product.rating})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h6" color="primary">
              ${discountedPrice.toLocaleString()}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${product.price.toLocaleString()}
              </Typography>
            )}
          </Box>
          <Chip
            label={product.availabilityStatus}
            color={product.stock > 10 ? 'success' : 'warning'}
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          {product.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>
      </CardContent>
      {onDelete && (
        <Button
          variant="contained"
          onClick={() => {
            // const { id, ...rest } = product;
            // const deleteParam: ProductAddRequest = {
            //   id: id,
            //   title: rest.title,
            //   description: rest.description,
            //   price: rest.price,
            //   discountPercentage: 0,
            //   rating: 0,
            //   availabilityStatus: "",
            // }
            const deleteParam: ProductAddRequest = _.pick(product, [
              'id',
              'title',
              'description',
              'price',
              'discountPercentage',
              'rating',
              'availabilityStatus',
            ]) as ProductAddRequest;
            onDelete(deleteParam)
            }
          }
          sx={{ mb: 2 }} // 마진 bottom 추가
        >
          상품삭제
        </Button>
      )}

      <Button
        variant="contained"
        onClick={() => router.push('/snippets/1')}
        sx={{ mb: 2 }} // 마진 bottom 추가
      >
        페이지 이동(history back test)
      </Button>
      {/*<Link href={'/snippets/1'} >링크</Link>*/}
    </Card>
  );
});
// };

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id}  sx={{ width: '100%' }}>
          <ProductCard product={product} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;