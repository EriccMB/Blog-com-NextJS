'use client'

import Button from "@/components/Button";
import InputCheckBox from "@/components/InputCheckBox";
import InputText from "@/components/InputText";
import { useState } from "react";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import ImageUploader from "../ImageUploader";

export default function ManagePostForm() {

    const [contentValue, setContentValue] = useState('exemplo');
  return (
    <form action="" className="mb-16">
      <div className=" text-lg flex flex-col gap-5">
        <ImageUploader />
        <InputText type="text" placeholder="Padrão" labelText="Padrão" />
        <InputText
          type="text"
          placeholder="Desativado"
          disabled
          labelText="Desativado"
        />

        <MarkdownEditor labelText="Conteudo" value={contentValue} setValue={setContentValue} textAreaName="content" />
        <InputText
          type="text"
          placeholder="Read Only"
          readOnly
          labelText="Read Only"
        />
        <InputCheckBox labelText="Sexo" />
        <div className="mt-5">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
