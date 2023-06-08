import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthRegisterMutation } from "./feature/loginReducer/authLogin";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [authRegister, { data, isSuccess, isError, error }] =
    useAuthRegisterMutation();
  const navigate = useNavigate();
  const init = {
    name: "",
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(init);
  const [isSubmit, setIssubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIssubmit(true);
    setFormError(validation(formValue));
  };
  const validation = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "Name Field is required";
    }
    if (!value.email) {
      error.email = "Email Field is required";
    }
    if (!value.password) {
      error.password = "password Field is required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      authRegister(formValue);
      console.log("data:", formValue);
    }
  }, [formError, isSubmit, formValue, authRegister]);

  useEffect(() => {
    if (isSuccess) {
      setIssubmit(false);
      toast.success(data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 2001);
    }
    if (isError) {
      setIssubmit(false);
      toast.error(`${error?.data?.msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess, isError, navigate, error, data]);
  return (
    <div className="container">
      <div className="m-5 card p-3">
        <div className="mt-3">
          <input
            className="form-control p-2"
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
          />
          <p className="text-danger">{formError?.name}</p>
        </div>
        <div className="mt-3">
          <input
            className="form-control p-2"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <p className="text-danger">{formError?.email}</p>
        </div>
        <div className="mt-3">
          <input
            className="form-control p-2"
            name="password"
            type="password"
            placeholder="Pasword"
            onChange={handleChange}
          />
          <p className="text-danger">{formError?.password}</p>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={(e) => handleClick(e)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
