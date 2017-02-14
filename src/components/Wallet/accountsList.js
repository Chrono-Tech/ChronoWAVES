import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import {Link} from 'react-router'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const AccountItem = (props) => (
  <Card key={props.address}>
    <CardTitle>
      <Link to={`/account/${props.address}`}>{props.address}</Link>
    </CardTitle>
    <CardText>
      <div style={styles.wrapper}>
        {
          props.balances.map(b => (
            <Chip style={styles.chip} key={b.token}>{b.value} {b.token}</Chip>
          ))
        }
      </div>
    </CardText>
  </Card>
);

const AccountsList = (props) => (
  <div>
    {
      props.accounts.map(account => (
        <AccountItem key={account.address} address={account.address} balances={account.balances}/>
      ))
    }
  </div>
);

export default AccountsList;
