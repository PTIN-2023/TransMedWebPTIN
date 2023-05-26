import React, { useState } from "react";
import { Button } from 'flowbite-react'
import { useEffect } from 'react';
import styles from "../styles/ProfileStyles.module.css";
import getTextCurrentLocale from '../utils/getTextCurrentLocale';


// Ver estilos en /styles/ProfileStyles.jsx

export default function UserProfile(userTokenCookie) {

  console.log("user: " + userTokenCookie)

  //  Datos del usuario
  const [userName, getName] = useState("");
  const [userAge, getAge] = useState("");
  const [userPseudoname, getPseudoname] = useState("");
  const [userMail, getEmail] = useState("");
  const [userPasswd, getPasswd] = useState("");
  const [userPhone, getPhone] = useState("");
  const [userCity, getCity] = useState("");
  const [userAddres, getAddres] = useState("");

  const userTestToken = 'John doe';
  //const userTestToken = '1q2w3e4r5t'
  //const email = 'John doe'
  // Metodo para gestionar los cambios de datos que haga el cliente
  /*
      - Se hace una llamada con el email del usuario para poder identificarlo dentro 
        de la base de datos, posteriormente se pasan una serie de datos que corresponden 
        con la nueva informacion del cliente despues de ser modificada.
        De esta manera la api recibira los datos que debera actualizar dentro de la basa de datos.
  */
  const setNewUserData = async (e) => {
    try {
      const response = await fetch('/api/user_modifyInfo?user_test_token=' + userTestToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudoname: userPseudoname,
          email: userMail,
          passwd: userPasswd,
          phone: userPhone,
          city: userCity,
          addres: userAddres
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrarse. Por favor, inténtalo de nuevo.');
      }

      console.log('Registrado con éxito');
    } catch (error) {
      console.error(error);
    }
  }

  // Metodo para pedir la informacion con la que rellenar los campos del perfil.
  /*
      - Se hace una llamada con el email del usuario para poder identificarlo dentro 
        de la base de datos, la api devuelve los valores que se asignaran a cada campo del perfil
        en su sitio correspondiente, en caso de que se produzca un error, se rellenaran con "none"
  */

  const getUserData = async (e) => {
    try {
      const response = await fetch('/api/user_info?user_test_token=' + userTestToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.result === "ok") {
        getName(data.user.name);
        getAge(data.user.age);
        getPseudoname(data.user.pseudoname);
        getEmail(data.user.email);
        getPasswd(data.user.passwd);
        getPhone(data.user.phone);
        getCity(data.user.city);
        getAddres(data.user.addres);
      } else {
        getName('none');
        getAge('0');
        getPseudoname('none');
        getEmail('none');
        getPasswd('none');
        getPhone('none');
        getCity('none');
        getAddres('none');
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  // Metodo para controlar que se llame a la funcion solo cuando se carge la pagina o cuando se la llame
  useEffect(() => {
    getUserData();
  }, []);


  //  Handlers para los accesos rapidos
  const handlerOnClick_L = (e) => {
    //  Redirecciona a MYORDERS
    window.location.href = 'http://localhost:3000/myorders';
  }
  const handlerOnClick_C = (e) => {
    //  Redirecciona a INVENTORY
    window.location.href = 'http://localhost:3000/inventory';
  }
  const handlerOnClick_R = (e) => {
    //  Redirecciona a MAP_LOCAL
    window.location.href = 'http://localhost:3000/map_local';
  }


  /////////////////////////////////////////////////////////////////////
  ///  Handlers para los botones de editar de cada campo del perfil ///

  /////////////////////////////////////////////////////////////////////
  const [showPseudoInput, setShowPseudoInput] = useState(false);

  const handlePseudoChange = (event) => {
    getPseudoname(event.target.value);
  };

  const handleEditPseudoClick = () => {
    setShowPseudoInput(true);
  };

  const handleConfirmPseudoClick = () => {
    setShowPseudoInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false)

  const handleEmailChange = (event) => {
    getEmail(event.target.value);
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    console.log(event.target.value)
    setIsEmailValid(regex.test(event.target.value))
  };

  const handleEditEmailClick = () => {
    setShowEmailInput(true);
  };

  const handleConfirmEmailClick = () => {
    setShowEmailInput(false);
    setNewUserData();
    getUserData();
  };

  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showPasswdInput, setShowPasswdInput] = useState(false);
  const [showPassword,] = useState(false)

  const handlePasswdChange = (event) => {
    getPasswd(event.target.value);
  };

  const handleEditPasswdClick = () => {
    setShowPasswdInput(true);
  };

  const handleConfirmPasswdClick = () => {
    setShowPasswdInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const handlePhoneChange = (event) => {
    getPhone(event.target.value);
  };

  const handleEditPhoneClick = () => {
    setShowPhoneInput(true);
  };

  const handleConfirmPhoneClick = () => {
    setShowPhoneInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showCityInput, setShowCityInput] = useState(false);

  const handleCityChange = (event) => {
    getCity(event.target.value);
  };

  const handleEditCityClick = () => {
    setShowCityInput(true);
  };

  const handleConfirmCityClick = () => {
    setShowCityInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [showAddrInput, setShowAddresInput] = useState(false);

  const handleAddresChange = (event) => {
    console.log("Clikat")
    getAddres(event.target.value);
  };

  const handleEditAddresClick = () => {
    setShowAddresInput(true);
  };

  const handleConfirmAddresClick = () => {
    setShowAddresInput(false);
    setNewUserData();
    getUserData();
  };
  /////////////////////////////////////////////////////////////////////

  /*<input type="userPseudoname" value={userPseudoname} onChange={handlePseudoChange} />*/

  return (

    <div className={styles.cont_main}>
      <div className={styles.cont_imagZone}>
        <img src="https://img.pccomponentes.com/pcblog/1678057200000/mi-cuenta.jpg" alt="Profile Picture" className={styles.style_profilePic} />
        <div className={styles.cont_subImagZone}>
          <h1 className={styles.text_title}>{userName}</h1>
          <h2 className={styles.text_subtitle}>{getTextCurrentLocale('user_age')}: {userAge}</h2>
        </div>
      </div>
      <div className={styles.cont_userZone}>
        <div className={styles.cont_subUserZoneF}>
          <div className={styles.cont_userZoneInfo}>
            <h1 id="user_given_name" className={styles.text_importantText}> {getTextCurrentLocale('user_given_name')}</h1>
            {showPseudoInput ? (
              <input
                type="userPseudoname"
                value={userPseudoname}
                className={styles.input}
                onChange={handlePseudoChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userPseudoname}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showPseudoInput ? handleConfirmPseudoClick : handleEditPseudoClick}>
              {showPseudoInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_email')}</h1>
            {showEmailInput ? (
              <input
                type="email"
                value={userMail}
                className={styles.input}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Por favor ingresa un correo electrónico válido"
                onChange={handleEmailChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userMail}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showEmailInput ? handleConfirmEmailClick : handleEditEmailClick} disabled={!isEmailValid && showEmailInput}>
              {showEmailInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_password')}</h1>
            {showPasswdInput ? (
              <input
                type={'text'}
                value={userPasswd}
                className={styles.input}
                onChange={handlePasswdChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{showPassword ? ({ userPasswd }) : <h2 className={styles.text_passwd}>········</h2>}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showPasswdInput ? handleConfirmPasswdClick : handleEditPasswdClick}>
              {showPasswdInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_phone')}</h1>
            {showPhoneInput ? (
              <input
                type="tel"
                value={userPhone}
                className={styles.input}
                onChange={handlePhoneChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userPhone}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showPhoneInput ? handleConfirmPhoneClick : handleEditPhoneClick}>
              {showPhoneInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_city')}</h1>
            {showCityInput ? (
              <input
                type="userCity"
                value={userCity}
                className={styles.input}
                onChange={handleCityChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userCity}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showCityInput ? handleConfirmCityClick : handleEditCityClick}>
              {showCityInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subUserZone}>
          <div className={styles.cont_userZoneInfo}>
            <h1 className={styles.text_importantText}>{getTextCurrentLocale('user_address')}</h1>
            {showAddrInput ? (
              <input
                type="user_Addres"
                value={userAddres}
                className={styles.input}
                onChange={handleAddresChange}
              />
            ) : (
              <h2 className={styles.text_normalText}>{userAddres}</h2>
            )}
          </div>
          <div className={styles.cont_userZoneButton}>
            <Button onClick={showAddrInput ? handleEditAddresClick : handleConfirmAddresClick}>
              {showAddrInput ? getTextCurrentLocale('button_confirm') : getTextCurrentLocale('button_edit')}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.cont_quickAccess}>
        <div className={styles.cont_subQuickAccess}>
          <div>
            <img src="https://img.pccomponentes.com/pcblog/1678057200000/como-comprar.jpg" alt="Profile Picture" className={styles.style_shortcutsPic} />
          </div>
          <div className={styles.cont_subQuickAccessText}>
            <h1 className={styles.text_title}>{getTextCurrentLocale('myorders')}</h1>
          </div>
          <div>
            <Button onClick={handlerOnClick_L}>
              {getTextCurrentLocale('button_open')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subQuickAccess}>
          <div>
            <img src="https://img.pccomponentes.com/pcblog/1678057200000/pedidos.jpg" alt="Profile Picture" className={styles.style_shortcutsPic} />
          </div>
          <div className={styles.cont_subQuickAccessText}>
            <h1 className={styles.text_title}>{getTextCurrentLocale('inventory')}</h1>
          </div>
          <div>
            <Button onClick={handlerOnClick_C}>
              {getTextCurrentLocale('button_open')}
            </Button>
          </div>
        </div>
        <div className={styles.cont_subQuickAccess}>
          <div>
            <img src="https://img.pccomponentes.com/pcblog/1678057200000/facturas.jpg" alt="Profile Picture" className={styles.style_shortcutsPic} />
          </div>
          <div className={styles.cont_subQuickAccessText}>
            <h1 className={styles.text_title}>{getTextCurrentLocale('map_local')}</h1>
          </div>
          <div>
            <Button onClick={handlerOnClick_R}>
              {getTextCurrentLocale('button_open')}
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </div>

  );
}