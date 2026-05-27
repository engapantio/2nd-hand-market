import { useGetProductsQuery } from '../../../api/dummyApi';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const ProductsPage = () => {
  const { data, isLoading, isError } = useGetProductsQuery({
    limit: 12,
    skip: 0,
    select: 'id,title,price,thumbnail,category',
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Failed to load products." />;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Products</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {data?.products?.map((product) => (
          <article
            key={product.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: '100%', borderRadius: 8 }}
            />
            <h2 style={{ fontSize: 16, marginTop: 8 }}>{product.title}</h2>
            <p style={{ marginTop: 4 }}>{product.category}</p>
            <p style={{ marginTop: 4, fontWeight: 600 }}>€{product.price}</p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
