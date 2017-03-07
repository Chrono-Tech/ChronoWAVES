import React, {PropTypes} from 'react';
import {SendIcon, BackIcon} from '../Icons';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';

class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, transaction, previousPage } = this.props;

    return (<form onSubmit={ handleSubmit }>
      <Card>
        <CardText>
          {JSON.stringify(transaction)}
        </CardText>
        <CardActions>
          <FlatButton
            label="BACK"
            icon={<BackIcon />}
            onClick={ previousPage }/>

          <FlatButton
            type="submit"
            label="CONFIRM"
            icon={<SendIcon />}/>
        </CardActions>
      </Card>
    </form>);
  }
}

ConfirmForm.propTypes = {
  transaction: PropTypes.object
};

export default ConfirmForm;
