import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createAdminProduct } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';
import Sidebar from "./Sidebar"
import {CREATE_PRODUCT_RESET} from "../../constants/productConstants"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SpellCheckIcon from '@mui/icons-material/SpellCheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import "./NewProduct.css"
import Metadata from '../Metadata';

const NewProduct = () => {
    const dispatch=useDispatch()
    const alert=useAlert();
    const navigate=useNavigate();

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

        dispatch(createAdminProduct(myForm));
    }

    const createProductImagesChange=(e)=>{
        const file=Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }

      if(success){
        alert.success("Product Created Successfully")
        navigate("/admin/dashboard")
        dispatch({type:CREATE_PRODUCT_RESET})
      }

    }, [dispatch,alert,error,success,navigate])
    

  return (
    <>
    <Metadata title="ECommerce Admin New Product"/>
    {loading?<Loader/>:
    <>
        <div className="dashboard">
            <Sidebar/>

            <div className="newProductContainer">
                <form className="createProductForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1>Create Product</h1>
                    <div>
                        <SpellCheckIcon/>
                        <input type="text" placeholder="ProductName" required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div>
                        <AttachMoneyIcon/>
                        <input type="number" placeholder="Price" required onChange={(e)=>setPrice(e.target.value)}/>
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
                        <select onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate)=>(
                                <option key={cate} value={cate}>{cate}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon/>
                        <input type="number" placeholder="Stock" required onChange={(e)=>setStock(e.target.value)}/>
                    </div>
                    <div id="createProductFormFile">
                        <input type="file" name="avatar" accept="image/*" multiple onChange={createProductImagesChange}/>
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
                    >Create</Button>
                </form>
            </div>
        </div>
    </>}
    </>
  )
}

export default NewProduct