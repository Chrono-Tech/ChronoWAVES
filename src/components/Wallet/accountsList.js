import React from 'react';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {Link} from 'react-router';

import Balances from '../Balances';
import Container from '../container';
import './accountsList.css';
import IdentityIcon from '../IdentityIcon';
import CopyToClipboard from '../CopyToClipboard';

const styles = {
  card: {
    height: '100%',
    // position: 'relative',
    // overflow: 'auto'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  address: {
    paddingLeft: '10px'
  }
};

const AccountItem = (props) => {

  const identityIcon = (<IdentityIcon address={ props.address }/>);

  return (<Container>
    <Card style={ styles.card }>
      <CardHeader
        avatar={ identityIcon }
        title={(
          <div style={ styles.address }>
            <Link to={`/wallet/account/${props.address}`} className="mono account">{ props.address }</Link> <CopyToClipboard />
          </div>)}/>
      <CardText>
        <Balances balances={ props.balances }/>
      </CardText>
    </Card>
  </Container>);
};

const AccountsList = (props) => (
  (<div style={ styles.list }>
    {
      props.accounts.map(account => {
        const balances = props.balances.get(account.address);

        return (
          <div className="item" key={ account.address }>
            <AccountItem address={ account.address } balances={ balances }/>
          </div>)
      })
    }
  </div>)
);

export default AccountsList;
