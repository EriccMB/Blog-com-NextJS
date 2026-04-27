'use server';

import { asyncDelay } from '@/utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(
  state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  await asyncDelay(2000);
  const username = formData.get('username')?.toString() || '';
  return {
    username,
    error: '',
  };
}
