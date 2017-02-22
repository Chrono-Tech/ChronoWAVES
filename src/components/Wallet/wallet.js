import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {createAccountAction} from '../../redux/actions';
import AccountsList from './accountsList';
import FontIcon from 'material-ui/FontIcon';
import Toolbar from '../Toolbar';
import {AddIcon} from '../Icons';

class Wallet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Toolbar
          title="ACCOUNTS"
          actionButtons={
            <FlatButton
              onClick={this.props.onCreateAccount}
              label="NEW ACCOUNT"
              icon={<AddIcon />}/>}
        />

        <AccountsList accounts={this.props.accounts} balances={this.props.balances}/>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.wallet.accounts,
    balances: state.balances
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: () => {
      dispatch(createAccountAction());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
