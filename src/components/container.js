import React from 'react';

const styles = {
  container: {
    flex: '1',
    padding: '0em',
    height: '100%'
  },

  card: {
    backgroundColor: 'transparent !important',
    borderRadius: '0 !important',
    height: '100%',
    position: 'relative',
    overflow: 'auto',
    padding: '1.5em'
  }
};

export default class Container extends React.Component {

  render() {
    return (
      <div style={styles.container}>
          {this.props.children}
      </div>
    );
  }
}
