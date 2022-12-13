import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Indiviualproduct =()=>{
    const {state} = useLocation();
    console.log('state_data', state)
    // const value1 = JSON.stringify(state);
    return(
          <>
           <div>

            <div className="colors">
             <nav className="navba">
             <h4 className="fon1">&#518;xplore Now</h4>
                 <ul>
                     <li onClick={()=> window.location.href ='#'}>Order</li>
                     <li onClick={()=> window.location.href ='#'}>Cart</li>
                     {/* <li onClick={()=> window.location.href ='/signUp'}>Profile</li> */}
                     <li onClick={()=> window.location.href ='/category'}>Product</li>
                     <li onClick={()=> window.location.href ='/home'}>Home</li>
                 </ul>
                 <form className="fom2">
                      <input className="in" type="text" placeholder="Search.." name="search"/>
                      <button className="btn2">&#128269;</button>
                 </form>
             </nav>
             </div>
             <div>
            <table className="table"> 
            <td><img src={state[0].image}/></td> 
           <td><h6>Product Name</h6>{state[0].watchBrand}<b></b><h6>Price</h6>{state[0].price}</td>
           {/* <td>{state[0].price}</td> */}
           </table>
             </div>
             </div>
             </>
)
          // return(
          //   <>
          //   <div>
          //       <p>{state[0].watchBrand}</p>
          //       <p>{state[0].price}</p>
          //   </div>
          //   </>
          // )

}

export default Indiviualproduct;