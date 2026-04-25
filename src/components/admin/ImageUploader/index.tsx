'use client';

import { uploadImageAction } from '@/actions/post/upload-image-action';
import { toastifyAdapter } from '@/adapters/toastifyAdapter';
import Button from '@/components/Button';
import { IMAGE_UPLOADER_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState<string>('');

  function handleChooseFile() {
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    fileInputRef.current.click();
  }

  function handleChange() {
    // TODO CONSERTAR dismiss
    // toastifyAdapter.dismiss;
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef?.current;
    const file = fileInput.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
      toastifyAdapter.error(
        `Imagem muito grande. Tamanho máximo: ${IMAGE_UPLOADER_MAX_SIZE / 1024} kb`,
      );
      fileInput.value = '';
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toastifyAdapter.error(result.error);
        fileInput.value = '';
        setImgUrl('');
        return;
      }

      toastifyAdapter.success('Imagem enviada');

      setImgUrl(result.url);
    });

    fileInput.value = '';
  }
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        className="self-start flex gap-2"
        onClick={handleChooseFile}
        disabled={isUploading}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      {!!imgUrl && (
        <div className="flex flex-col gap-4 ">
          <p>
            <b>URL:</b>
            {imgUrl}
          </p>
          <img src={imgUrl} alt="" className="rounded-xl" />
        </div>
      )}
      <input
        onChange={handleChange}
        className="hidden"
        type="file"
        name="file"
        accept="image/*"
        disabled={isUploading}
        ref={fileInputRef}
      />
    </div>
  );
}
