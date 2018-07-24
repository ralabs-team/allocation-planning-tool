import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// components
import AllocationForm from './AllocationForm';
// actions
import { hideModal, addAllocation, changeAllocations } from '../../../actions';
// styles
import './modal.css';

const Modals = (props) => {
  const { isOpen, type, data } = props.modalsData;

  const renderModalContent = () => {
    switch (type) {
      case 'ALLOCATION':
        return <AllocationForm {...props} />;
      default:
        return <AllocationForm {...props} />;
    }
  };

  const classes = {
    root: 'modal-wrapper',
    paperWidthSm: 'modal-body',
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={props.hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={classes}
      >
        <DialogContent>
          {data && renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

Modals.propTypes = {
  modalsData: PropTypes.object.isRequired, // eslint-disable-line
  hideModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalsData: state.modals,
  projects: state.projects.allProjects,
  allocations: state.allocations.allAllocations,
});

const mapDispatchToProps = dispatch => ({
  hideModal: bindActionCreators(hideModal, dispatch),
  addAllocation: bindActionCreators(addAllocation, dispatch),
  changeAllocations: bindActionCreators(changeAllocations, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
