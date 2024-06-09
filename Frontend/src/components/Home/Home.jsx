import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Metadata from "../Metadata"
import {clearErrors, getAllProducts} from "../../actions/productActions"
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react"
import Loader from "../Loader/Loader"
import {useAlert} from "react-alert" 
import ProductCard from "./ProductCard"


const Home = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,products} =useSelector(state=>state.products);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts())
  }, [dispatch, error,alert])
  


  return (
    <>
        <Metadata title="Online Shopping Site in India - Buy mobiles, laptops, cameras, attires, tops, and shoes."/>

        {loading?<Loader/>:
        <>


          <div className="banner">
              <p>Welcome to ECommerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>

              <a href="#container">
                  <button>Scroll<CgMouse/></button>
              </a>
          </div>


          <h2 className="homeHeading">Featured Products</h2>


          <div className="container" id="container">
            {products&&products.map((product)=><ProductCard key={product._id} product={product}/>)}
          </div>
        </>
        }

    </>
  )
}

export default Home