import React, {PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';

import blockies from 'blockies';
import {blue200} from 'material-ui/styles/colors';

class IdentityIcon extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const icon = blockies({seed: this.props.address, bgcolor: blue200}).toDataURL();

    return (
      <Avatar src={ icon } />
    );
  }
}

IdentityIcon.propTypes = {
  address: PropTypes.string.isRequired
};

export default IdentityIcon;
