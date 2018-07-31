import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import SelectOptions from './SelectOptions';

const SelectWrapper = (props) => {
  const {
    classes, multi, value: values, ...other
  } = props;

  const renderArrow = (arrowProps) => {
    const { isOpen } = arrowProps;

    return isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  };

  const selectedValues = multi ? JSON.parse(values) : values;

  return (
    <Select
      optionComponent={SelectOptions}
      noResultsText={<Typography>No results found</Typography>}
      arrowRenderer={arrowProps => renderArrow(arrowProps)}
      clearRenderer={() => <ClearIcon />}
      valueComponent={(valueProps) => {
        const { value, children, onRemove } = valueProps;

        const onDelete = (event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      value={selectedValues}
      multi={multi}
      {...other}
    />
  );
};

SelectWrapper.defaultProps = {
  value: '',
  multi: false,
};

SelectWrapper.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  value: PropTypes.string,
  multi: PropTypes.bool,
};

export default SelectWrapper;
