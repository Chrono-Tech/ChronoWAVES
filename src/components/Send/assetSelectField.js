import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {SelectField} from 'redux-form-material-ui';
import MenuItem  from 'material-ui/MenuItem';
import {assetValueToString} from '../../domain/utility';
import './assetSelectField.css';


class AssetSelectField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, floatingLabelText, balances, validate} = this.props;

    return (
      <Field name={ name } component={ SelectField } className="assetSelect" floatingLabelText={ floatingLabelText }
             fullWidth={true} validate={validate}>
        {
          balances.map(asset => {
            const value = assetValueToString(asset.value, asset.assetDecimals);

            const label = (
              <div className="asset">
                <div className="assetName">
                  { asset.assetName }
                </div>
                <div className="assetBalance">
                  { value }<small> { asset.assetName }</small>
                </div>
              </div>
            );

            return (
              <MenuItem key={ asset.assetId }
                        value={ asset.assetId }
                        label={ label }>
                { label }
              </MenuItem>);
          })
        }
      </Field>
    );
  }
}

AssetSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  balances: PropTypes.array.isRequired,
  validate: PropTypes.array.isRequired,
};

export default AssetSelectField;
