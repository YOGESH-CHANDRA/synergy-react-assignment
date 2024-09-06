import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const Update = () => {
  const [user, setUser] = useState({ name: "", username: "", email: "" });
  const [loading, setLoading] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  const sumbitHandle = async (e) => {
    e.preventDefault();
    setLoading(1);
    try {
      if (!user.name || !user.username || !user.email) {
        throw new Error("All field required");
      }
      const res = await axios.put(API + `/${id}`, user);
      if (res.status == 200) {
        toast.success(`User id :  ${res.data.id} update succesfully `);
        setUser({ name: "", username: "", email: "" });
        setLoading(0);
        navigate("/users");
      } else {
        throw new Error("Error during register");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(0);
    }
  };

  useEffect(() => {
    axios.get(API + `/${id}`).then((res) => {
      console.log(res.data),
        setUser({
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
        });
    });
  }, []);
  return (
    <>
      <div className="text-center mt-4 p-3">
        <h1 className="bg-info">Update User Details</h1>
        {!loading ? (
          <form onSubmit={sumbitHandle} className="m-auto">
            <input
              type="text"
              className="col-10 col-lg-6 my-2"
              name="username"
              placeholder="Enter the username"
              value={user.username}
              onChange={changeHandle}
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
            />
            <br />
            <input
              type="submit"
              className="btn btn-primary"
              required
              autoComplete="true"
            />
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Update;
