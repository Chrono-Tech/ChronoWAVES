import React from 'react';
import {CopyIcon} from '../Icons';
import IconButton from 'material-ui/IconButton';

const styles = {
  button: {
    width: 16,
    height: 16,
  },
  icon: {
    padding: '0',
    width: 16,
    height: 16,
  }
};

const CopyToClipboard = () => {
  return (
    <IconButton style={ styles.button } iconStyle={ styles.icon }>
      <CopyIcon />
    </IconButton>
  );
};

export default CopyToClipboard;
