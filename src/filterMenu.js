import './App.css';
const  Filter = ({
    filterOptions,
    displayFilterMenu,
    showFilterMenu,
    categoryList,
    addFilters,
    applyFilters
}) =>{
  
  return (
   
        <div className="filterMenuDiv">
          <button onClick={displayFilterMenu} className="filterSelectbutton">Filter</button>
          {showFilterMenu&&<div className="filterMenu">
            
          <form>
          {categoryList.map((category)=>{
            return(
            <div>
                <label class="filterLabel">
                <input
                name={category}
                value={category}
                type="checkbox"
                checked={filterOptions.indexOf(category)>=0?true:false}
                onChange={addFilters} />  
            {category}
            </label>
            </div>
            )})}
            </form>
          <div style={{display: 'flex'}}>
            <button onClick={applyFilters} className="applyFilterbutton">Apply</button>
          </div>
          </div>}
        </div>
  );
}

export default Filter;
