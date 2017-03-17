import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Loading extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number
  };

  static defaultProps = {
    className: '',
    size: 2
  };

  render () {
    const { className, size } = this.props;
    const computedSize = size * 60;

    return (
      <div className={ [ className ].join(' ') }>
        <CircularProgress size={ computedSize } />
      </div>
    );
  }
}
