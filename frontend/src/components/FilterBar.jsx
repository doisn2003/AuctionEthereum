import React from 'react';

const FilterBar = () => {
  return (
    <div className="filter-bar-wrapper">
      <div className="container filter-content">
        <div className="chips-container">
          <button className="chip active">
            <span className="material-symbols-outlined">visibility</span>
            <span>All</span>
          </button>
          <button className="chip">
            <span className="material-symbols-outlined">palette</span>
            <span>Art</span>
          </button>
          <button className="chip">
            <span className="material-symbols-outlined">directions_car</span>
            <span>Vehicles</span>
          </button>
          <button className="chip">
            <span className="material-symbols-outlined">diamond</span>
            <span>Jewelry</span>
          </button>
          <button className="chip">
            <span className="material-symbols-outlined">devices</span>
            <span>Electronics</span>
          </button>
        </div>
        
        <div className="filter-search">
            <div className="search-icon">
                <span className="material-symbols-outlined">filter_list</span>
            </div>
          <input className="filter-input" placeholder="Filter by lot number or keyword..." />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;