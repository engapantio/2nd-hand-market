import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  initialDraft,
  resetDraft,
  setDraftField,
  submitFailure,
  submitStart,
  submitSuccess,
} from '../features/userManagement/userManagementSlice.js';
import { userManagementSchema } from '../schemas/userManagementSchema';
import { useAddUserMutation } from '../api/dummyApi';

const formatClientCode = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1-');
};

export const SALUTATIONS = ['Mr.', 'Mrs.', 'Ms.', 'Dr.'];
export const COUNTRIES = ['Germany', 'Austria', 'France', 'Italy'];
export const PAYPAL_OPTIONS = ['Paypal account', 'Private Paypal', 'Business Paypal'];

export const useUserManagementForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const draft = useAppSelector((s) => s.userManagement.draft);
  const isSubmitting = useAppSelector((s) => s.userManagement.isSubmitting);
  const [addUser] = useAddUserMutation();

  const form = useForm({
    resolver: zodResolver(userManagementSchema),
    defaultValues: draft,
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const bindDraftField = (name) => {
    const base = register(name);
    return {
      ...base,
      onChange: (e) => {
        base.onChange(e);
        dispatch(setDraftField({ key: name, value: e.target.value }));
      },
    };
  };

  const handleClientChange = (field) => (e) => {
    const formatted = formatClientCode(e.target.value);
    field.onChange(formatted);
    dispatch(setDraftField({ key: 'client', value: formatted }));
  };

  const onSubmit = handleSubmit(async (values) => {
    dispatch(submitStart());
    try {
      const result = await addUser(values).unwrap();
      dispatch(submitSuccess(result));
      navigate('/user-management');
    } catch (_e) {
      dispatch(submitFailure());
    }
  });

  const handleCancel = () => {
    dispatch(resetDraft());
    navigate('/maintenance');
  };

  const handleDelete = () => {
    dispatch(resetDraft());
    reset(initialDraft);
  };

  return {
    control,
    errors,
    isSubmitting,
    bindDraftField,
    handleClientChange,
    onSubmit,
    handleCancel,
    handleDelete,
  };
};
