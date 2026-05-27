import { useGetProductsQuery } from '../../../api/dummyApi';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const AdminProductsPage = () => {
  const { data, isLoading, isError } = useGetProductsQuery({
    limit: 20,
    skip: 0,
    select: 'id,title,price,category,stock,thumbnail',
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Failed to load admin products." />;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Admin – Products</h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '1rem',
          backgroundColor: '#fff',
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>ID</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Title</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Category</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Stock</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: 8 }}>{product.id}</td>
              <td style={{ padding: 8 }}>{product.title}</td>
              <td style={{ padding: 8 }}>{product.category}</td>
              <td style={{ padding: 8 }}>{product.stock}</td>
              <td style={{ padding: 8 }}>€{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default AdminProductsPage;
