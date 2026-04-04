import Button from '@/components/Button';
import InputCheckBox from '@/components/InputCheckBox';
import InputText from '@/components/InputText';

export const dynamic = 'force-dynamic';

export default async function AdminPageNewPost() {
  return (
    <form action="" className='mb-16'>
      <div className=" text-lg flex flex-col gap-5">
        <InputText type="text" placeholder="Padrão" labelText="Padrão" />
        <InputText
          type="text"
          placeholder="Desativado"
          disabled
          labelText="Desativado"
        />
        <InputText
          type="text"
          placeholder="Read Only"
          readOnly
          labelText="Read Only"
        />
        <InputCheckBox labelText="Sexo" />
        <div className='mt-5'>
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
