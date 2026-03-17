'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidateExampleAction(formData: FormData) {
  const path = formData.get('path') || '';
  console.log('server actions chamada', path);

  // revalidatePath(`${path}`);
  revalidateTag('posts');
  revalidateTag('post-rotina-matinal-de-pessoas-altamente-eficazes');
}
