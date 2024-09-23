import { useCallback, useRef, useState } from 'react';
import './App.css'

function App() {

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [formError, setFormError] = useState("");
 
  const handRegisterClick = useCallback((event) => {
    event.preventDefault();
    setFormError();




  const emailReg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );
  if(emailInputRef.current && passwordInputRef.current){

    const email = emailInputRef.current.value;
    const pass1  = passwordInputRef.current.value;
  if(!emailReg.test(email)){
    setFormError("Digite um e-mail válido")
    return;
  }
  if(pass1.length < 8 ){
    setFormError("A senha precisa ter pelo menos 8 caracteres")
    return;

  }
  }

  
},   [])

  return (
    <div>
      <h1>Login/Cadastro</h1>
      <form onSubmit={(event) => handRegisterClick(event)}>
        <label htmlFor='email'>Email</label>
        <input type="text"
        ref={emailInputRef}
        placeholder='Digite Login'
        id='email'
        required        
        
        />
                <label htmlFor='password'>Senha</label>

           <input type="password"
           ref={passwordInputRef}
        placeholder='Digite senha'
        id='password'
        required        
        
        />
        <div>

          {formError && (<div>
            <p>Erro no Formulario</p>
            <p>{formError}</p>
          </div>
          )}
        <button>Aperta aqui</button>
        
        </div>
      </form>
        
    </div>
  )
}

export default App
