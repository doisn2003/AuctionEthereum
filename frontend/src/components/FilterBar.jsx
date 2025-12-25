import React from 'react';

const FilterBar = () => {
  return (
    <div className="filter-bar-wrapper">
      <div className="container filter-content">
        <div className="chips-container">
          <button className="chip active">
            <span className="material-symbols-outlined">visibility</span>
            <span>Tất cả</span>
          </button>
          <button className="chip">
            <span className="material-symbols-outlined">directions_car</span>
            <span>Biển số xe</span>
          </button>
          <button className="chip">
            <span className="material-symbols-outlined">devices</span>
            <span>Số điện thoại</span>
          </button>
        </div>
        
        <div className="filter-search">
            <div className="search-icon">
                <span className="material-symbols-outlined">filter_list</span>
            </div>
          <input className="filter-input" placeholder="Tìm kiếm..." />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;