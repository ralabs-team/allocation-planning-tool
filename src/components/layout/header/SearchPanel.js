import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '../../shared/autocomplete/Autocomplete';

class SearchPanel extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired, // eslint-disable-line
    employees: PropTypes.array.isRequired, // eslint-disable-line
  }

  state = {
    searchValue: '',
  }

  handleAutocompleteSelect = (type, searchValue) => {
    this.setState({ searchValue }, () => {
      console.log('state', this.state);
    });
  }

  render() {
    const employees = this.props.employees.map(item => ({
      _id: item._id,
      title: `${item.firstName} ${item.lastName}`,
    }));
    const suggested = [...employees, ...this.props.projects];

    return (
      <div className="search-panel">
        <Autocomplete
          handleChange={this.handleAutocompleteSelect}
          items={suggested}
          type="peaple and project"
          selectedValue={this.state.searchValue}
          valueProperty="_id"
          labelProperty="title"
          inputLabel="Search"
          placeholder="Search"
          multiple
        />
      </div>
    );
  }
}

export default SearchPanel;
