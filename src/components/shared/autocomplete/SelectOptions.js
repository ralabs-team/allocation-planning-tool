import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

class SelectOptions extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired, // eslint-disable-line
    children: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
  };

  handleClick = (event) => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const {
      children, isFocused, isSelected, onFocus,
    } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

export default SelectOptions;
