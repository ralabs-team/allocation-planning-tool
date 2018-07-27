import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';

import SelectWrapper from './SelectWrapper';
import autocompleteInlineStyles from './autocompleteInlineStyles';
import './autocomplete.css';

const IntegrationReactSelect = (props) => {
  const {
    classes, value, options, onChange, label, type,
    placeholder, required, multiple,
  } = props;

  const renderValidateText = () => {
    if (required && !value) {
      return (
        <FormHelperText
          classes={{ root: 'autocomplete__helper-text' }}
        >
          {`${label} is required`}
        </FormHelperText>
      );
    }

    return null;
  };

  /** TextField element expects value like string, number or array of strings */
  const valueStringified = JSON.stringify(value);

  return (
    <div className="autocomplete">
      {multiple ?
        <TextField
          fullWidth
          value={valueStringified}
          onChange={newValue => onChange(newValue, type)}
          placeholder={placeholder}
          name="react-select-chip-label"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapper,
            inputProps: {
              classes,
              multi: true,
              instanceId: 'react-select-chip-label',
              id: 'react-select-chip-label',
              options,
            },
          }}
        />
        :
        [
          <InputLabel
            key="label"
            classes={{ root: 'autocomplete__label' }}
            htmlFor="react-select-single"
          >
            {label}
          </InputLabel>,

          <Input
            key="input"
            fullWidth
            inputComponent={SelectWrapper}
            value={value}
            onChange={newValue => onChange(newValue, type)}
            placeholder={placeholder}
            id="react-select-single"
            inputProps={{
              classes,
              name: 'react-select-single',
              instanceId: 'react-select-single',
              simpleValue: true,
              options,
            }}
          />,
        ]
      }

      {renderValidateText()}
    </div>
  );
};

IntegrationReactSelect.defaultProps = {
  required: false,
  multiple: false,
  placeholder: '',
  value: '',
  type: '',
};

IntegrationReactSelect.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
};

export default withStyles(autocompleteInlineStyles)(IntegrationReactSelect);
