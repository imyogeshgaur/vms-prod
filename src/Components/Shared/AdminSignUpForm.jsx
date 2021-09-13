import React, { useState } from 'react'
import { authentication, database } from '../DataBase/Firebase';
import aes256 from "aes256"
import validator from "validator"

const AdminSignUpForm = (props) => {
    const [state, setstate] = useState({
        adminName: "",
        adminEmail: "",
        adminPhone: "",
        adminAdd: "",
        adminPass: ""
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

    const { adminName, adminEmail, adminPhone, adminAdd, adminPass } = state;

    const handleSumbit = async (e) => {
        e.preventDefault();
        if (!adminName || !adminEmail || !adminPhone || !adminAdd || !adminPass) {
            props.showAlert("Please Fill all The Fields !!!", "warning");
        } else {
            if (!validator.isStrongPassword(adminPass)) {
                props.showAlert("Invalid Password !!!", "danger");
            } else if (adminPhone.length !== 10) {
                props.showAlert("Invalid Phone Number !!!", "danger");
            }else if(!validator.isEmail(adminEmail)){
                props.showAlert("Invalid Email !!!", "danger");
            }
            else {
                try {
                    await authentication.createUserWithEmailAndPassword(adminEmail, adminPass);
                    const passAdmin = await aes256.encrypt("mynameisyogeshgaurandiamawebdevloper", adminPass);
                    await database.collection('admin').add({ adminName, adminEmail, adminPhone, adminAdd, passAdmin });
                    props.showAlert("Data Added Sucessfully !!!", "success");
                } catch (error) {
                    props.showAlert(`${error.message}`, "danger");
                }
            }
        }
    }
    return (
        <>
            <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="row row-cols-2">
                    <div className="card" style={{ width: "22rem", backgroundImage: props.mode === "light" ? `linear-gradient(#169af1,aqua)` : "linear-gradient(0deg, #000000 0%, #04619f 74%)" }}>
                        <div className="card-body">
                            <div className="container-fluid my-3" style={{ width: "20rem" }}>
                                <h3 style={{ textAlign: "center" }} className={props.mode === "light" ? "text-dark" : "text-light"}>Register Here</h3>
                                <div className="mb-3 mt-4">
                                    <input type="text" className="form-control" placeholder="Enter Your Name" autoComplete="no" value={state.adminName} name="adminName" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" placeholder="Enter Your Email" autoComplete="no" value={state.adminEmail} name="adminEmail" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Your Phone Number" autoComplete="no" value={state.adminPhone} name="adminPhone" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Enter Your Address" autoComplete="no" value={state.adminAdd} name="adminAdd" onChange={handleInput} />
                                </div>
                                <div className="mb-3">
                                    <input type={props.visible} className="form-control" placeholder="Enter Your Password" autoComplete="no" value={state.adminPass} name="adminPass" onChange={handleInput} />
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={props.handleVisiblity} />
                                    <label className={props.mode === "light" ? "form-check-label" : "form-check-label text-light"} for="flexCheckDefault">
                                        Show Password
                                    </label>
                                </div>
                                <button className="btn btn-primary" onClick={handleSumbit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSignUpForm
