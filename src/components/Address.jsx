import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const onChangerHandler = (e) => {
    const { name, value } = e.target;

    // Validate fullName only allows alphabets
    if (name === "fullName" && !/^[a-zA-Z ]*$/.test(value)) {
      setErrors({ ...errors, [name]: "Only alphabets and spaces are allowed" });
    } else {
      setErrors({ ...errors, [name]: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate Full Name
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    } else if (!/^[a-zA-Z ]*$/.test(fullName)) {
      newErrors.fullName = "Only alphabets and spaces are allowed";
      valid = false;
    }

    // Validate Address
    if (!address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    // Validate Pincode
    if (!pincode.trim()) {
      newErrors.pincode = "Pincode is required";
      valid = false;
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be 6 digits long and numeric";
      valid = false;
    }

    // Validate Phone Number
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits long and numeric";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address added ", result);

    if (result.success) {
      navigate("/checkout");
      setFormData({
        fullName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phoneNumber: "",
      });
    }
  };

  return (
    <>
      <div
        className="container my-3 p-4"
        style={{ border: "2px solid yellow", borderRadius: "10px" }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form onSubmit={submitHandler} className="my-3">
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail13" className="form-label">
                Full Name
              </label>
              <input
                name="fullName"
                value={fullName}
                onChange={onChangerHandler}
                type="text"
                className={`form-control bg-dark text-light ${
                  errors.fullName && "is-invalid"
                }`}
                id="exampleInputEmail13"
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Pincode
              </label>
              <input
                name="pincode"
                value={pincode}
                onChange={onChangerHandler}
                type="text"
                className={`form-control bg-dark text-light ${
                  errors.pincode && "is-invalid"
                }`}
                id="exampleInputEmail1"
              />
              {errors.pincode && (
                <div className="invalid-feedback">{errors.pincode}</div>
              )}
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangerHandler}
                type="tel"
                className={`form-control bg-dark text-light ${
                  errors.phoneNumber && "is-invalid"
                }`}
                id="exampleInputPassword1"
              />
              {errors.phoneNumber && (
                <div className="invalid-feedback">{errors.phoneNumber}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address/Nearby
              </label>
              <textarea
                name="address"
                value={address}
                onChange={onChangerHandler}
                className={`form-control bg-dark text-light ${
                  errors.address && "is-invalid"
                }`}
                id="exampleInputPassword1"
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontWeight: "bold" }}
            >
              Submit
            </button>
          </div>
        </form>

        {userAddress && (
          <div className="d-grid col-6 mx-auto my-3">
            <button
              className="btn btn-warning"
              onClick={() => navigate("/checkout")}
              style={{ fontWeight: "bold" }}
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
