import React, {useState} from 'react';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });


    }

  return (
    <div className="flex flex-col">
      <div>Sign In</div>
      <form className="flex flex-col">
        <label htmlFor="email-address">
          Email address
        </label>
        <input
          type="email"
          label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Email address"
        />
        <label htmlFor="password">
          Password
        </label>
        <input
          type="password"
          label="Create password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder="Password"
        />
        <input type="submit" onClick={onSubmit} value="Submit"/>
      </form>
    </div>
  )
}

export default Signup