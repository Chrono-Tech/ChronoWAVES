import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue600} from 'material-ui/styles/colors';

const chronoTheme = getMuiTheme({
  palette: {
    accent1Color: '#e2a864',
    // textColor: '#161240',
    primary1Color: '#17579c',
  },
  // appBar: {
  //   height: 57,
  //   color: '#161240'
  // },
  // drawer: {
  //   width: 230,
  //   color: '#161240'
  // },
  raisedButton: {
    primaryColor: blue600,
  }
});

export default chronoTheme;
