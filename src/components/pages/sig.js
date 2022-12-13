import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import swal from 'sweetalert';
import Register from "../Register/Sign-up";
import './home.css'

const Home = () =>{
    const {state} = useLocation();
    localStorage.setItem('name',state.result.username);
    const navigate = useNavigate();
    const[logout,setLogout] = useState('');
    const[product, setProduct] = useState('');
    const [category,setCategory] = useState('');
    console.log('statue',state.result)

    // user sigout
    const signout = () =>{
        let uuid = state.result.uuid
        axios.post(`http://localhost:8080/user/Logout?uuid=${uuid}`).then(result=>{
            console.log('result',result.data.status)
            if(result.data.status == "success"){
                swal({
                    title: "LOGOUT SUCCESS!",
                    text: "THANKS",
                    icon: "success",
                    button: "OK",
                  });
                  setLogout(result);
            }  
        }).catch(err=>{
            console.log('err',err.message)
            swal("userName and password is Wrong!");

        })
    }

    // get all product in  database
    const Allproduct = () =>{
        axios.get('http://localhost:8080/product/getAll',{headers:{"token":localStorage.getItem("token")}})
        .then(items =>{
            console.log('product',items.data.result);
          setProduct(items)
          if(product){
            console.log('success');
            navigate('/product',{state:items.data})
          }

        }).catch(err=>{
            console.log('err',err.message)
        })
    }


//    coategory-bassed product
    // const categoryDetails = () =>{
    //     axios.get('http://localhost:8080/product/categoryBassed').then(result=>{
    //         console.log('category',result.data.result);
    //         setCategory(result.data);
    //         //navigate('/product',{state:result.data})
    //     }).catch(err=>{
    //         console.log('err',err.message);
    //     })
    // }

    useEffect(()=>{
        axios.get('http://localhost:8080/product/categoryBassed').then(result=>{
            console.log('category',result.data);
            setCategory(result.data);
        }).catch(err=>{
            console.log('err',err.message);
        })
    },[])

    
if(logout){
    return(
        <>
        <Register/>
        </>
    )
}else{

  
    
    return(
        <>
        
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="Search" aria-label="Search"/>
                   <button class=" btn2" type="submit">&#128269;</button>      
                </form>
                       <span className="navclick" onClick={Allproduct}>product</span>
                        {/* <Link to = {'/signup'}  onClick={signout} className = 'navbar-brand'>
                        Logout
                        </Link>   */}
                        {/* <button type="button" onClick={categoryDetails}>category</button> */}
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{state.result.username}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={signout}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>
        {/* home  */}
        <div className="cover">
            <div className="container-fluid">
                {/* {
                    category.result.map((detail,index)=>{
                        console.log('data',detail.uuid)

                        return(<>
                     <div className="category" >
                    <div className="type" >
                    <img src={detail.Image}/>
                   <i> <h6>{detail.Category}</h6> </i>
                    </div>
                </div>

                        </>)
                    })
                } */}
            
            <div className="slideShow">
                <div className="slid-frame">
                    </div>
                     </div></div> </div>

                     <div className="off">
                        <img src="https://static1.lenskart.com/media/desktop/img/Apr22/Bannerforexport.jpg"/>
                     </div><br></br>
                     <h3>WEAR THE TRENDING</h3>
                <div className="trend">
                    
                    <div className="product">
                        <img src="https://static1.lenskart.com/media/desktop/img/Sep21/image179.png"/>
                        <h4>Round</h4>
                        <button>Explore</button>
                    </div>
                    <div className="product">
                        <img src="https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg"/>
                        <h4>Cat-Eye</h4>
                        <button>Explore</button>
                    </div>
                    <div className="product">
                        <img src="https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg"/>
                        <h4>Clubmaster</h4>
                        <button>Explore</button>
                    </div>
                    <div className="product">
                        <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                        <h4>Transparent</h4>
                        <button>Explore</button>
                    </div>
                    <div className="product">
                        <img src="https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg"/>
                        <h4>Blend Edit</h4>
                        <button>Explore</button>
                    </div>
                    <div className="product">
                        <img src="https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg"/>
                        <h4>Air Flex</h4>
                        <button>Explore</button>
                    </div>
                </div>
                <div className="off">
                    <img src='https://static1.lenskart.com/media/desktop/img/June22/27thjune/1920x200.jpg'/>
                </div>

                <div className="view">
                <div className="line"><h3><span>AS Seen On TV : Aqualens Contect Lenses</span></h3></div>
                <div className="gif">
                <img src="https://static1.lenskart.com/media/desktop/img/June22/aqualense-as-seen-web.gif"/>
                </div>
                <div className="line"><h3><span>FIND THE PERFECT FIT</span></h3></div>
                <div className="flex">
                <img src=""/>
                </div>
                </div>


                


       
        </>
    )}
}









import React, { version } from "react";
import { BrowserRouter as Router,Routes,Route,Link, useLocation,style, useNavigate} from 'react-router-dom';
import axios  from "axios";
import swal from 'sweetalert';

const Productdetails = () =>{
const {state} = useLocation();
const navigate = useNavigate();
console.log("prodata",state);
const role = localStorage.getItem('role');
console.log(role)

const deleteProduct = (uuid) =>{
    axios.delete(`http://localhost:8080/product/Delete?uuid=${uuid}`,{headers:{"token":localStorage.getItem("token")}}).then(result=>{
        console.log('data',result.data.status);
        if(result.data.status == 'success'){
            swal({
                title: "DELETED SUCCESS!",
                text: "SUCESSE",
                icon: "success",
                button: "OK",
                
              });
            //   navigate('/product')
        }
    }).catch(err=>{
        console.log('err',err.message)
    })
}
const totalcart = (uuid) =>{
    axios.get(`http://localhost:8080/oder/Cart?uuid=${uuid}`).then(result=>{
        console.log("total",result.data)
        if(result.data.status == 'success'){
            swal({
                title: "Added To cart!",
                text: `${state.Producttype}`,
                icon: "success",
                button: "OK",
              });
        navigate('/cart',{state:result.data})

        }
    })
}

const addTocart = () =>{
    let uuid = localStorage.getItem('id'); 
    console.log(state.Producttype)
    console.log(state.Image)
    console.log(state.Price)
    console.log(state.Framecolor)
    let cart = {
        productId : state.uuid ,
        productName : state.Producttype,
        ProductColor : state.Framecolor,
        productimg : state.Image,
        quantity : 1 ,
        price : state.Price,
    }
    axios.post(`http://localhost:8080/oder/addToCart?userId=${uuid}`,cart).then(result=>{
        console.log("data",result.data)
        let uuid = result.data.result.uuid
         totalcart(uuid)
        
    }).catch(err=>{
        console.log("err",err.message)
    })
}

    return(
        <>
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                    <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search"/>
                    <button class=" btn2" type="submit">&#128269;</button>      
                    </form>
                    
                    <Link to= {'/home'} className='navbar-brand'>
                        Home
                        </Link>
                        
                        <Link to= {'/'} className='navbar-brand'>
                            Product 
                            </Link>
                   
                        {/* <Link to = {''} onClick={Allproduct}  className = 'navbar-brand'>
                        Category
                        </Link>   */}

                        <Link to = {'/signup'}  onClick={''} className = 'navbar-brand'>
                            Cart
                            </Link>
                            
                            <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p>Log-out</p>
                        </div>
                        </div></div>
                                </div>
                                </nav>


                                <div className="container-fluid flex">
                                    <div className="view">
                                        <div className="saprate">
                                        <img className="img" src={state.Image}/>
                                        </div>
                                        <div className="saprate">
                                        <img className="img" src={state.Image}/>
                                        </div>
                                        <div className="saprate">
                                           <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11164-c7-full-rim-steel-new-sunglasses_untitled_session4174.jpg" />
                                       </div>
                                       <div className="saprate">
                                           <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11164-c7-full-rim-steel-new-sunglasses_5_march_female4970.jpg" />
                                       </div>
                                    </div>
                                    <div className="info">
                                       <h5>{state.Brandname}</h5>
                                       <h5>Grey Full Rim {state.Producttype}</h5>
                                       <span>Size : {state.Framesize}</span><br></br>
                                       <span> price : ₹{state.Price}</span><br></br><br></br>
                                       {role == 'user'? <div id="showuser">
                                       <button>BUY NOW</button>
                                       <button onClick={addTocart} type='button' >ADD TO CART</button>
                                       </div> : <div id="showadmin">
                                       <button className="delete" onClick={()=>deleteProduct(state.uuid)}>DELETE</button>
                                       <button onClick={()=>navigate('/update',{state:state})}>UPDATE</button>
                                       </div>}
                                       <i><h6>PRODUCT DETAILS</h6></i>
                                       <hr></hr>
                                       <div className="product-info">
                                        <ul>
                                            <li>BRAND-NAME : {state.Brandname}</li>
                                            <li>PRODUCT-TYPE : {state.Producttype}</li>
                                            <li>FRAME-COLOR : {state.Framecolor}</li>
                                            <li>FRAME-TYPE : {state.Frametype}</li>
                                            <li>FRAME-SHAPE : {state.Frameshape}</li>
                                            <li>FRAME-SIZE : {state.Framesize}</li>
                                            <li>METERIAL : {state.Material}</li>
                                            <li>GENDER : {state.Gender}</li> 
                                        </ul>
                                        <span>REVIEW : &#9733; &#9733; &#9733; &#9733; &#9733;</span>

                                       </div>


                                        </div>
                                    </div>

    <div className="trend-product">
                        <div className="product-items">
                            <img src ="https://static1.lenskart.com/media/desktop/img/Sep21/image179.png"/>
                            <h4>Round</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg"/>
                            <h4>Cat-Eye</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg"/>
                            <h4>Clubmaster</h4>
                            <button>Explore</button>
                        </div>   
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg"/>
                            <h4>Air Flex</h4>
                            <button>Explore</button>
                        </div>                     
                     </div>

                     

<div className="footer">
        <i><h4>Buy The Best Eyewear From Eagle-Eye</h4></i>
        <p>A one-stop online solution for purchasing eyewear and its accessories, Lenskart delivers them right at your doorstep with convenient methods of payment. Sunglasses as well as eyeglasses are available for men and women in a diverse array of styles and trendy colours. If you want to try out contact lenses, pick the ones of your choice from the extensive variety of coloured contact lenses from our online store.</p>
            <div className="foot">
                <div className="cont">
                <b><span>Service</span></b>
                <ul>
                    <li>Store Locator</li>
                    <li>Enter My Power</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>About Us</span></b>
                <ul>
                    <li>We Are Hiring</li>
                    <li>Refer & Earn</li>
                    <li>About Us</li>
                    <li>Coupons</li>
                </ul>
[9:54 AM, 7/11/2022] Jagan frd: </div>
                <div className="cont">
                <b><span>Help</span></b>
                <ul>
                    <li>FAQ's</li>
                    <li>Site Map</li>
                    <li>Payments</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Social</span></b>
                <ul>
                    <li>Facebooke</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
                </div>
                <div className="cont">
                    
                <img src="https://headstrongperformance.net/wp-content/uploads/2016/04/get-it-on-google-play-vector.png"  />
                <img src="https://miro.medium.com/max/600/1*xqT83bMEz92IBYxS9UQNow.png"/>
                <p>Download Eyekart App to buy EyeGlasses </p>
                 </div>

            </div>
        </div>



        </>
    )
}











import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import './cart.css'

const Cart = () =>{

const{state} = useLocation();
//const[cart,setCart] = useState('')
console.log("data",state.updated.products)
 //var cart = state.updated.products
console.log("i",state.updated.total)
var total1 = parseInt(state.updated.total)

    return(
        <>
       <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" />
                   <button class=" btn2" type="button" onClick={''}>&#128269;</button>   
                </form>
                        <Link to = {'/home'} className = 'navbar-brand'>Home</Link> 
                        <Link to = {'/map'} className = 'navbar-brand'> Track Order</Link> 
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={'/'}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>

            <div className="cart-con">
                <div className="cort-flex">
                    <div className="addTo">
                        <div className="address">
                            <h5>My Cart(0)</h5>
                            <div className="change">
                                <span>Deliver to : </span> <h6>chennai-600068</h6>
                                <button type="button" > change </button>
                            </div>
                        </div>
                        {
                       state.updated.products.map((i)=>{
                       
                        return(
                            <>
                        <div className="cart-item">
                            <img src={i.productimg} />
                            <div className="item-info">
                                <h4>{i.productName}</h4>
                                <span>FRAME-COLOR : {i.ProductColor}</span><br></br>
                                <span>Size : Widwe</span>
                                <h6>price : ₹{i.price}</h6>
                                <div className="cart-remove">
                                    <div class="number">
                                        <span class="minus" >-</span>
                                        <input type="text" value="1" id="num"/>
                                        <span class="plus" >+</span>
                                        </div>
                                        <button type="button">Remove</button>
                                        </div>
                                        </div>
                                        </div>
                                        </>
                        )
                       }) 
                       }
                        <div className="procced">
                            <button type="button">PLACE ORDER</button>
                        </div>

                    </div>
                    
                    <div className="bill">
                    <h4>Price Details</h4>
                    <div className="price-list">
                    <div className="price-lable">
                       <p>Price  </p>
                       <p>Discount  </p>
                       <p>Delivery Charges  </p>
                       <p>Convenience Fee  </p>
                        </div>
                        <div className="rate">
                       <p>₹{state.updated.total}</p>
                       <p>− ₹0</p>
                       <p>₹50</p>
                       <p>₹12</p>
                        </div>
                    </div>
                    <div className="total-price">
                        <h4>Total Amount</h4>
                        <h5>₹{total1 + 50 +12}</h5>
                    </div>
                    <hr></hr>
                    <span>You will save ₹1,000 on this order</span>
                    <hr></hr>
                    <span>Save extra ₹80 using 80 SuperCoins on the next step</span>
                      
                    </div>
                </div>

            </div>

        </>
    )
 
}

export default Cart





import React, { useState } from "react";
import './profile.css';
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
const Profile = () =>{
 const {state} = useLocation();
 const navigate = useNavigate()
 console.log('data',state.username)
 const[name,setname] = useState(state.username)
 const[role,setrole] = useState(state.role)
 const[mobile,setmobile] = useState(state.phone)
 const[email,setemail] = useState(state.email)
 const[address,setaddress] = useState(state.address)
 const [img,setimg] = useState('')

 const updateuser = () =>{

    let data ={
    uuid     : state.uuid,
    username : name,
    role     : role,
    phone    : mobile,
    email    : email,
    address  : address
    }

    axios.put('http://localhost:8080/user/updateuser',data).then(result=>{
        console.log('update',result.data)
        if(result.data.status == 'success'){
            swal({
                title: "UPDATED SUCCESS!",
                text: state.username,
                icon: "success",
                button: "OK",
              });
        }
    }).catch(err=>{
        console.log('err',err.message)
    })
 }

 const signout = () =>{
    let uuid = state.uuid
    axios.post(`http://localhost:8080/user/Logout?uuid=${uuid}`).then(result=>{
        console.log('result',result.data.status)
        if(result.data.status == "success"){
            swal({
                title: "LOGOUT SUCCESS!",
                text: "THANKS",
                icon: "success",
                button: "OK",
              });
              navigate('/signup')
        }  
    }).catch(err=>{
        console.log('err',err.message)
        swal("userName and password is Wrong!");

    })
}

    
 

console.log('img',img)






    return(
        <>
        <div className="containe">
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" onChange={(p)=>(p.target.value)}/>
                   <button class=" btn2" type="button" onClick={''}>&#128269;</button>   
                </form>
                <div className="cursor">
                       <span className="navclick" onClick={''}>product</span>
                       <Link to = {'/map'} className = 'navbar-brand'>
                        Track Order
                        </Link> 
                       <span className="navclick" onClick={''}>Cart</span>
                        </div>
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={''}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>
            <div className="profile-back">
            <div className="pro">
                <div className="profile-left">
                    {
                    img == '' ?
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                    : <img src={img}></img>
                    }
                   <h4>{localStorage.getItem('name')}</h4>
                   <span>Id : {localStorage.getItem('id')}</span><br></br>
                   <span>Role :  {localStorage.getItem('role')}</span><br></br>
                   {/* <button type="button">My Orders</button> */}
                   <input type='file' onChange={(p)=>setimg(p.target.value)}/>
                </div>
                <div className="profile-right">
                  <form>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Name</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="name" value={name}  onChange={(p)=>setname(p.target.value)} />
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Role</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Role" value={role} onChange={(p)=>setrole(p.target.value)} />
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Mobile</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Mobile" value={mobile} onChange={(p)=>setmobile(p.target.value)} />
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg" >Email</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Email" value={email} onChange={(p)=>setemail(p.target.value)}/>
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Address</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Address" value={address} onChange={(p)=>setaddress(p.target.value)} />
                </div>
                </div>
                  </form>
                    <button type="button" onClick={updateuser} >Edit</button>
                </div>
            </div>
            <div className="pro">
            <div className="profile-left">
                <ul>
                    <li>My Coupons</li>
                    <li>All Notifications</li>
                    <li>My Reviews & Rating</li>
                    <li>My Wishlist</li>
                </ul>
                <button type="button" onClick={signout}>Log out</button>
            </div>
            <div className="profile-right">
                <h5>FAQs</h5>
                <ul>
                    <b><li>
                    What happens when I update my email address (or mobile number)?
                    </li></b>
                    <li>
                    Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
                    </li>
                    <b><li>When will my Flipkart account be updated with the new email address (or mobile number)?</li></b>
                    <li>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</li>
                    <b><li>Does my Seller account get affected when I update my email address?</li></b>
                    <li>lenskart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</li>
                </ul>
            </div>
            </div>
            </div>
 


        <div className="footer">
        <i><h4>Buy The Best Eyewear From Eagle-Eye</h4></i>
        <p>A one-stop online solution for purchasing eyewear and its accessories, Lenskart delivers them right at your doorstep with convenient methods of payment. Sunglasses as well as eyeglasses are available for men and women in a diverse array of styles and trendy colours. If you want to try out contact lenses, pick the ones of your choice from the extensive variety of coloured contact lenses from our online store.</p>
            <div className="foot">
                <div className="cont">
                <b><span>Service</span></b>
                <ul>
                    <li>Store Locator</li>
                    <li>Enter My Power</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>About Us</span></b>
                <ul>
                    <li>We Are Hiring</li>
                    <li>Refer & Earn</li>
                    <li>About Us</li>
                    <li>Coupons</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Help</span></b>
                <ul>
                    <li>FAQ's</li>
                    <li>Site Map</li>
                    <li>Payments</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Social</span></b>
                <ul>
                    <li>Facebooke</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
                </div>
                <div className="cont">
                    
                <img src="https://headstrongperformance.net/wp-content/uploads/2016/04/get-it-on-google-play-vector.png"  />
                <img src="https://miro.medium.com/max/600/1*xqT83bMEz92IBYxS9UQNow.png"/>
                <p>Download Eyekart App to buy EyeGlasses </p>
                 </div>

            </div>
        </div>
        </div>
        </>
    )
}










import React,{useState} from "react";
import './addcart.css'
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import { useCart } from 'react-use-cart';
import swal from 'sweetalert';
import axios from "axios";


const AddToCart = () =>{
// const {state} = useLocation();
// console.log('state',state);
//const [cart,setcart] = useState(state.updated)
const navigate = useNavigate();
const [address,setaddress]=useState('chennai-0001');
const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
} = useCart();

if(isEmpty){
    return(
        <>
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" />
                   <button class=" btn2" type="button" onClick={''}>&#128269;</button>   
                </form>
                        <Link to = {'/home'} className = 'navbar-brand'>Home</Link> 
                        <Link to = {'/map'} className = 'navbar-brand'> Product</Link> 
                        <Link to = {'/map'} className = 'navbar-brand'> About</Link> 
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={'/'}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>

            <div className="empty-cart">
            <h1 className="text-center">Your Cart is Empty</h1>
            </div>
        
        </>
    )
}
const changeAddress= () =>{
    swal("Enter your Deliver Address:", {
        content: "input",
      })
      .then((value) => {
    let info = {
        uuid:localStorage.getItem('id'),
        address:value
    }
    console.log(info.uuid , info.address)
    axios.put(`http://192.168.29.139:8080/user/updateAdd`,info).then(result=>{
        console.log('addres',result.data.result.address)
        setaddress(result.data.result.address)
    })
})
}


    return(
        <>

<nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" />
                   <button class=" btn2" type="button" onClick={''}>&#128269;</button>   
                </form>
                        <Link to = {'/home'} className = 'navbar-brand'>Home</Link> 
                        <Link to = {'/map'} className = 'navbar-brand'> Product</Link> 
                        <Link to = {'/map'} className = 'navbar-brand'> About</Link> 
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={'/'}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>

        

<div class="cart-items">
<div class="small-cart-page">
    {/* <table>
        
        <tr>
            <th scope="col"><b>PRODUCTS({totalUniqueItems}) Total-Item : ({totalItems})</b></th>
            <th scope="col"><b>QNT</b></th>
            <th scope="col"><b>Subtotal</b></th>


        </tr>

            {
        items.map((i,index)=>{
            return(
                <>
             <tr>
                  <td>
                    <div class="cart-info">
                    <img src={i.Image}/>
                    <div>
                        <p>{i.Brandname}</p>
                        <span class="cart-price">₹{i.price}</span>
                        <input class="quantity" type="number" value={i.quantity}/>
                        <button class="btn-remove">REMOVE</button>
                    </div>
                </div>
                </td>
            <td class="subtotal">₹{i.price}</td>
        </tr>
                <hr></hr>
                </>
            )
        })
}   
    </table> */}


    <table className="table table-light table-hover m-0">
            <tr className="table-primary">
                <th>product ({totalUniqueItems})</th>
                <th>Brandname</th>
                <th>Price</th>
                <th>Quantity ({totalItems})</th>
                <th>Remove</th>
               
            </tr>
        <tbody>
            {
                items.map((i,index)=>{
                    return(
                        <>
                        <tr key={index}>
                            <td>
                                <img src={i.Image} style = {{height:'6rem'}}/>
                            </td>
                            <td>{i.Brandname}</td>
                            <td>{i.price}</td>
                            <td>Quantity ({i.quantity})</td>
                            <td>
                                <button
                                className="btn btn-info ms-2"
                                onClick={()=>updateItemQuantity(i.id,i.quantity -1)}
                                > -
                                </button>
                                <button
                                className="btn btn-info ms-2"
                                onClick={()=>updateItemQuantity(i.id,i.quantity +1)}
                                > +
                                </button>
                                <button 
                                className="btn btn-danger ms-2"
                                onClick={()=>removeItem(i.id)}
                                >Remove-Item
                                 </button>
                            </td>
                        </tr>
                        </>
                    )
                })
            }
        </tbody>
    </table>
<hr/>
<div class="total">
   <h6>TOTAL</h6>
   <span class="total-price">₹{cartTotal}</span>
</div>
<hr/>
{/* <div className="pay-1">
<button type="button">PAY</button>
</div> */}
</div>
</div>
<div className="address-cart">
<span>Address : {address}</span><br></br>
<button className="btn btn-primary m-2" onClick={changeAddress}>change</button>
</div>
<div className="col-auto">
<button className="btn btn-danger ms-2"
onClick={()=>emptyCart()}
>Clear cart
</button>
<button className="btn btn-primary m-2" onClick={()=>navigate('/pay',{state:cartTotal})}>BUY NOW</button>
</div>



                 <div class="row-1">
                     <div class="col-5">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Amazon_Pay_logo.svg/1280px-Amazon_Pay_logo.svg.png" />
                     </div>
                        <div class="col-5">
                            <img src="https://pngimg.com/uploads/paypal/paypal_PNG4.png" />
                        </div>
                            <div class="col-5">
                                <img src="https://logos-download.com/wp-content/uploads/2021/01/PhonePe_Logo_full.png" />
                            </div>
                                <div class="col-5">
                                    <img src="https://thestrawgroup.com/wp-content/uploads/2018/01/logobar-google-pay.png"/>
                                </div>
                                    <div class="col-5">
                                        <img src="https://static.businessworld.in/article/article_extra_large_image/1589892172_FHqF6Z_UPI.jpg"/>
                                    </div>
                                
                                </div>

<div className="footer">
        <i><h4>Buy The Best Eyewear From Eagle-Eye</h4></i>
        <p>A one-stop online solution for purchasing eyewear and its accessories, Lenskart delivers them right at your doorstep with convenient methods of payment. Sunglasses as well as eyeglasses are available for men and women in a diverse array of styles and trendy colours. If you want to try out contact lenses, pick the ones of your choice from the extensive variety of coloured contact lenses from our online store.</p>
            <div className="foot">
                <div className="cont">
                <b><span>Service</span></b>
                <ul>
                    <li>Store Locator</li>
                    <li>Enter My Power</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>About Us</span></b>
                <ul>
                    <li>We Are Hiring</li>
                    <li>Refer & Earn</li>
                    <li>About Us</li>
                    <li>Coupons</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Help</span></b>
                <ul>
                    <li>FAQ's</li>
                    <li>Site Map</li>
                    <li>Payments</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Social</span></b>
                <ul>
                    <li>Facebooke</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
                </div>
                <div className="cont">
                    
                <img src="https://headstrongperformance.net/wp-content/uploads/2016/04/get-it-on-google-play-vector.png"  />
                <img src="https://miro.medium.com/max/600/1*xqT83bMEz92IBYxS9UQNow.png"/>
                <p>Download Eyekart App to buy EyeGlasses </p>
                 </div>

            </div>
        </div>


                                                          

        </>
    )

}






import React, { useState, version } from "react";
import { BrowserRouter as Router,Routes,Route,Link, useLocation,style, useNavigate} from 'react-router-dom';
import axios  from "axios";
import swal from 'sweetalert';
import { useCart } from "react-use-cart"

const Productdetailss = () =>{
const { addItem,totalUniqueItems} = useCart();
const {state} = useLocation();
const [item,setItem] = useState(state);
const navigate = useNavigate();
console.log("prodata",state);
const role = localStorage.getItem('role');
console.log(role)

console.log('idd',item.price)

function handlecart(){
    addItem(item);
    swal({
        title: "Added To cart!",
        text: `${item.Producttype}`,
        icon: "success",
        button: "OK",
      });

}



const deleteProduct = (uuid) =>{
    axios.delete(`http://localhost:8080/product/Delete?uuid=${uuid}`,{headers:{"token":localStorage.getItem("token")}}).then(result=>{
        console.log('data',result.data.status);
        if(result.data.status == 'success'){
            swal({
                title: "DELETED SUCCESS!",
                text: "SUCESSE",
                icon: "success",
                button: "OK",
                
              });
            //   navigate('/product')
        }
    }).catch(err=>{
        console.log('err',err.message)
    })
}



const totalcart = (uuid) =>{
    axios.get(`http://localhost:8080/oder/Cart?uuid=${uuid}`).then(result=>{
        console.log("total",result.data)
        if(result.data.status == 'success'){
            swal({
                title: "Added To cart!",
                text: `${state.Producttype}`,
                icon: "success",
                button: "OK",
              });
        navigate('/cart',{state:result.data})

        }
    })
}

const addTocart1 = () =>{
    let uuid = localStorage.getItem('id'); 
    console.log(state.Producttype)
    console.log(state.Image)
    console.log(state.Price)
    console.log(state.Framecolor)
    let cart = {
        productId : state.uuid ,
        productName : state.Producttype,
        ProductColor : state.Framecolor,
        productimg : state.Image,
        quantity : 1 ,
        price : state.Price,
    }
    axios.post(`http://localhost:8080/oder/addToCart?userId=${uuid}`,cart).then(result=>{
        console.log("data",result.data)
        let uuid = result.data.result.uuid
         totalcart(uuid)
        
    }).catch(err=>{
        console.log("err",err.message)
    })
}

    return(
        <>
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                    <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search"/>
                    <button class=" btn2" type="submit">&#128269;</button>      
                    </form>
                    <div className="cursor">
                    <Link to= {'/home'} className='navbar-brand'>
                        Home
                        </Link>
                        
                        <Link to= {'/'} className='navbar-brand'>
                            Product 
                            </Link>
                   

                        <img src="https://static.thenounproject.com/png/70771-200.png" width='40' onClick={()=>navigate('/addtocart')} />
                        <span className="cart-count"><b>{totalUniqueItems}</b></span>    
                        </div>
                            <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p>Log-out</p>
                        </div>
                        </div></div>
                                </div>
                                </nav>


                                <div className="container-fluid flex">
                                    <div className="view">
                                        <div className="saprate">
                                        <img className="img" src={item.Image}/>
                                        </div>
                                        <div className="saprate">
                                        <img className="img" src={item.Image}/>
                                        </div>
                                        <div className="saprate">
                                           <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11164-c7-full-rim-steel-new-sunglasses_untitled_session4174.jpg" />
                                       </div>
                                       <div className="saprate">
                                           <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11164-c7-full-rim-steel-new-sunglasses_5_march_female4970.jpg" />
                                       </div>
                                    </div>
                                    <div className="info">
                                       <h5>{item.Brandname}</h5>
                                       <h5>Grey Full Rim {item.Producttype}</h5>
                                       <span>Size : {item.Framesize}</span><br></br>
                                       <span> price : ₹{item.price}</span><br></br><br></br>
                                       {role == 'user'? <div id="showuser">
                                       <button >BUY NOW</button>
                                        <button onClick={()=>handlecart()} >ADD TO CART</button>
                                       {/* <button type="button" onClick={addTocart1}>ADD TO CART</button> */}
                                       </div> : <div id="showadmin">
                                       <button className="delete" onClick={()=>deleteProduct(state.uuid)}>DELETE</button>
                                       <button onClick={()=>navigate('/update',{state:state})}>UPDATE</button>
                                       </div>}
                                       <i><h6>PRODUCT DETAILS</h6></i>
                                       <hr></hr>
                                       <div className="product-info">
                                        <ul>
                                            <li>BRAND-NAME : {item.Brandname}</li>
                                            <li>PRODUCT-TYPE : {item.Producttype}</li>
                                            <li>FRAME-COLOR : {item.Framecolor}</li>
                                            <li>FRAME-TYPE : {item.Frametype}</li>
                                            <li>FRAME-SHAPE : {item.Frameshape}</li>
                                            <li>FRAME-SIZE : {item.Framesize}</li>
                                            <li>METERIAL : {item.Material}</li>
                                            <li>GENDER : {item.Gender}</li> 
                                        </ul>
                                        <span>REVIEW : &#9733; &#9733; &#9733; &#9733; &#9733;</span>

                                       </div>


                                        </div>
                                    </div>

    <div className="trend-product">
                        <div className="product-items">
                            <img src ="https://static1.lenskart.com/media/desktop/img/Sep21/image179.png"/>
                            <h4>Round</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg"/>
                            <h4>Cat-Eye</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg"/>
                            <h4>Clubmaster</h4>
                            <button>Explore</button>
                        </div>   
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg"/>
                            <h4>Air Flex</h4>
                            <button>Explore</button>
                        </div>                     
                     </div>

                     

<div className="footer">
        <i><h4>Buy The Best Eyewear From Eagle-Eye</h4></i>
        <p>A one-stop online solution for purchasing eyewear and its accessories, Lenskart delivers them right at your doorstep with convenient methods of payment. Sunglasses as well as eyeglasses are available for men and women in a diverse array of styles and trendy colours. If you want to try out contact lenses, pick the ones of your choice from the extensive variety of coloured contact lenses from our online store.</p>
            <div className="foot">
                <div className="cont">
                <b><span>Service</span></b>
                <ul>
                    <li>Store Locator</li>
                    <li>Enter My Power</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>About Us</span></b>
                <ul>
                    <li>We Are Hiring</li>
                    <li>Refer & Earn</li>
                    <li>About Us</li>
                    <li>Coupons</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Help</span></b>
                <ul>
                    <li>FAQ's</li>
                    <li>Site Map</li>
                    <li>Payments</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Social</span></b>
                <ul>
                    <li>Facebooke</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
                </div>
                <div className="cont">
                    
                <img src="https://headstrongperformance.net/wp-content/uploads/2016/04/get-it-on-google-play-vector.png"  />
                <img src="https://miro.medium.com/max/600/1*xqT83bMEz92IBYxS9UQNow.png"/>
                <p>Download Eyekart App to buy EyeGlasses </p>
                 </div>

            </div>
        </div>



        </>
    )

    }







    // bala                                                    bala                   bala
<div className="im">
        <div className="bgi">
        <form className="forms" onSubmit={handleSubmit(sign)}>
        <div className="container_b">
            <h3 className="w">Register</h3><br></br>
            <div className="box_box">
             <div>   
             <input className="in" type="text" placeholder="Name" name="name" onChange={(name)=>setUsername(name.target.value)} 
             {...register("userName", {
                required: "name is Required",
                pattern: {
                  value: /^[A-Z][a-zA-Z '.-]*$/,
                  message:
                    "first latter should have capital latter",
                },
                minLength: {
                  value: 4,
                  message: "minimum 4 latters must",
                },
                maxLength: {
                  value: 16,
                  message: "maximum 16 latters allowed",
                },
              })}
              onKeyUp={() => {
                trigger("userName");
              }}
            />
            {errors.userName && (<small className="sw">{errors.userName.message}</small>)}<br></br><br></br>
             </div>
             <div>
             <input className="in" type="text" placeholder="Number" name="number" onChange={(number)=>setPhoneNumber(number.target.value)}
             {...register("PhoneNumber", {
                required: "Number is Required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "numbers only allowed",
                },
                maxLength: {
                  value: 10,
                  message: "only 10 numbers are allowed",
                },
              })}
              onKeyUp={() => {
                trigger("PhoneNumber");
              }}
            />
            {errors.PhoneNumber && (<small className="sw">{errors.PhoneNumber.message}</small>)}<br></br><br></br>
             </div>
             <div>
             <input className="in" type="text" placeholder="Email" name="email" onChange={(email)=>setEmail(email.target.value)}
             {...register("Email", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:
                    "(example : samplemail@a123.com)",
                },
              })}
              onKeyUp={() => {
                trigger("Email");
              }}
            />
            {errors.Email && (<small className="sw">{errors.Email.message}</small>)}<b></b><br></br></div>
            <div>
             <input className="in" type="text" placeholder="Password" name="password" onChange={(password)=>setPassword(password.target.value)}
             {...register("Password", {
                required: "Password is Required",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message:
                    "Password must have 8 characters. capital latter small latter number and special latter must",
                },
              })}
              onKeyUp={() => {
                trigger("Password");
              }}
            />
            {errors.Password && (<small className="sw">{errors.Password.message}</small>)}<br></br><br></br><br></br></div>
             <center><button className="btns" type="submit">SignUp</button><br></br><br></br>
             <h5 className="t">Already have an account?</h5><p className="pa" onClick={()=>window.location.href = '/'}>Login</p></center>
            </div>
        </div>
        </form>
        </div>
        </div>