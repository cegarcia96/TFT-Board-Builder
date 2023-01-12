import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ setShowModal, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setShowModal(false);
            setError(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(true);
        });
    }

    return(
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-8 mb-4 text-xl">Log In</div>
        <form className="flex flex-col text-lg">
          <label htmlFor="email-address">
            Email
          </label>
          <input className="bg-slate-700 rounded border border-slate-600 focus:outline-slate-700 pl-0.5 mb-2 w-56"
            type="email"
            label="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">
            Password
          </label>
          <input className="bg-slate-700 rounded border border-slate-600 focus:outline-slate-700 pl-0.5 mb-2 w-full"
            type="password"
            label="Create password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input className="border border-slate-600 bg-slate-700 hover:bg-slate-600 mt-6 cursor-pointer" type="submit" onClick={onLogin} value="Log in"/>
          {error ? <div className="text-sm mt-2 self-center">Incorrect username or password</div> : null}
        </form>
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="hover:underline cursor-pointer">Don't Have An Account?</div>
        </div>
      </div>
    )
}

export default Login