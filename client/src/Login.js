import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthloginMutation } from "./feature/loginReducer/authLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authloginDetails } from "./feature/loginReducer/loginReducer";

const Login = () => {
  const [authlogin, { data, isSuccess, isError, error }] =
    useAuthloginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const init = {
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
      authlogin(formValue);
      console.log("data:", formValue);
    }
  }, [formError, isSubmit, formValue, authlogin]);

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
      dispatch(authloginDetails(data?.data));
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
  }, [isSuccess, isError, navigate, dispatch, error, data]);
  return (
    <div className="container">
      <div className="m-5 card p-3">
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

export default Login;
