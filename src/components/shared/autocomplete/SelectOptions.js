import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

class SelectOptions extends Component {
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
