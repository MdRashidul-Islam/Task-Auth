import React from "react";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>{user.displayName}</h1>
      <h1>{user.email}</h1>
    </div>
  );
};

export default Home;
