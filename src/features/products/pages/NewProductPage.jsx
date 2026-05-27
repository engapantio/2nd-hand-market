import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../../../api/dummyApi';

const NewProductPage = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [form, setForm] = useState({
    title: '',
    price: 0,
    category: '',
    brand: '',
    stock: 0,
    thumbnail: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addProduct(form).unwrap();
      navigate('/admin/products');
    } catch (err) {
      console.error('Add product failed', err);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Price
          <input name="price" type="number" value={form.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} />
        </label>
        <br />
        <label>
          Brand
          <input name="brand" value={form.brand} onChange={handleChange} />
        </label>
        <br />
        <label>
          Stock
          <input name="stock" type="number" value={form.stock} onChange={handleChange} />
        </label>
        <br />
        <label>
          Thumbnail URL
          <input name="thumbnail" value={form.thumbnail} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving…' : 'Save product'}
        </button>
      </form>
    </main>
  );
};

export default NewProductPage;
