'use client';

import Button from '@/components/Button';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';
import { useActionState, useState } from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import ImageUploader from '../ImageUploader';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { createPostAction } from '@/actions/post/create-post-action';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export default function ManagePostForm({ publicPost }: ManagePostFormProps) {
  // O ESTADO INICAL, RECEBE O formState, E O UM ARRAY DE ERROS VAZIO
  // NESSE CASO, o publicPost PODE SER NULO, ENTÃO O initialState PODE ENVIAR UM formState SEM NADA
  // PARA RESOLVER ISSO, É CRIADO UM OBJETO formState VAZIO CASO O publicPost NÃO EXISTIR
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(formState?.content || '');

  return (
    <form action={action} className="mb-16">
      <div className=" text-lg flex flex-col gap-5">
        <InputText
          labelText="ID"
          name="id"
          type="text"
          placeholder="ID Gerado automaticamente"
          defaultValue={formState.id}
          readOnly
        />
        <InputText
          labelText="Slug"
          name="slug"
          type="text"
          placeholder="Slug Gerado automaticamente"
          defaultValue={formState.slug}
          readOnly
        />
        <InputText
          labelText="Autor"
          name="author"
          type="text"
          placeholder="Digite o nome do autor"
          defaultValue={formState.author}
        />
        <InputText
          labelText="Título"
          name="title"
          type="text"
          placeholder="Digite o título"
          defaultValue={formState.title}
        />
        <InputText
          labelText="Excerto"
          name="excerpt"
          type="text"
          placeholder="Digite o resumo"
          defaultValue={formState.excerpt}
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
          defaultValue={formState.coverImageUrl}
        />
        <InputCheckBox
          labelText="Publicar?"
          name="published"
          type="checkbox"
          defaultChecked={formState.published}
        />

        <div className="mt-5">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
