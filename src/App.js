import {useState} from 'react';
import './App.css';
import Filter from './filterMenu.js'
import Data from './productList.json';
import AppliedFilters from './filterBreadcrumbs.js';
function App() {
  const [currentIndex,setCurrentIndex] = useState(0);
  const [productList,setProductList] = useState(Data||[]);
  const [showFilterMenu,setShowFilterMenu] = useState(false);
  const [filterOptions,setFilterOptions] = useState([]);
  const [appliedFilters,setappliedFilters] = useState([]);
  const categoryList =["Cloth","Footwear","Toys","Gadgets","Home Appliances","Crafts"]
  let carouselProductlist = [];
  const carouselPreviousView=()=>{
    if(currentIndex!=0){
      setCurrentIndex(currentIndex-1);
    }
    else{
      setCurrentIndex(productList.length - 1);
   
    }
  }
  const displayFilterMenu = ()=>{
    setShowFilterMenu(!showFilterMenu)

  }
  const addFilters = (e)=>{
    let filters = filterOptions;
    let position = filters.indexOf(e.target.value);
    if(position === -1){
      filters.push(e.target.value)
      setFilterOptions([...filters])
    }else{
      filters.splice(position,1)
      setFilterOptions([...filters])
    }
  }
  const removeFilters = (item)=>{
    let filters = filterOptions;
    let position = filters.indexOf(item);
    filters.splice(position,1)
    setFilterOptions([...filters])
    applyFilters();
  }
  const resetFilters = ()=>{
    setProductList([...Data])
    setFilterOptions([])
  }
  const carouselNextView=()=>{
    if(currentIndex+1==productList.length){
      setCurrentIndex(0);
    }
    else
    {
      setCurrentIndex(currentIndex+1);
      }
  }
  const applyFilters=()=>{
    setShowFilterMenu(false);
    let filteringList = Data;
    if(filterOptions.length>0){
      filteringList= filteringList.filter(e=>filterOptions.includes(e.productCategory));
    }
    setProductList([...filteringList])
    setCurrentIndex(0);
    setappliedFilters([...filterOptions]);
  }
  const ProductDetailDiv = (props)=>{
    return(<div   className={`cardComponentImage ${props.index===1?'focusImage':''}` } style={{ backgroundImage:`url(${productList[props.itemIndex].productImage})` }} >
         
          <div className="productDetails">
            <h3>{productList[props.itemIndex].productName}</h3>
            <h4>{productList[props.itemIndex].productCategory}</h4>
            <h5>{productList[props.itemIndex].productPrice}</h5>
            </div></div>
    )}
  for (let i=0;i<3;i++){
    carouselProductlist.push(
        <div className="cardComponent">
            {(i+currentIndex)>=productList.length?
            <ProductDetailDiv  index={i} itemIndex={i-(productList.length-currentIndex)}/>:
            currentIndex>productList.length?<ProductDetailDiv index={i} 
            itemIndex={productList.length-currentIndex}/>:
            <ProductDetailDiv index={i} itemIndex={i+currentIndex}/>}
        </div>
      )
  }
  return (
    <div className="App">
      <div className="headerComponent">

      </div>
      <div className="filterSection">
        <Filter filterOptions={filterOptions}
          showFilterMenu={showFilterMenu}
          categoryList={categoryList}
          addFilters={addFilters}
          applyFilters={applyFilters}
          displayFilterMenu={displayFilterMenu}/>
        <div className="inlineData hearderFilterText">Total {productList.length} are listed for {(filterOptions.length!==0&&productList.length!==Data.length)?
        <AppliedFilters filterOptions={appliedFilters} removeFilters={removeFilters} resetFilters={resetFilters}/>:
        <strong style={{marginLeft:'2px'}}> All Catgroies</strong>}</div>
      </div>
      {productList.length>0?
      <div className="carouselComponent">
        <div className="carouselPrevious" >
          <button onClick={carouselPreviousView}className="previous">
            <span className="">
              {'<'}
            </span>
          </button>
        </div>
        <div  style={{display: 'flex',margin:'auto'}}>
        {carouselProductlist}
        </div>
        <div className="carouselNext" >
          <button className="next" onClick={carouselNextView}>
            <span>
            {'>'}
            </span>
          </button>
        </div>
      </div>:
        <div>
          <h4>Sorry!!! No products available.</h4>
        </div>
        }
    </div>
  );
}

export default App;
