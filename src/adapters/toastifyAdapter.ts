import { toast } from 'react-toastify';

export const toastifyAdapter = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
};
