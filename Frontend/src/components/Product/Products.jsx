import "./Products.css"
import {useSelector,useDispatch} from "react-redux"
import {clearErrors, getAllProducts} from "../../actions/productActions.js"
import Loader from "../Loader/Loader"
import ProductCard from "../Home/ProductCard.jsx"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
import {useAlert} from "react-alert"
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Metadata from "../Metadata.jsx"


const Products = () => {
  const dispatch=useDispatch()
  const alert=useAlert();
  const {loading,products,error,resultPerPage,filteredProductsCount}=useSelector(state=>state.products)

  const [currentPage,setCurrentPage]=useState(1)
  const [price,setPrice]=useState([0,25000])
  const [category,setCategory]=useState("")
  const [rating,setRating]=useState(0)


  const categories=[
    "Laptop",
    "Footwear",
    "Bottoms",
    "Tops",
    "Attire",
    "SmartPhones",
    "Cameras"
  ]

  const params=useParams();
  const keyword=params.keyword;

  const setCurrentPageNo=(event,value)=>{
    setCurrentPage(value)
  }

  const priceHandler=(event, newPrice)=>{
    setPrice(newPrice)
  }


  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts(keyword,currentPage,price,category,rating))
  },[dispatch,keyword,currentPage,error,alert,price,category,rating])

  return (
    <>
      <Metadata title="ECommerce All Products"/>

      {loading?<Loader/>:
      <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products && products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>


          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category)=>(
                  <li
                    className="category-link"
                    key={category}
                    onClick={()=>setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={rating}
                  onChange={(event, newRating) => {
                    setRating(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>

          </div>

          {resultPerPage<filteredProductsCount && 
            <div className="paginationBox">
            <Pagination
              count={Math.ceil(filteredProductsCount/resultPerPage)}
              variant="outlined" 
              shape="rounded"
              onChange={setCurrentPageNo}
              size="large"
              page={currentPage}
            />
          </div>}
      </>
      
      }
    </>
  )
}

export default Products