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
    classes, handleChange, items, type, selectedValue, valueProperty,
    labelProperty, inputLabel, required, placeholder,
  } = props;

  const suggest = items.map(suggestion => ({
    value: suggestion[valueProperty],
    label: suggestion[labelProperty],
  }));

  const renderValidateText = () => {
    if (required && !selectedValue) {
      return (
        <FormHelperText
          classes={{ root: 'autocomplete__helper-text' }}
        >
          {`${inputLabel} is required`}
        </FormHelperText>
      );
    }

    return null;
  };

  return (
    <div className="autocomplete">
      {props.multiple ?
        <TextField
          fullWidth
          value={selectedValue}
          onChange={value => handleChange(type, value)}
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
              simpleValue: true,
              options: suggest,
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
            {inputLabel}
          </InputLabel>,

          <Input
            key="input"
            fullWidth
            inputComponent={SelectWrapper}
            value={selectedValue}
            onChange={value => handleChange(type, value)}
            placeholder={placeholder || `Search a ${type}`}
            id="react-select-single"
            inputProps={{
              classes,
              name: 'react-select-single',
              instanceId: 'react-select-single',
              simpleValue: true,
              options: suggest,
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
  selectedValue: '',
  multiple: false,
  placeholder: '',
};

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired, //eslint-disable-line
  handleChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired, //eslint-disable-line
  type: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  valueProperty: PropTypes.string.isRequired,
  labelProperty: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default withStyles(autocompleteInlineStyles)(IntegrationReactSelect);
