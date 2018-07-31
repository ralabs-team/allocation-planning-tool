import React from 'react';
import PropTypes from 'prop-types';
import SortIcon from '@material-ui/icons/Sort';
import Tooltip from '@material-ui/core/Tooltip';

import Autocomplete from '../../shared/autocomplete/Autocomplete';

const SearchPanel = (props) => {
  const onAutocompleteSelect = (searchValues) => {
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
    value: item._id,
    label: `${item.firstName} ${item.lastName}`,
    type: 'employees',
  }));

  const projects = props.projects.map(item => ({
    value: item._id,
    label: item.title,
    type: 'projects',
  }));
  const suggested = [...employees, ...projects];

  return (
    <div className="search-panel">
      <div className="search-panel__sort">
        <Tooltip
          classes={{ popper: 'tooltip-sort__popover', tooltip: 'tooltip-sort__tooltip' }}
          title="Sort by Last Name"
          placement="top"
        >
          <SortIcon onClick={props.reverseSort} />
        </Tooltip>
      </div>

      <div className="search-panel__autocomplete">
        <Autocomplete
          value={props.searchData.searchValues}
          options={suggested}
          onChange={onAutocompleteSelect}
          label="Search"
          placeholder="People and projects"
          multiple
        />
      </div>
    </div>
  );
};

SearchPanel.propTypes = {
  projects: PropTypes.array.isRequired, // eslint-disable-line
  employees: PropTypes.array.isRequired, // eslint-disable-line
  setSearch: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired, // eslint-disable-line
  reverseSort: PropTypes.func.isRequired,
};

export default SearchPanel;
