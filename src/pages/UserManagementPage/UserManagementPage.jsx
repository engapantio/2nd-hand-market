import Breadcrumbs from '../../components/widgets/Breadcrumbs/Breadcrumbs.jsx';
import UserManagementForm from '../../components/UserManagementForm/UserManagementForm.jsx';
import { useUserManagementForm } from '../../hooks/useUserManagementForm.js';
import styles from './userManagement.module.css';

const UserManagementPage = () => {
  const form = useUserManagementForm();

  const breadcrumbs = [
    { label: 'User Management', to: '/user-management' },
    { label: 'List of Bringing Customers' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbsWrap}>
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className={styles.card}>
        <h1 className={styles.title}>Add New User</h1>
        <UserManagementForm {...form} />
      </section>
    </div>
  );
};

export default UserManagementPage;
