import './sign-up-from.styles.scss';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';

import FormInput from './../form-input/form-input.component';
import Button from './../button/button.component.jsx';

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
    <div className='sign-up-container'>

      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>

        <FormInput
          label="Display Name"
          type="text"
          required onChange={handleChange}
          name="displayName"
          value={displayName} />

        <FormInput
          label="Email"
          type="email"
          required onChange={handleChange}
          name="email"
          value={email} />

        <FormInput
          label="Password"
          type="password"
          required onChange={handleChange}
          name="password"
          value={password} />

        <FormInput
          label="Confirm Password"
          type="password"
          required onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword} />

        <Button type="submit">Sign Up</Button>

      </form>

    </div>
  )
}

export default SignUpForm;