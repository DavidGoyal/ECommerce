import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updateAdminProduct, getProductDetails } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';
import Sidebar from "./Sidebar"
import {UPDATE_PRODUCT_RESET} from "../../constants/productConstants"
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SpellCheckIcon from '@mui/icons-material/SpellCheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import "./NewProduct.css"
import Metadata from '../Metadata';

const UpdateProduct = () => {
    const dispatch=useDispatch()
    const alert=useAlert();
    const navigate=useNavigate();
    const params=useParams();

    const id=params.id;

    const {product,error:fetchError}=useSelector(state=>state.productDetails)

    const categories=[
        "Laptop",
        "Footwear",
        "Bottoms",
        "Tops",
        "Attire",
        "SmartPhones",
        "Cameras"
    ]

    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [stock,setStock]=useState(1);
    const [images,setImages]=useState([]);
    const [oldImages,setOldImages]=useState([]);
    const [imagesPreview,setImagesPreview]=useState([]);


    const {loading,success,error}=useSelector(state=>state.newProduct)

    const handleSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        images.forEach((image)=>{
            myForm.append("images", image);
        })

        dispatch(updateAdminProduct(params.id,myForm));
    }

    const createProductImagesChange=(e)=>{
        const file=Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        file.forEach((image)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagesPreview((old)=>[...old,reader.result])
                    setImages((old)=>[...old,reader.result])
                }
            }
            reader.readAsDataURL(image)
        })

    }

    useEffect(() => {
      if(product && product._id != id){
        dispatch(getProductDetails(id))
      }else if(product){
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setStock(product.stock);
        setOldImages(product.images);
      }
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(fetchError){
        alert.error(fetchError)
        dispatch(clearErrors())
      }
      if(success){
        alert.success("Product Updated Successfully")
        navigate("/admin/products")
        dispatch({type:UPDATE_PRODUCT_RESET})
      }

    }, [dispatch,alert,error,success,navigate,fetchError,id])
    

  return (
    <>
    <Metadata title="ECommerce Admin Update Product"/>
    {loading?<Loader/>:
    <>
        <div className="dashboard">
            <Sidebar/>

            <div className="newProductContainer">
                <form className="createProductForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1>Update Product</h1>
                    <div>
                        <SpellCheckIcon/>
                        <input type="text" placeholder="ProductName" required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div>
                        <AttachMoneyIcon/>
                        <input type="number" placeholder="Price" required value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                    <div>
                        <DescriptionIcon/>
                        <textarea
                        placeholder='Product Description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        cols={"30"}
                        rows={"1"}
                        ></textarea>
                    </div>
                    <div>
                        <AccountTreeIcon/>
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate)=>(
                                <option key={cate} value={cate}>{cate}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon/>
                        <input type="number" placeholder="Stock" required value={stock} onChange={(e)=>setStock(e.target.value)}/>
                    </div>
                    <div id="createProductFormFile">
                        <input type="file" name="avatar" accept="image/*" multiple onChange={createProductImagesChange}/>
                    </div> 
                    <div id="createProductFormImage">
                        {oldImages.map((image,index)=>(
                            <img key={index} src={image.url} alt="Old Product" />
                        ))}
                    </div>
                    <div id="createProductFormImage">
                        {imagesPreview.map((image,index)=>(
                            <img key={index} src={image} alt="Product" />
                        ))}
                    </div>
                    <Button
                        id='createProductBtn'
                        type='submit'
                        disabled={loading ? true : false}
                        className='createProductBtn'
                    >Update</Button>
                </form>
            </div>
        </div>
    </>}
    </>
  )
}

export default UpdateProduct