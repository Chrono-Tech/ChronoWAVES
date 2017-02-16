import React from 'react';
import {Card, CardTitle, CardText, CardHeader} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import {Link} from 'react-router';
import Container from '../container';
import './accountsList.css';
import {CopyIcon} from '../Icons';
import blockies from 'blockies';

const listStyles = {
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  // item: {
  //   flex: '0 1 50%',
  //   width: '50%',
  //   position: 'relative',
  //   paddingBottom: '0.25em',
  //   boxSizing: 'border-box',
  // }
};

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    height: '100%',
    position: 'relative',
    overflow: 'auto'
  }
};

const AccountItem = (props) => {

  const icon = blockies({seed: props.address}).toDataURL();

  return (<Container>

    <Card style={ styles.card }>
      <CardHeader avatar={icon}
                  title={(
                    <div>
                      <Link to={`/account/${props.address}`} className="mono">{props.address}</Link> <CopyIcon />
                    </div>)}/>
      <CardText>
        <div style={ styles.wrapper }>
          {
            props.balances.map(b => (
              <Chip style={styles.chip} key={b.name}>{b.value} {b.name}</Chip>
            ))
          }
        </div>
      </CardText>
    </Card>
  </Container>);
};

const AccountsList = (props) => (
  (<div style={ listStyles.list }>
    {
      props.accounts.map(account => {
        const balances = props.balances[account.address] || [];

        return (
          <div className="item" key={ account.address }>
            <AccountItem address={ account.address } balances={ balances }/>
          </div>)
      })
    }
  </div>)
);

export default AccountsList;
