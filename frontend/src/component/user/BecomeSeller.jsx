import Footer from "../../Footer";
import Loading from "../../more/Loader";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import "./BecomeSeller.css"

const BecomeSeller = () => {

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
    } = useSelector((state) => state.products);

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
                        <ul><span style={{
                            color: "#000",
                            fontSize: "1.3rem",
                            fontWeight: "800",
                            fontFamily: "Roboto",
                        }}>Rules to become a seller</span>
                            <li>1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum placeat dignissimos atque corrupti adipisci rem quo ea amet, similique, aliquam iste unde delectus? </li>
                            <li>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum placeat dignissimos atque corrupti adipisci rem quo ea amet, similique, aliquam iste unde delectus? </li>
                            <li>3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum placeat dignissimos atque corrupti adipisci rem quo ea amet, similique, aliquam iste unde delectus? </li>
                            <li>4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum placeat dignissimos atque corrupti adipisci rem quo ea amet, similique, aliquam iste unde delectus? </li>
                            <li>5. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro earum placeat dignissimos atque corrupti adipisci rem quo ea amet, similique, aliquam iste unde delectus? </li>
                        </ul>
                    </div>
                    <div>
                        <Link to="" className="become_seller_link">Become a Seller</Link>
                    </div>
                    <Footer />
                </>
            )
            }
        </>
    );
}

export default BecomeSeller;