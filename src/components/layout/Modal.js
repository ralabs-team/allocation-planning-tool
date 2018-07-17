import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// actions
import { hideModal } from '../../actions';

const Modals = (props) => {
  const { isOpen, type, employee } = props.modalsData;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={props.hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{type}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {employee && `${employee.firstName} ${employee.lastName}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hideModal} color="primary">
            Disagree
          </Button>
          <Button onClick={props.hideModal} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  modalsData: state.modals,
});

const mapDispatchToProps = dispatch => ({
  hideModal: bindActionCreators(hideModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
