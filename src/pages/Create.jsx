import axios from "axios";
import React, { useState } from "react";
import { API } from "../api";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [user, setUser] = useState({ name: "", username: "", email: "" });
  const [loading, setLoading] = useState(0);
 const navigate=useNavigate();
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  const sumbitHandle = async (e) => {
    e.preventDefault();
    setLoading(1)
    try {
      if (!user.name || !user.username || !user.email) {
        throw new Error("All field required");
      }
      const res = await axios.post(API, user);
      if (res.status == 201) {
        toast.success(`User create succesfully with id : ${res.data.id}`);
        setUser({ name: "", username: "", email: "" });
        setLoading(0)
      } else {
        throw new Error("Error during register");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(0)
    }
  };
  return (
<div className="text-center mt-4 p-3">
      <h1 className="bg-info">Enter New User</h1>
     {!loading? <form onSubmit={sumbitHandle}>
        <input
          type="text"
          className="col-10 col-lg-6 my-2"
          name="username"
          placeholder="Enter the username"
          value={user.username}
          onChange={changeHandle}
          required
        />
        <br />
        <input
          type="text"
          className="col-10 col-lg-6 my-2"
          name="name"
          placeholder="Enter the name"
          value={user.name}
          onChange={changeHandle}
          required
        />
        <br />

        <input
          type="email"
          className="col-10 col-lg-6 my-2"
          name="email"
          placeholder="Enter the email"
          value={user.email}
          onChange={changeHandle}
          required
        />
        <br />
        <input type="submit" className="btn btn-primary" required />
        <div className="btn btn-primary m-3" onClick={()=>navigate("/users")}>Go to users page</div>
      </form>:<Spinner/>}
    </div>
  );
};

export default Create;
