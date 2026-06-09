// src/pages/ProductsTabsPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { setActiveProductsTab } from '../../features/ui/uiSlice';
import { selectReserved, selectPurchased } from '../../features/products/productsSlice';
import TabsNav from '../../components/productsTabs/TabsNav/TabsNav.jsx';
import Tab from '../../components/productsTabs/Tab/Tab.jsx';
import styles from './productsTabs.module.css';

const ProductsTabsPage = ({ tab }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeTab = useAppSelector((s) => s.ui.activeProductsTab);
  const reserved = useAppSelector(selectReserved);
  const purchased = useAppSelector(selectPurchased);

  useEffect(() => {
    dispatch(setActiveProductsTab(tab));
  }, [tab, dispatch]);

  const handleTabChange = (nextTab) => {
    dispatch(setActiveProductsTab(nextTab));
    navigate(nextTab === 'reserved' ? '/reserved' : '/purchased');
  };

  return (
    <section className={styles.page}>
      <TabsNav
        active={activeTab}
        onChange={handleTabChange}
        labels={{ reserved: 'Reserved', purchased: 'Purchased' }}
      />

      <div className={styles.listArea}>
        <Tab
          items={activeTab === 'reserved' ? reserved : purchased}
          variant={activeTab === 'reserved' ? 'reserved' : 'purchased'}
        />
      </div>
    </section>
  );
};

export default ProductsTabsPage;
