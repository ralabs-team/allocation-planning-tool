import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const InputFilter = (props) => {
  const handleInputChange = (event) => {
    props.handleChange(event.target.value.toLowerCase());
  };

  return (
    <div className="input-filter">
      <TextField
        id="filter"
        label="Filter"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
    </div>
  );
};

InputFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default InputFilter;
