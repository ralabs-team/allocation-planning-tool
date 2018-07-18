import React from 'react';
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
  const { classes, ...other } = props;

  const renderArrow = (arrowProps) => {
    const { isOpen } = arrowProps;

    return isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  };

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
      {...other}
    />
  );
};

export default SelectWrapper;
