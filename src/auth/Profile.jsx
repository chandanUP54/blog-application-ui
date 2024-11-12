import React, { useContext, useEffect, useState } from "react";
import { BASE_API_URL } from "./url";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const jwt = localStorage.getItem("accessJwt");
  const [profile, setProfile] = useState({});
  const { isTokenExpired, handleLogout} = useContext(AuthContext);

  useEffect(() => {
    if (jwt && isTokenExpired(jwt)) {
      handleLogout();
    }

    fetch(`${BASE_API_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProfile(data);
       
        console.log(data.email);
        
      });
  }, [jwt]);

  return (
    <div className="text-white py-32 text-center flex flex-col justify-center	items-center	">
      <h2 className="text-xl font-semibold text-gray-800">{profile.email}</h2>
      {profile.roles && profile.roles.length > 0 ? (
        <h3 className="mt-2 text-md text-gray-600">
          {profile.roles.map((role) => role.name).join(", ")}
        </h3>
      ) : (
        <h3 className="mt-2 text-md text-gray-600">No Roles Assigned</h3>
      )}
      <a href="/">Home</a>
      <button
        onClick={handleLogout}
        className="mt-4 p-4 w-1/10	 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
