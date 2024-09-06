import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const UserDetails = () => {
  const [user, setUser] = useState({ name: "", username: "", email: "", website:"",phone:"",company:"" });
  const [loading, setLoading] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(user)

  useEffect(() => {
    setLoading(1)
    axios.get(API + `/${id}`).then((res) => {
      console.log(res.data),
        setUser({
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          website:res.data.website,
          phone:res.data.phone,
          company:res.data.company
        });
        setLoading(0)
    });
  }, []);
  return (
    <>
      <div className="text-center mt-4 p-3">
        <h1 className="bg-info">User Details (Id: {id})</h1>
        {(!loading && user)? (
          <div className=" m-auto">
           <p>Username: {user.username}</p>
           <p>Name: {user.name}</p>
           <p>Email: {user.email}</p>
           <p>Website: {user.website}</p>
           <p>Phone: {user.phone}</p>
           <p>Company: {user.company.name}</p>
          </div>
         ) : (
          <Spinner />
        )} 
        <br />
        <div className="btn btn-primary" onClick={()=>navigate("/users")}>Go to users page</div>
      </div>
    </>
  );
};

export default UserDetails;
