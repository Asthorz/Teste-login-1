import { useCallback, useRef, useState } from 'react';
import './App.css'
import axios, { AxiosError } from 'axios';
import { LoaderCircle } from 'lucide-react';

function App() {

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSucesso, setFormSucesso] = useState(false);
 
  const handRegisterClick = useCallback(async (event) => {
    event.preventDefault();
    setFormError(""); // Corrigido para resetar o erro corretamente
    setFormSucesso(false);
    setFormLoading(true); // Inicia o loading quando a requisição começa

    const emailReg = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );

    if (emailInputRef.current && passwordInputRef.current) {
      const email = emailInputRef.current.value;
      const pass1 = passwordInputRef.current.value;

      let shouldReturnError = false;

      if (!emailReg.test(email)) {
        setFormError("Digite um e-mail válido");
        shouldReturnError = true;
      }

      if (pass1.length < 8) {
        setFormError("A senha precisa ter pelo menos 8 caracteres");
        shouldReturnError = true;
      }

      if (shouldReturnError) {
        setFormLoading(false); // Para o loading se houver erro
        return;
      }

      try {
        const response = await axios.post("/api/register", {
          email,
          password: pass1,
        });
        setFormLoading(false); 
        setFormSucesso(true); // Define sucesso ao completar a requisição
      } catch (error) {
        if (error instanceof AxiosError) {
          setFormError(error.message);
        }
        setFormLoading(false); // Para o loading em caso de erro
      }
    }
  }, []);

  return (
    <div>
      <h1>Login/Cadastro</h1>
      <form onSubmit={(event) => handRegisterClick(event)}>
        <label htmlFor='email'>Email</label>
        <input
          type="text"
          ref={emailInputRef}
          placeholder='Digite Login'
          id='email'
          required        
        />
        
        <label htmlFor='password'>Senha</label>
        <input
          type="password"
          ref={passwordInputRef}
          placeholder='Digite senha'
          id='password'
          required        
        />

        <div>
          {formError && (
            <div>
              <p>Erro no Formulário</p>
              <p>{formError}</p>
            </div>
          )}
          
          {formSucesso && (
            <div>
              <p>Cadastro realizado com sucesso!</p>
            </div>
          )}

          <button disabled={formLoading}>
            {formLoading && <LoaderCircle />}
            Aperta aqui
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
