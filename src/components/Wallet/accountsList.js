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
      <Link to={`/account/${props.address}`} className="mono">{props.address}</Link>
    </CardTitle>
    <CardText>
      <div style={styles.wrapper}>
        {
          props.balances.map(b => (
            <Chip style={styles.chip} key={b.name}>{b.value} {b.name}</Chip>
          ))
        }
      </div>
    </CardText>
  </Card>
);

const AccountsList = (props) => (
    (<div>
      {
        props.accounts.map(account => {
          const balances = props.balances[account.address] || [];

          return (<AccountItem key={account.address} address={account.address} balances={balances}/>)
        })
      }
    </div>)
  );

export default AccountsList;
