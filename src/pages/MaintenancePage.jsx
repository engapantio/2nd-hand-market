// src/pages/MaintenancePage.jsx
import { useState } from 'react';
import { useLazyGetProductByIdQuery } from '../api/dummyApi.js';
import MaintenanceTable from '../components/maintenance/MaintenanceTable';
import Header from '../components/layout/Header.jsx';

const MaintenancePage = () => {
  const [rows, setRows] = useState([]);
  const [trigger] = useLazyGetProductByIdQuery();

  const handleAddItem = async () => {
    const randomId = Math.floor(Math.random() * 100) + 1;
    const product = await trigger(randomId).unwrap();
    setRows((prev) => [...prev, product]);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Maintain Items</h1>
        <button type="button" onClick={handleAddItem}>
          Add an item
        </button>
      </div>
      <MaintenanceTable rows={rows} />
    </div>
  );
};

export default MaintenancePage;
