import { revalidateExampleAction } from "@/actions/revalidate-example";
import { formatHourTest } from "@/utils/get-formateddate";

//POR PADRAO, É DINAMICA, SE COLOCAR ISSO, FORÇA A PAGINA SER ESTÁTICA, NAO MUDAR
export const dynamic = 'force-static';

// ISSO CRIA UM SSG - STATIC SITE GENERATION, ELE MONTA AS PAGINAS COM OS PARAMETROS
// ARRAY VAZIO = CRIA UMA PAGINA ESTÁTICA
// export async function generateStaticParams() {
//     return [{id: '12'}, {id: '123'}];
// }

// CRIA UM ISR - INCREMENTAL STATIC RENEGERATION, O CACHE FICA INVALIDO DEPOIS DE UM TEMPO EM SEGUNDOS
// export const dynamic = 'force-static';
// export const revalidate = 5;

export default async function ExemploTeste({ params }: {params: Promise<{slug: string}>}) {
    const hour = formatHourTest(Date.now());
    const {slug} = await params;
    return (
        <>  
        <h2>{hour} (id: {slug})</h2>
        <form action={revalidateExampleAction}>
            <input type="hidden" name="path" defaultValue={`/exemplo/${slug}`}/>
            <button className="bg-stone-400 p-2 rounded text-white hover:bg-stone-500 cursor-pointer" type="submit">Revalidate</button>
        </form>
        </>
    );
}