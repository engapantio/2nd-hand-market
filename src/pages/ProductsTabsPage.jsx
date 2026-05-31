// src/pages/ProductsTabsPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setActiveProductsTab } from '../features/ui/uiSlice';
import { selectReserved, selectPurchased } from '../features/products/productsSlice';
import TabsNav from '../components/layout/TabsNav';
import ReservedList from '../components/products/ReservedList';
import PurchasedList from '../components/products/PurchasedList';
import styles from '../styles/tabs.module.css';

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
        {activeTab === 'reserved' ? (
          <ReservedList items={reserved} />
        ) : (
          <PurchasedList items={purchased} />
        )}
      </div>
    </section>
  );
};

export default ProductsTabsPage;
