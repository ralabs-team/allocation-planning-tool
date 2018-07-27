import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '../../shared/autocomplete/Autocomplete';

const SearchPanel = (props) => {
  const handleAutocompleteSelect = (searchValues) => {
    const searchData = searchValues.reduce((tally, item) => {
      const { value, type } = item;

      if (!tally[`${type}Ids`]) {
        tally[`${type}Ids`] = [value]; /* eslint no-param-reassign: ["error", { "props": false }] */
      } else {
        tally[`${type}Ids`].push(value);
      }

      return tally;
    }, { searchValues });

    props.setSearch(searchData);
  };

  const employees = props.employees.map(item => ({
    _id: item._id,
    title: `${item.firstName} ${item.lastName}`,
    type: 'employees',
  }));

  const projects = props.projects.map(item => ({
    _id: item._id,
    title: item.title,
    type: 'projects',
  }));
  const suggested = [...employees, ...projects];

  return (
    <div className="search-panel">
      <Autocomplete
        handleChange={handleAutocompleteSelect}
        items={suggested}
        type="peaple and project"
        selectedValue={props.searchData.searchValues}
        valueProperty="_id"
        labelProperty="title"
        inputLabel="Search"
        placeholder="Search"
        multiple
      />
    </div>
  );
};

SearchPanel.propTypes = {
  projects: PropTypes.array.isRequired, // eslint-disable-line
  employees: PropTypes.array.isRequired, // eslint-disable-line
  setSearch: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired, // eslint-disable-line
};

export default SearchPanel;
