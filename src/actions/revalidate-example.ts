'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateExampleAction(formData: FormData) {
  const path = formData.get('path') || '';
  console.log('server actions chamada', path);

  // revalidatePath(`${path}`);
  revalidateTag('posts'); // home
  revalidateTag('post-rotina-matinal-de-pessoas-altamente-eficazes'); // um post apenas
}
