import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { Button } from '../UI/Button';
import GoogleAuthButton from '../UI/Button/googleBtn';
import { Input } from '../UI/Input';
import { Heading, Paragraph } from '../UI/Typography';
import { StyledLoginForm } from './styledLoginForm';

// additional button
const Style = {
  box: { position: 'relative', padding: '5px 0' },
  btnStyle: {
    background: 'transparent',
    border: 'none',
    color: '#ea0068',
    cursor: 'pointer',
    marginTop: '5px',
    position: 'absolute',
    right: '5px'
  }
};

const SignUpForm = () => {
  const [confirm, setConfirm] = useState(false);
  const {
    authState: { auth, error },
    dispatchRegister,
    dispatchSocialLogin
  } = useUserContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { email, password, confirmPassword } = formData;
  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onsubmit = event => {
    event.preventDefault();
    if (!confirmPassword) {
      setConfirm(true);
      return;
    }
    dispatchRegister(formData);
    setConfirm(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const reset = () => {
    setConfirm(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <StyledLoginForm className="form" onSubmit={onsubmit}>
      <Heading center color="#ea0068">
        Sign up
      </Heading>
      <div className="form_data">
        <label htmlFor="email" className="form_label">
          Email Address
        </label>
        <section className="form_input">
          <img src="/Images/email_icon.svg" alt="email icon" />
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            placeholder="Type your email address"
            width="100%"
            padding="14px 0"
            required
          />
        </section>
      </div>
      {!confirm ? (
        <div className="form_data">
          <label htmlFor="password" className="form_label">
            Password
          </label>
          <section className="form_input form_input2">
            <img src="/Images/pass_icon.svg" alt="password icon" />
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              placeholder="Type your password"
              width="100%"
              padding="14px 0"
              required
            />
          </section>
        </div>
      ) : (
        <div className="form_data">
          <label htmlFor="confirmPassword" className="form_label">
            Confirm Password
          </label>
          <section className="form_input form_input3 ">
            <img src="/Images/eye_icon.svg" alt="eye icon" />
            <Input
              id="confirmPassword"
              type="text"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => onChange(e)}
              placeholder="Type your password again"
              width="100%"
              padding="14px 0"
              required
            />
          </section>
          <div style={Style.box}>
            <button style={Style.btnStyle} type="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      )}
      <Button type="submit" width="100%" margin="20px 0 0 0 ">
        {!auth.authLoading ? (
          'Sign up'
        ) : (
          <img
            src="/Images/three-dots.svg"
            width="50px"
            alt="loading"
            aria-hidden="true"
          />
        )}
      </Button>
      <Paragraph center size="14px" color="rgba(0, 0, 0, 0.56)" margin="20px 0">
        or singin using social accounts
      </Paragraph>
      <GoogleAuthButton onclick={dispatchSocialLogin} />
    </StyledLoginForm>
  );
};

export default SignUpForm;
