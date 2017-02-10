import React from'react';
import {connect} from 'react-redux';
import {fetchBalances} from '../../actions';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Balances extends React.Component {
  componentWillMount() {
    this.props.loadBalances(this.props.address);
  }

  render() {
    return <div>
      {
        this.props.balances.map(b =>
          (
            <Card key={b.name}>
              <CardTitle>
                {b.value} {b.name}
              </CardTitle>
              <CardActions>
                <FlatButton label="SEND" />
                <FlatButton label="TRADE" />
              </CardActions>
            </Card>
          )
        )
      }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.session.address,
    balances: state.balances
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBalances: (address) => {
      dispatch(fetchBalances(address));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Balances);
