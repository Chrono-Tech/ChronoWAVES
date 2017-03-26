import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {createAccountAction} from '../../redux/walletActions';
import AccountsList from './accountsList';
import Toolbar from '../Toolbar';
import {AddIcon} from '../Icons';

export class Wallet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {accounts, balances} = this.props;

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

        <AccountsList accounts={ accounts } balances={  balances }/>
      </div>);
  }
}

Wallet.propTypes = {
  accounts: PropTypes.array.isRequired,
  balances: PropTypes.object.isRequired
};

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
