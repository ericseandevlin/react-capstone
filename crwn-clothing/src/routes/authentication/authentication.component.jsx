import './authentication.styles.scss';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";


const Auth = () => {

  return (
    <div>
      <div className="form-container">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  )
}

export default Auth