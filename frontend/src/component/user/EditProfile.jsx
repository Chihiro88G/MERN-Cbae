import React, { useState, useEffect, Fragment } from "react";
import "./EditProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import RoleIcon from "@material-ui/icons/Assistant"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import Loading from "../../more/Loader";
import MetaData from "../../more/Metadata";
import { UPDATE_PROFILE_RESET } from "../../constans/userContans";
import { ToastContainer, toast } from 'react-toastify';
import { Checkbox } from "@material-ui/core";

const EditProfile = ({ history }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.user
  );

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const [role, setRole] = useState("");

  // const roleChecked = (event) => {
  //   setRole(event.target.checked.name)
  //   // console.log('role: ' + role)
  // }

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    console.log('id: ' + id)

    myForm.set("id", id)
    myForm.set("name", name);
    myForm.set("email", email);
    // myForm.set("avatar", avatar);
    myForm.set("role", role);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      // setAvatarPreview(user.avatar.url)
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(loadUser());

      history.push("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, error, alert, history, isUpdated, user]);


  return (
    <>
      {loading ? (<Loading />) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    disabled="true"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="updateProfileRole">
                  <RoleIcon />
                  <input type="checkbox" name="role" id="buyer" value="buyer" onChange={(e) => setRole(e.target.value)} />Buyer
                  <input type="checkbox" name="role" id="seller" value="seller" onChange={(e) => setRole(e.target.value)} />Seller
                </div>

                <div id="updateProfileImage">
                  {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default EditProfile
