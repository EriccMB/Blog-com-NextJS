'use client';

import Button from '@/components/Button';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';
import { useActionState, useEffect, useState } from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import ImageUploader from '../ImageUploader';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { createPostAction } from '@/actions/post/create-post-action';
import { toastifyAdapter } from '@/adapters/toastifyAdapter';
import { updatePostAction } from '@/actions/post/update-post-action';
import { useRouter, useSearchParams } from 'next/navigation';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost?: PublicPost;
};
type ManagePostFormCreateProps = {
  mode: 'create';
};
type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export default function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;

  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionMap = {
    create: createPostAction,
    update: updatePostAction,
  };

  // O ESTADO INICAL, RECEBE O formState, E O UM ARRAY DE ERROS VAZIO
  // NESSE CASO, o publicPost PODE SER NULO, ENTÃO O initialState PODE ENVIAR UM formState SEM NADA
  // PARA RESOLVER ISSO, É CRIADO UM OBJETO formState VAZIO CASO O publicPost NÃO EXISTIR
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toastifyAdapter.dismiss();
      state.errors.forEach((e) => toastifyAdapter.error(e));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toastifyAdapter.dismiss();
      toastifyAdapter.success('Post atualizado');
    }
  }, [state.success]);

  useEffect(() => {
    if (created === '1') {
      toastifyAdapter.dismiss();
      toastifyAdapter.success('Post criado com sucesso');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');

      router.replace(url.toString());
    }
  }, [created, router]);
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
          disabled={isPending}
        />
        <InputText
          labelText="Slug"
          name="slug"
          type="text"
          placeholder="Slug Gerado automaticamente"
          defaultValue={formState.slug}
          readOnly
          disabled={isPending}
        />
        <InputText
          labelText="Autor"
          name="author"
          type="text"
          placeholder="Digite o nome do autor"
          defaultValue={formState.author}
          disabled={isPending}
        />
        <InputText
          labelText="Título"
          name="title"
          type="text"
          placeholder="Digite o título"
          defaultValue={formState.title}
          disabled={isPending}
        />
        <InputText
          labelText="Excerto"
          name="excerpt"
          type="text"
          placeholder="Digite o resumo"
          defaultValue={formState.excerpt}
          disabled={isPending}
        />
        <MarkdownEditor
          labelText="Conteudo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={isPending}
        />
        <ImageUploader disabled={isPending} />

        <InputText
          labelText="URL da imagem de capa"
          name="coverImageUrl"
          type="text"
          placeholder="Digite a url da imagem"
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />
        <InputCheckBox
          labelText="Publicar?"
          name="published"
          type="checkbox"
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className="mt-5">
          <Button type="submit" disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
