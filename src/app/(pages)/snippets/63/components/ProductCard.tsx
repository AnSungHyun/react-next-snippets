type Props = {
  title: string;
  price: number;
};

const ProductCard = ({ title, price }: Props) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>{title}</h3>
      <p>{price.toLocaleString()}원</p>
    </div>
  );
};

export default ProductCard;
