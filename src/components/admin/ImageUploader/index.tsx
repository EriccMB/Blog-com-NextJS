'use client';

import { uploadImageAction } from '@/actions/post/post/upload-image-action';
import { toastifyAdapter } from '@/adapters/toastifyAdapter';
import Button from '@/components/Button';
import { IMAGE_UPLOADER_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useTransition } from 'react';

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    // TODO CONSERTAR dismiss
    // toastifyAdapter.dismiss;
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef?.current;
    const file = fileInput.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      toastifyAdapter.error(
        `Imagem muito grande. Tamanho máximo: ${IMAGE_UPLOADER_MAX_SIZE / 1024} kb`,
      );

      fileInput.value = '';

      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toastifyAdapter.error(result.error);
        fileInput.value = '';
        return;
      }

      toastifyAdapter.success(result.url);
    });

    fileInput.value = '';
  }
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        className="self-start flex gap-2"
        onClick={handleChooseFile}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      <input
        onChange={handleChange}
        className="hidden"
        type="file"
        name="file"
        // accept="image/*"
        ref={fileInputRef}
      />
    </div>
  );
}
