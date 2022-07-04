import { useState } from 'react';
import { signInWithGooglePopup, signInWithEmail } from "../../utils/firebase/firebase.utils"

import './sign-in-form.styles.scss';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const logEmailUser = async (event) => {
    event.preventDefault()


    if (email && password) {
      try {
        await signInWithEmail(email, password);
        resetFormFields()
      } catch (error) {
        switch (error.code) {
          case 'auth/wrong-password':
            alert('Incorrect password for email');
            break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
          default:
            console.log(error);
            break;
        }
      }
    }

  }

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <form onSubmit={logEmailUser}>

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

        <div className="button-holder">
          <Button type="submit" name="email-login">Sign in</Button>
          <Button type="button" buttonType={'google'} name="google-login" onClick={logGoogleUser}>Google sign in</Button>
        </div>

      </form>
    </div>

  )
}
export default SignInForm;