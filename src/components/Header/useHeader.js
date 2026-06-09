// src/components/layout/header/useHeader.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { openLogin, setActiveProductsTab, setSearchQuery } from '../../features/ui/uiSlice.js';
import { selectReservedCount, selectPurchasedCount } from '../../features/products/productsSlice';
import { useLogoutUserMutation } from '../../api/dummyApi.js';
import { logout, selectCurrentUser } from '../../features/auth/authSlice.js';
import { clearRows } from '../../features/maintenance/maintenanceSlice.js';
import useDebounce from '../../hooks/useDebounce';
import toast from 'react-hot-toast';

const useHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const reservedCount = useAppSelector(selectReservedCount);
  const purchasedCount = useAppSelector(selectPurchasedCount);
  const user = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector((s) => !!s.auth.user);
  const [logoutUser] = useLogoutUserMutation();

  const [inputValue, setInputValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const debouncedSearch = useDebounce(inputValue, 500);

  // Sync debounced search value to Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  // Close drawer on viewport resize
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleHeartClick = () => {
    dispatch(setActiveProductsTab('reserved'));
    navigate('/reserved');
    closeMenu();
  };

  const handleBasketClick = () => {
    dispatch(setActiveProductsTab('purchased'));
    navigate('/purchased');
    closeMenu();
  };

  const handleCheckout = async () => {
    if (user) {
      try {
        await logoutUser(user.id).unwrap();
        toast('Admin logged out successfully');
      } catch (e) {
        toast(`There was an issue: ${e} but the logout is successful`);
      }
    }
    dispatch(clearRows());
    dispatch(logout());
    navigate('/', { replace: true });
    closeMenu();
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/maintenance');
    } else {
      dispatch(openLogin());
    }
    closeMenu();
  };

  const handleNavClick = (path) => {
    navigate(path);
    closeMenu();
  };

  return {
    // state
    inputValue,
    setInputValue,
    menuOpen,
    setMenuOpen,
    searchOpen,
    setSearchOpen,
    reservedCount,
    purchasedCount,
    isLoggedIn,
    // handlers
    handleHeartClick,
    handleBasketClick,
    handleCheckout,
    handleUserClick,
    handleNavClick,
    closeMenu,
  };
};

export default useHeader;
