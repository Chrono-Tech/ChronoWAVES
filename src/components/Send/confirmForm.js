import React, {PropTypes} from 'react';

class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transaction } = this.props;

    return (<div>
      Confirm Form
      { JSON.stringify(transaction) }
    </div>);
  }

}

ConfirmForm.propTypes = {
  transaction: PropTypes.object
};

export default ConfirmForm;
