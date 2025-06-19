type Props = {
  imageUrl: string;
};

const BannerBlock = ({ imageUrl }: Props) => {
  return <img src={imageUrl} alt="Banner" style={{ width: '100%' }} />;
};

export default BannerBlock;
