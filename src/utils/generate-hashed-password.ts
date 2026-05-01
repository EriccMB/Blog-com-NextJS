import { hashPassword } from "@/lib/login/manage-login";

(async () => {
  const minhaSenha = '1234'; // SENHA PARA POR NO .env LOGIN_PASSWORD
  const hashDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);

  console.log({ hashDaSuaSenhaEmBase64 });
})();