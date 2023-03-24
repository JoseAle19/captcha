import ReCAPTCHA from "react-google-recaptcha";

import "./index.css";
import { useRef, useState } from "react";
export const App = () => {
  const captcha = useRef();
  const name = "jose";
  const pass = "jose";

  const [IsValidaCaptcha, setIsValidaCaptcha] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    pass: "",
  });
  const [showMessage, setShowMessage] = useState();
  const changeInputs = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const onchangeCap = () => {
    console.log("Login");
    if (!captcha.current.getValue()) {
      messages("No valiido que no es un robot");
      setIsValidaCaptcha(false);
    }
    setIsValidaCaptcha(true);
    if (name !== formState.name) {
        messages("Credenciales no validas");
        return;
    }
    if (pass !== formState.pass) {
        messages("Credenciales no validas");
        return;
    }
    console.log("paso todo");
  };

  const messages = (message) => {
    setShowMessage(message);
    setTimeout(() => {
      setShowMessage("");
    }, 1000);
  };
  return (
    <div  className="contenedor_home" >
      <h1>Captcha al login</h1>

      <div>
        <form
          className="login"
          onSubmit={(e) => {
            e.preventDefault();
            onchangeCap(e);
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            onChange={changeInputs}
            name="name"
            value={formState.name}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="pass"
            value={formState.pass}
            onChange={changeInputs}
          />
          {<p className="message">{showMessage}</p>}
          <ReCAPTCHA
            className="captcha"
            ref={captcha}
            sitekey="6LeN2SMlAAAAAH__2mLIcxi376Uh3PEG3l9uPzAM"
            onChange={onchangeCap}
          />
          <button
            disabled={IsValidaCaptcha === false ? true : false}
            className={IsValidaCaptcha === false ?  'no_btn_login':"btn_login"}
            type="submit"
          >
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
};
