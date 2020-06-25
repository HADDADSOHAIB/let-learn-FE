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
import useStyles from './Signin.styles';
import BACKEND from '../../backend';
import { setFlash } from '../../actions/flash.creators';

const Signin = ({ history, setFlash }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    const {
      email,
      password,
    } = data;

    axios.post(`${BACKEND}/login`, {
      email,
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

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textPrimary" variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <form className={classes.from} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.textField}>
              <TextField
                inputRef={register}
                required
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                fullWidth
                size="small"
              />
            </div>
            <div className={classes.textField}>
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                size="small"
                inputRef={register}
                required
              />
            </div>
            <div className={classes.submit}>
              <Button variant="outlined" color="primary" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

Signin.propTypes = {
  history: PropTypes.shape([]).isRequired,
  setFlash: PropTypes.func.isRequired,

};

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(Signin);
