/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import SelectWrapper from './SelectWrapper';

import './autocomplete.css';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 80,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

const IntegrationReactSelect = (props) => {
  const {
    classes, handleChange, items, type, selectedValue,
    valueProperty, labelProperty, inputLabel, required,
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
      <InputLabel
        classes={{ root: 'autocomplete__label' }}
        htmlFor="react-select-single"
      >
        {inputLabel}
      </InputLabel>

      <Input
        fullWidth
        inputComponent={SelectWrapper}
        value={selectedValue}
        onChange={value => handleChange(type, value)}
        placeholder={`Search a ${type}`}
        id="react-select-single"
        inputProps={{
          classes,
          name: 'react-select-single',
          instanceId: 'react-select-single',
          simpleValue: true,
          options: suggest,
        }}
      />

      {renderValidateText()}
    </div>
  );
};

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired, //eslint-disable-line
};

export default withStyles(styles)(IntegrationReactSelect);
