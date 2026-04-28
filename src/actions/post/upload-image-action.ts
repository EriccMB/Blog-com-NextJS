'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  const uploaderMaxSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

  if (file.size > uploaderMaxSize) {
    const readbleMaxSize = (uploaderMaxSize / 1024).toFixed(2);
    return makeResult({
      error: ` Arquivo muito grande. Max: ${readbleMaxSize}KB`,
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  // CRIA A PASTA uploads CASO NÃO EXISTIR
  const uploadedImgDir = process.env.IMAGE_UPLOADED_DIR || 'uploads';
  const uploadFolderPath = resolve(process.cwd(), 'public', uploadedImgDir);

  await mkdir(uploadFolderPath, { recursive: true });

  // SALVAR NA PASTA UPLOADS SÓ FUNCIONA EM DEV, PARA ISSO FUNCIONAR EM PRODUÇÃO,
  // O SERVIDOR TERIA QUE REINICIAR, PORQUE O CACHE NÃO VAI ATUALIZAR

  // PEGA OS BYTES DO ARQUIVO PARA O NODE ENTENDER
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFolderPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const imageServerURL =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
  const url = `${imageServerURL}/${uniqueImageName}`;

  return makeResult({ url });
}
