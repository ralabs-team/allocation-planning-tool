import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// components
import TaskForm from './TaskForm';
// actions
import { hideModal } from '../../actions';
// styles
import './modal.css';

const Modals = (props) => {
  const { isOpen, type, employee } = props.modalsData;

  const renderModalContent = () => {
    switch (type) {
      case 'TASK':
        return <TaskForm {...props} />;
      default:
        return <TaskForm {...props} />;
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={props.hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  modalsData: state.modals,
  projects: state.projects.allProjects,
});

const mapDispatchToProps = dispatch => ({
  hideModal: bindActionCreators(hideModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
