import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const PopUp = (props) => {
  const {
    classes,
    onClose,
    onAgree,
    data,
    ...other
  } = props;

  const agreeHandler = () => {
    const { group, time } = data;
    onAgree(group, time);
    onClose();
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">Schedule on a day off?</DialogTitle>
      <div className="buttons-container">
        <Button
          className="button green"
          variant="contained"
          onClick={agreeHandler}
        >
          YES
        </Button>
        <Button
          className="button purple"
          variant="contained"
          onClick={onClose}
        >
          CANCEL
        </Button>
      </div>
    </Dialog>
  );
};

PopUp.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  data: PropTypes.object.isRequired, // eslint-disable-line
  onAgree: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopUp;

