import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import { useForm } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from './Signup.styles';
import BACKEND from '../backend';
import { setFlash } from '../actions/flash.creators';

const Signup = ({ history, setFlash }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
  } = useForm();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handleUsername = e => setUsername(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handlePasswordConfirmation = e => setPasswordConfirmation(e.target.value);

  const onSubmit = data => {
    const {
      email,
      username,
      lastname,
      firstname,
      password,
    } = data;

    axios.post(`${BACKEND}/signup`, {
      email,
      username,
      lastname,
      firstname,
      password,
    }).then(res => {
      localStorage.setItem('token_auth', res.data.auth);
      history.push('/');
      setFlash({
        message: 'account created successfully',
        open: true,
        severity: 'success',
      });
    }).catch(() => {
      setFlash({
        message: 'Error, try later',
        open: true,
        severity: 'error',
      });
    });
  };

  const shouldMatch = () => password === passwordConfirmation;
  const shouldBeUnique = async name => {
    const unique = await axios.post(`${BACKEND}/signup/unique`, { email, username });
    return unique.data[name];
  };

  const errorMessage = (errors, name) => {
    if (errors[name] && errors[name].type === 'required') {
      return 'field required';
    }
    if (errors[name] && errors[name].type === 'minLength') {
      return 'Should be more the 8 caracters';
    }
    if (errors[name] && errors[name].type === 'match') {
      return 'the password does not match';
    }
    if (errors[name] && errors[name].type === 'unique') {
      return 'should be unique, this one already taken';
    }
    return '';
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textPrimary" variant="h6" className={classes.title}>
            create new account
          </Typography>
          <form className={classes.from} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.textField}>
              <TextField
                inputRef={register({ required: true, validate: { unique: () => shouldBeUnique('email') } })}
                required
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.email}
                helperText={errors.email ? errorMessage(errors, 'email') : ''}
                onChange={handleEmail}
              />
            </div>
            <div className={classes.textField}>
              <TextField
                inputRef={register({ required: true, validate: { unique: () => shouldBeUnique('username') } })}
                required
                label="user name"
                type="text"
                name="username"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.username}
                helperText={errors.username ? errorMessage(errors, 'username') : ''}
                onChange={handleUsername}
              />
            </div>
            <div className={classes.textField}>
              <TextField inputRef={register} label="first name" type="text" name="firstname" variant="outlined" size="small" className={classes.half} />
              <TextField inputRef={register} label="last name" name="lastname" type="type" variant="outlined" size="small" className={classes.half} />
            </div>
            <div className={classes.textField}>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                size="small"
                className={classes.half}
                error={!!errors.password}
                inputRef={register({ required: true, minLength: 8 })}
                required
                value={password}
                onChange={handlePassword}
                helperText={errors.password ? errorMessage(errors, 'password') : ''}
              />
              <TextField
                inputRef={register({ required: true, validate: { match: shouldMatch } })}
                required
                label="Confirme Password"
                name="passwordConfirmation"
                type="password"
                variant="outlined"
                size="small"
                error={!!errors.passwordConfirmation}
                helperText={errors.passwordConfirmation ? errorMessage(errors, 'passwordConfirmation') : ''}
                className={classes.half}
                value={passwordConfirmation}
                onChange={handlePasswordConfirmation}
              />
            </div>
            <div className={classes.submit}>
              <Button variant="outlined" color="primary" type="submit">
                create account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.shape([]).isRequired,
  setFlash: PropTypes.func.isRequired,

};

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(Signup);
