import React from 'react';
import {connect} from 'react-redux';
import {Paper, RaisedButton, TextField} from 'material-ui';
import styles from './styles';
import {loginSuccessAction} from '../../redux/userActions';
import {blockchain} from '../../blockchain';

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
    const currentSeed = e.target.value;
    const address = blockchain.createAccount(currentSeed).address;
    this.setState({address: address, seed: currentSeed});
  }

  render() {

    return (
      <div style={styles.loginContainer}>
        <Paper style={styles.paper}>
          <TextField floatingLabelText="SEED"
                     type="password" fullWidth={true}
                     onChange={this.onInputChange}/>

          <p className="mono">{this.state.address}</p>

          <RaisedButton label="Login"
                        primary={true}
                        fullWidth={true}
                        onTouchTap={() => {
                          this.props.onLoginClick(this.state.seed);
                        }}
                        style={styles.loginBtn}/>
        </Paper>
      </div>);

  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginClick: (seed) => {
      dispatch(loginSuccessAction(seed));
    }
  }
};


export default connect(null, mapDispatchToProps)(Login);
