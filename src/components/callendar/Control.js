import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { setPrevMonth, setNextMonth } from '../../actions';

const Control = (props) => {
  return (
    <div className="control-panel">
      <Button variant="fab" color="primary" aria-label="Add" onClick={props.setNextMonth}>
        <AddIcon />
      </Button>
      <Button variant="fab" color="primary" aria-label="Add" onClick={props.setPrevMonth}>
        <AddIcon />
      </Button>
    </div>
  );
};

Control.propTypes = {
  setPrevMonth: PropTypes.number.isRequired,
  setNextMonth: PropTypes.number.isRequired,
};
const mapDispatchToProps = dispatch => ({
  setPrevMonth: () => dispatch(setPrevMonth()),
  setNextMonth: () => dispatch(setNextMonth()),
});

export default connect(null, mapDispatchToProps)(Control);
