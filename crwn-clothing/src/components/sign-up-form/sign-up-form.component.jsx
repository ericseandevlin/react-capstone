import { useReducer, useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // cofirm passwords match
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return
    }

    // see if we've authenticated that user with email/pw
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // create a userdoc from what that returns
      const newUser = await createUserDocumentFromAuth(user, { displayName })
      console.log('newUser: ', newUser);

      resetFormFields();

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use.')
      } else {
        console.log('user creation encountered and error: ', error);
      }

    }


  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required onChange={handleChange}
          name="displayName"
          value={displayName} />

        <label>Email</label>
        <input
          type="email"
          required onChange={handleChange}
          name="email"
          value={email} />

        <label>Password</label>
        <input
          type="password"
          required onChange={handleChange}
          name="password"
          value={password} />

        <label>Confirm Password</label>
        <input
          type="password"
          required onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;