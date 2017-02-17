import React, {PropTypes} from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


const Balances = (props) => (
  <div style={ styles.wrapper }>
    {
      props.balances.map(b => (
        <Chip style={ styles.chip } key={ b.name }>{ b.value } { b.name }</Chip>
      ))
    }
  </div>
);

Balances.propTypes = {
  balances: PropTypes.isArray
};

export default Balances;
