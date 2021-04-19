import './App.css';
const  FilterOptions = ({
    filterOptions,
    removeFilters,
    resetFilters
}) =>{
  return (
        <div className=" inlineData">
          {filterOptions.map((filter)=>{
             return (<div className="breadcrumbsOption">
                  {filter}
                  <button onClick={()=>removeFilters(filter)}>x</button>
              </div>)
          })}
          {filterOptions.length>1&&
          <div className="breadcrumbsOption">
                  <button onClick={resetFilters}>Reset Filters</button>
            </div>}
        </div>
  );
}

export default FilterOptions;
