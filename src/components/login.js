import React from 'react';
import {connect} from 'react-redux';
import {Paper, RaisedButton, TextField} from 'material-ui';
import {grey500} from 'material-ui/styles/colors';

import Waves from 'waves.js/dist/waves';

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {address: ''};
  }

  /**
   * This event handler calculates address from current seed
   */
  onInputChange(e) {
    const address = Waves.Account.create(Waves.MainNetParameters(), e.target.value).address;
    this.setState({address: address});
  }

  render() {
    return (
      <div style={styles.loginContainer}>
        <Paper style={styles.paper}>
          <TextField floatingLabelText="SEED" type="password" fullWidth={true} onChange={this.onInputChange}/>
          <p>{this.state.address}</p>
          <RaisedButton label="Login"
                        primary={true}
                        fullWidth={true}
                        onTouchTap={this.props.onLoginClick}
                        style={styles.loginBtn}/>
        </Paper>
      </div>);

  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginClick: () => {
      dispatch({type: 'LOGIN_SUCCESS', address: '3P1vtjFEpXswXWfpiPuFKL1Mqt2NYrTaYMo'});
    }
  }
};


export default connect(null, mapDispatchToProps)(Login);
