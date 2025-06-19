type Props = {
  message: string;
};

const EventNotice = ({ message }: Props) => {
  return (
    <div style={{ background: '#f9f9f9', padding: '1rem' }}>{message}</div>
  );
};

export default EventNotice;
