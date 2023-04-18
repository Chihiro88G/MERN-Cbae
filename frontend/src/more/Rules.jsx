import React from 'react'
import "./Rules.css";
import Header from '../component/Home/Header';
import BottomTab from './BottomTab';
import MetaData from './Metadata';
import Footer from '../Footer';

const Rules = () => {
    return (
        <>
            <MetaData title="Rules" />
            <Header />
            <div className='rules' style={{
                padding: "50px 30px",
                display: "flex",
                width: "95%",
                overflow: "hidden"
            }}>
                <ul className='rules'>
                    <span style={{
                        color: "#000",
                        fontSize: "1.3rem",
                        fontWeight: "800",
                        fontFamily: "Roboto",
                    }}>Some Rules:</span>
                    <li>
                    <div className="col__1"><h1>1.You can easily return your product..</h1>
                        <h2>But you have to give us the delivery charge...</h2>
                                </div>
                        \<img src="view/return_products.png" alt="Products" />
                       
                        <div className="col__3">
                           
                            <h1>2.You have to give delivery charge first for cash on Delivery...</h1>
                            <h2>In Canada you have to give CAD$10 and outside of Canada charge will be CAD$20</h2>
                            \<img src="view/delivery.jpg" alt="Products" />
                        </div>
                        </li>
                        <div className="col__3">
                            \<img src="view/products3.jpg" alt="Products" />
                            <h1>3. You can not buy the outofstock products...</h1>
                            
                        </div>
                       
                        <div className="col__3">
                            \<img src="view/products3.jpg" alt="Products" />
                            <h1>4. You can find more new features in our buiseness in very soon...</h1>
                                <h2>Our developers team always work for your good services...</h2>
                            
                        </div>
                        
                        <div className="col__3">
                            \<img src="view/products3.jpg" alt="Products" />
                            <h1>5. You can buy any products from us...</h1>
                                <h2>we are trying to our best for give the best quality of products...</h2> 
                        </div>

                        <div className="col__3">
                        \<img src="view/products3.jpg" alt="Products" />
                            <h1>6. Thanks for visit our website...</h1>
                                <h2>Have a good da</h2>
                            
                        </div>
                    <li>1. You can easily return your product..But you have to give us the delivery charge...</li>
                    <li>2. You have to give delivery charge first for cash on Delivery..In Canada you have to give CAD$10 and outside of Canada charge will be CAD$20</li>
                    <li>3. You can not buy the outofstock products...</li>
                    <li>4. You can buy any products from us...we are trying to our best for give the best quality of products...</li>
                    <li>5. You can find more new features in our buiseness in very soon...Our developers team always work for your good services...</li>
                    <li>6. At last thanks for visit our website...Have a good day !</li>
                </ul>
            </div>
            
            <Footer />
            <BottomTab />
        </>
    )
}

export default Rules
