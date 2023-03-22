import Footer from "../../Footer";
import Loading from "../../more/Loader";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import "./AccountSetting.css"

const AccountSetting = () => {

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
                    <div>Account Setting</div>
                    <div>
                        <p>email: <input type="email" name="email" id="" /></p>
                        <p>password: <input type="password" name="password" id="" /></p>
                        <p>shipping address: <input type="text" name="ship_address" id="" /></p>
                        <p>billing address: <input type="text" name="bill_email" id="" /></p>
                        <Link to="">Change Account Setting</Link>
                    </div>
                    <Footer />
                </>
            )
            }
        </>
    );
}

export default AccountSetting;