import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// components
import AllocationForm from './AllocationForm';
// actions
import { hideModal, addAllocation } from '../../../actions';
// styles
import './modal.css';

const Modals = (props) => {
  const { isOpen, type } = props.modalsData;

  const renderModalContent = () => {
    switch (type) {
      case 'ALLOCATION':
        return <AllocationForm {...props} />;
      default:
        return <AllocationForm {...props} />;
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
  addAllocation: bindActionCreators(addAllocation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
