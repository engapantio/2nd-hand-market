const ErrorMessage = ({ message = 'Something went wrong.' }) => {
  return <div style={{ padding: '2rem', color: 'red' }}>{message}</div>;
};

export default ErrorMessage;
