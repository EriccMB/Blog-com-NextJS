'use client';

import Button from '@/components/Button';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';
import { useState } from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import ImageUploader from '../ImageUploader';
import { PublicPost } from '@/dto/post/dto';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export default function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || '');
  return (
    <form action="" className="mb-16">
      <div className=" text-lg flex flex-col gap-5">
        <InputText
          labelText="ID"
          name="id"
          type="text"
          placeholder="ID Gerado automaticamente"
          defaultValue={publicPost?.id || ''}
          readOnly
        />
        <InputText
          labelText="Slug"
          name="slug"
          type="text"
          placeholder="Slug Gerado automaticamente"
          defaultValue={publicPost?.slug || ''}
          readOnly
        />
        <InputText
          labelText="Autor"
          name="author"
          type="text"
          placeholder="Digite o nome do autor"
          defaultValue={publicPost?.author || ''}
        />
        <InputText
          labelText="Título"
          name="title"
          type="text"
          placeholder="Digite o título"
          defaultValue={publicPost?.title || ''}
        />
        <InputText
          labelText="Excerto"
          name="excerpt"
          type="text"
          placeholder="Digite o resumo"
          defaultValue={publicPost?.excerpt || ''}
        />
        <MarkdownEditor
          labelText="Conteudo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
        />
        <ImageUploader />

        <InputText
          labelText="URL da imagem de capa"
          name="coverImageUrl"
          type="text"
          placeholder="Digite a url da imagem"
          defaultValue={publicPost?.coverImageUrl || ''}
        />
        <InputCheckBox labelText="Publicar?" name="published" type="checkbox" defaultChecked={publicPost?.published || false} />

        <div className="mt-5">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
