import aes256 from 'aes256';
import React, { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { authentication, database } from '../DataBase/Firebase';
import Webcam from "react-webcam";
import validator from "validator"

<Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

const UserSignUpForm = (props) => {
    const [state, setstate] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userAdd: "",
        userPass: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setstate((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });
    }

    const [userImage, setImage] = useState('');
    const webcamRef = useRef(null);


    const capture = (
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });

    const { userName, userEmail, userPhone, userAdd, userPass } = state;

    const handleSubmit = async () => {
        if (!userImage || !userName || !userEmail || !userPhone || !userAdd || !userPass) {
            props.showAlert("Please fill All The Data !!!", "warning")
        } else {
            if (!validator.isStrongPassword(userPass)) {
                props.showAlert("Invalid Password !!!", "danger");
            } else if (userPhone.length !== 10) {
                props.showAlert("Invalid Phone Number !!!", "danger");
            }else if(!validator.isEmail(userEmail)){
                props.showAlert("Invalid Email !!!", "danger");
            }
            else {
                try {
                    await authentication.createUserWithEmailAndPassword(userEmail, userPass);
                    const passUser = aes256.encrypt('mynameisyogeshgaurandiamawebdeveloper', userPass);
                    await database.collection('user').add({ userImage, userName, userEmail, userPhone, userAdd, passUser });
                    props.showAlert("Data Enterd Sucessfully !!!", "success");
                    setstate({
                        userName: "",
                        userEmail: "",
                        userPhone: "",
                        userAdd: "",
                        userPass: ""
                    })
                } catch (error) {
                    props.showAlert(`${error.message}`, "danger")
                }
            }
        }
    }
    return (
        <>
            <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="row row-cols-2">
                    <div className="card mx-1" style={{ width: "22rem", backgroundImage: props.mode === "light" ? `linear-gradient(#169af1,aqua)` : "linear-gradient(0deg, #000000 0%, #04619f 74%)" }}>
                        <div className="card-body">
                            <div className="container-fluid" style={{ width: "18rem" }}>
                                <h3 style={{ textAlign: "center" }} className={props.mode === "light" ? "text-dark" : "text-light"} >Register Here</h3>
                                <div className="mb-3 mt-4">
                                    <input type="text" className="form-control" placeholder="Enter Your Name" autoComplete="no" value={state.userName} name="userName" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" placeholder="Enter Your Email" autoComplete="no" value={state.userEmail} name="userEmail" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Your Phone Number" autoComplete="no" value={state.userPhone} name="userPhone" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Your Address " autoComplete="no" value={state.userAdd} name="userAdd" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type={props.visible} className="form-control" placeholder="Enter Your Password" autoComplete="no" value={state.userPass} name="userPass" onChange={handleInput} />
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={props.handleVisiblity} />
                                    <label className={props.mode === "light" ? "form-check-label" : "form-check-label text-light"} htmlFor="flexCheckDefault">
                                        Show Password
                                    </label>
                                </div>
                                <button className={props.mode === "light" ? `btn btn-light text-dark` : `btn btn-primary`} onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="card text-center mx-1 mt-1" style={{ width: "22rem", backgroundImage: props.mode === "light" ? `linear-gradient(#169af1,aqua)` : `linear-gradient(360deg, #000000 0%, #04619f 74%)` , alignItems:"center"}}>
                        {userImage === '' ? <Webcam
                            audio={false}
                            height={200}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={220}
                            videoConstraints={videoConstraints}
                            className="mt-3"
                        /> : <img src={userImage} alt="userImg"  width="220"
                        height="200" style={{display:"flex", justifyContent:"center" ,alignItems:"center"}} className="mt-3"/>}
                        <div className="card-body">
                            <h5 className={props.mode === "light" ? `card-title text-dark` : `card-title text-light`}>Live Preview</h5>
                            <NavLink to="/" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault();
                                capture()
                            }}>Capture</NavLink>
                            <NavLink to="/" className="btn btn-secondary mx-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImage('');
                                }}
                            >Re Capture</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSignUpForm;
