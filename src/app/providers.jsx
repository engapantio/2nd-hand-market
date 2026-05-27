import { Provider } from 'react-redux';
import { store } from './store.js';

const AppProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProviders;
