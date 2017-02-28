import React, {PropTypes} from 'react';
import {SendIcon, BackIcon} from '../Icons';
import FlatButton from 'material-ui/FlatButton';

class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, transaction, previousPage } = this.props;

    return (<form onSubmit={ handleSubmit }>
      <div>
        {JSON.stringify(transaction)}
      </div>

      <div>
        <FlatButton
          label="BACK"
          icon={<BackIcon />}
          onClick={ previousPage }/>

        <FlatButton
          type="submit"
          label="CONFIRM"
          icon={<SendIcon />}/>
      </div>
    </form>);
  }

}

ConfirmForm.propTypes = {
  transaction: PropTypes.object
};

export default ConfirmForm;
