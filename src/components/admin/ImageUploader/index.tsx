'use client';

import { uploadImageAction } from '@/actions/post/upload-image-action';
import { toastifyAdapter } from '@/adapters/toastifyAdapter';
import Button from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';

type ImageUploaderProps = {
  disabled?: boolean
}

export default function ImageUploader({disabled = false}: ImageUploaderProps) {
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
    toastifyAdapter.dismiss();
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

    const uploaderMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

    if (file.size > uploaderMaxSize) {
      toastifyAdapter.error(
        `Imagem muito grande. Tamanho máximo: ${uploaderMaxSize / 1024} kb`,
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
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      {!!imgUrl && (
        <div className="flex flex-col gap-4 ">
          <p>
            <b>URL: </b>
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
        disabled={isUploading || disabled} 
        ref={fileInputRef}
      />
    </div>
  );
}
