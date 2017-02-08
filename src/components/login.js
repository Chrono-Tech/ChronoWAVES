import React from 'react';
import {connect} from 'react-redux';
import {Paper, RaisedButton, TextField} from 'material-ui';
import {grey500} from 'material-ui/styles/colors';

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'hidden'
  },
  buttonsDiv: {
    textAlign: 'center',
    marginTop: 10
  },
  flatButton: {
    color: grey500,
    width: '50%'
  },
  loginBtn: {
    marginTop: 10
  }
};

const Login = ({onLoginClick, onInputChange, address}) => (
  <div style={styles.loginContainer}>
    <Paper style={styles.paper}>
      <TextField floatingLabelText="SEED" type="password" fullWidth={true} onChange={onInputChange} />
      <p>{address}</p>
      <RaisedButton label="Login"
                    primary={true}
                    fullWidth={true}
                    onTouchTap={onLoginClick}
                    style={styles.loginBtn}/>
    </Paper>
  </div>
);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginClick: () => {
      dispatch({type: 'LOGIN_SUCCESS'});
    },
    onInputChange: (event, newValue) => {
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
