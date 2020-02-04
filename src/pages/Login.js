/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
import { UserContext } from '../context/user';

// strapi function

// handle user

export default function Login() {
  const history = useHistory();
  const { userLogin, alert, showAlert } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  const isEmpty = !email || !password || !username || alert.show;
  async function handleSubmit(e) {
    // alert
    showAlert({
      msg: "Patiente un moment, le temps d'accéder à ton compte...",
    });
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const {
        jwt: token,
        user: { username },
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({ msg: `Heureux de te revoir: ${username}. Bon shopping` });
      history.push('/products');
    } else {
      // show alert
      showAlert({
        msg: `Aww, une erreur s'est produite. Réessayons à nouveau`,
        type: 'danger',
      });
    }
  }
  function toggleMember() {
    setIsMember(prevMember => {
      const alreadyMember = !prevMember;
      alreadyMember ? setUsername('default') : setUsername('');
      return alreadyMember;
    });
  }

  return (
    <section className="form section">
      <h2 className="section-title">
        {isMember ? "s'identifier" : "s'inscrire"}
      </h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">e-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* single input */}
        <div className="form-control">
          <label htmlFor="password">mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* single input */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        )}
        {/* end of single input */}
        {/* empty from text */}
        {isEmpty && (
          <p className="form-empty">Pense à remplir tous les champs</p>
        )}

        {/* submit btn */}
        {!isEmpty && (
          <button type="submit" className="btn btn-block btn-primary ">
            envoyer
          </button>
        )}
        {/* register link */}
        <p className="register-link">
          {isMember ? 'Créer un compte ?' : 'Déjà membre'}
          <button type="button" onClick={toggleMember}>
            👉🏻 c'est par ici
          </button>
        </p>
      </form>
    </section>
  );
}
