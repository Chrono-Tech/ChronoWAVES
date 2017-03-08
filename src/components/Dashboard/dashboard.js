import React from 'react';
import {connect} from 'react-redux';

import {Card, CardText, CardActions, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Toolbar from '../Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {SendIcon} from '../Icons';

import './dashboard.css';
import flagAu from './images/coins-flag-04.png';
import flagUs from './images/coins-flag-01.png';
import flagUk from './images/coins-flag-02.png';
import flagWaves from './images/waves_PNG_Transparent_2k_symbol.png';

import {KnownAssets} from '../../domain/assets';
import {totals, isFetching} from '../../redux/utility';
import {assetValueToString} from '../../domain/utility';

const styles = {
  card: {
    height: '100%'
  }
};

const renderBalance = (isFetching, assetBalance) => {
  if (isFetching) {
    return (<span>fetching...</span>);
  }
  return (<span>{assetValueToString(assetBalance.value, assetBalance.assetDecimals)} {assetBalance.assetName}</span>)
};

const Dashboard = (props) => {

  const { balances } = props;
  const waves = totals(balances, KnownAssets.Waves);
  const fetching = isFetching(balances);

  return (
  <div>
    <Toolbar
      title="DASHBOARD"
    />

    <div className="list">
      <div className="item">
        <Card style={styles.card}>
          {/*<CardTitle title="Waves Platform"/>*/}
          <CardHeader
            title="Waves Platform"
            subtitle="Subtitle"
            avatar={<Avatar src={ flagWaves } backgroundColor="transparent" />}
          />
          <CardText>
            TOTAL: {renderBalance(fetching, waves)}
          </CardText>
          <CardActions>
            <FlatButton
              label="SEND"
              icon={<SendIcon />}/>
          </CardActions>

        </Card>
      </div>
      <div className="item">
        <Card style={styles.card}>
          <CardHeader
            title="Australian Labour Hours"
            subtitle="Subtitle"
            avatar={flagAu}
          />
          {/*<CardTitle title="Australian Labour Hours"/>*/}
          <CardText>
            TOTAL: 1000 LHAU
          </CardText>
          <CardActions>
            <FlatButton
              label="SEND"
              icon={<FontIcon className="material-icons">send</FontIcon>}/>
          </CardActions>
        </Card>
      </div>
      <div className="item">
        <Card style={styles.card}>
          {/*<CardTitle title="US Labour Hours"/>*/}
          <CardHeader
            title="US Labour Hours"
            subtitle="Subtitle"
            avatar={flagUs}
          />
          <CardText>
            TOTAL: 1000 LHUS

          </CardText>
          <CardActions>
            <FlatButton
              label="SEND"
              icon={<FontIcon className="material-icons">send</FontIcon>}/>
          </CardActions>
        </Card>
      </div>
      <div className="item">
        <Card style={styles.card}>
          {/*<CardTitle title="British Labour Hours" />*/}
          <CardHeader
            title="British Labour Hours"
            subtitle="Subtitle"
            avatar={flagUk}
          />
          <CardText>
            TOTAL: 1000 LHGB
          </CardText>
          <CardActions>
            <FlatButton
              label="SEND"
              icon={<FontIcon className="material-icons">send</FontIcon>}/>
          </CardActions>
        </Card>
      </div>
    </div>

  </div>);
};

const mapStateToProps = (state) => {
  return {
    balances: state.balances
  };
};

export default connect(mapStateToProps, null)(Dashboard);
