import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../api/dummyApi';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(productId);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Failed to load product." />;
  if (!data) return null;

  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <h1>{data.title}</h1>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <img src={data.thumbnail} alt={data.title} style={{ width: 320, borderRadius: 12 }} />
        <div>
          <p>{data.description}</p>
          <p style={{ marginTop: 8 }}>Category: {data.category}</p>
          <p style={{ marginTop: 8 }}>Brand: {data.brand}</p>
          <p style={{ marginTop: 8, fontWeight: 600 }}>€{data.price}</p>
        </div>
      </div>
    </main>
  );
};
export default ProductDetailsPage;
