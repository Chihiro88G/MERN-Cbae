import Footer from "../../Footer";
import Loading from "../../more/Loader";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import "./BecomeSeller.css"
import { updateProfile } from "../../actions/userAction"

const BecomeSeller = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)

    const {
        loading,
    } = useSelector((state) => state.products);

    // const updateProfileSubmit = (e) => {
    //     e.preventDefault();

    //     const myForm = new FormData();

    //     myForm.set("name", user.name);
    //     myForm.set("email", user.email);
    //     myForm.set("role", "seller");
    //     // myForm.set("avatar", avatar);
    //     dispatch(updateProfile(myForm));
    // };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <MetaData title="Products" />
                    <Header />
                    <div className='rules' style={{
                        padding: "50px 30px",
                        display: "flex",
                        width: "95%",
                        overflow: "hidden"
                    }}>
                        <span style={{
                            color: "#000",
                            fontSize: "1.3rem",
                            fontWeight: "800",
                            fontFamily: "Roboto",
                        }}>
                            <div className="col__1"><h1>Sell your products with C-Bae</h1>
                                <p>One platform that lets you sell wherever your customers are:
                                    online, in‑person, and everywhere in between</p>
                                <h1>Run your business from a single place </h1>
                                <p>Promote and sell on sales channels while C-bae
                                    automatically tracks orders and inventory.</p>
                                <h1>Boost sales</h1>
                                <p>Customize where your products appear,
                                    so you can feel confident the right shoppers
                                    discover your business.</p> </div></span>

                        \<img src="view/products.jpg" alt="Products" />


                        <div className="col__3">
                            \<img src="view/products2.jpg" alt="Products" />
                            <h1>Your storefront </h1>
                            <p>It’s never been easier to set up your own online store and bring your brand to life</p>
                        </div>
                        <div className="col__3">
                            \<img src="view/products3.jpg" alt="Products" />
                            <h1>Online marketplaces</h1>
                            <p>Connect to online marketplaces across the web so you can sell where people shop.</p>
                        </div>
                    </div>
                    <div>
                        <Link to="/me" className="become_seller_link">Become a Seller</Link>
                    </div>
                    <Footer />
                </>
            )
            }
        </>
    );
}

export default BecomeSeller;