import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import { setPrevMonth, setNextMonth } from '../../actions';

const Control = (props) => {
  const value = 1000 * 60 * 60 * 24 * 2;
  return (
    <div className="control-panel">
      <Button variant="fab" color="primary" aria-label="Add" onClick={() => props.setZoom(value)}>
        <ZoomInIcon className="icon" />
      </Button>
      <Button variant="fab" color="primary" aria-label="Add" onClick={() => props.setZoom(-value)}>
        <ZoomOutIcon className="icon" />
      </Button>
      <Button variant="fab" color="primary" aria-label="Add" onClick={props.setPrevMonth}>
        <ArrowBackIcon className="icon" />
      </Button>
      <Button variant="fab" color="primary" aria-label="Add" onClick={props.setNextMonth}>
        <ArrowForwardIcon className="icon" />
      </Button>
    </div>
  );
};

Control.propTypes = {
  setPrevMonth: PropTypes.func.isRequired,
  setNextMonth: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  setPrevMonth: () => dispatch(setPrevMonth()),
  setNextMonth: () => dispatch(setNextMonth()),
});

export default connect(null, mapDispatchToProps)(Control);
