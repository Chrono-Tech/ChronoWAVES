import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {createAccountAction} from '../../redux/actions';
import AccountsList from './accountsList';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class Wallet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Toolbar>
          <h3>ACCOUNTS</h3>
          <ToolbarGroup>
            <FlatButton
              onClick={this.props.onCreateAccount}
              label="NEW ACCOUNT"
              icon={<FontIcon className="material-icons">add</FontIcon>}/>
          </ToolbarGroup>
        </Toolbar>


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
