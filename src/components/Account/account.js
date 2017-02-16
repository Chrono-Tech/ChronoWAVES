import React from 'react';
import {connect} from 'react-redux';

import Container from '../container';
import TransactionsHistory from './Transactions/transactions';
import {CopyIcon} from '../Icons';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import {blue200} from 'material-ui/styles/colors';
import blockies from 'blockies';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { address } = this.props.params;
    const balances = this.props.balances[address] || [];

    const icon = blockies({seed: address, bgcolor: blue200}).toDataURL();

    return (
      <div>
        <Container>

          <Card>
            <CardHeader avatar={icon}
                        title={(
                          <div>
                            {address}<CopyIcon />
                          </div>)}/>
            <CardText>
              <div style={ styles.wrapper }>
                {
                  balances.map(b => (
                    <Chip style={ styles.chip } key={ b.name }>{b.value} {b.name}</Chip>
                  ))
                }
              </div>
            </CardText>
          </Card>
        </Container>

        <TransactionsHistory address={ address }/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balances: state.balances
  }
};

export default connect(mapStateToProps, null)(Account);



































