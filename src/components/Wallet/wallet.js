import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {createAccountAction} from '../../redux/actions';
import AccountsList from './accountsList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

class Wallet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Accounts</h4>

        <FlatButton
          onClick={this.props.onCreateAccount}
          label="NEW ACCOUNT"
          icon={<FontIcon className="material-icons">add</FontIcon>} />

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
