import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const [Icon, setIcon] = useState();

  useEffect(() => {

    const checkMobile = () => {
      setIcon(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
  
    return () => window.removeEventListener("resize", checkMobile);
   
    
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className="h-screen md:w-[50vw] w-full bg-[#FFFFFF] text-black flex justify-center items-center flex-col">
        {Icon && <img src="/loginpage.png" alt="Login Illustration" className="absolute z-0 top-0"/>}
        <h3 className="font-semibold m-5 text-5xl">Login</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="h-[20vw] md:w-[30vw] w-[90vw]">
          <div className="my-4">
            <p className="font-sm opacity-30 my-1">Email Address</p>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#F1F3F6] w-full rounded-sm h-8 pl-2"
            />
          </div>
          <div className="">
            <p className="font-sm opacity-30 my-1">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#F1F3F6] w-full rounded-sm h-8 pl-2"
            />
          </div>
          <div className="flex justify-end py-2">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#FD7401] w-full h-10 rounded-sm hover:border-1 border-[#FD7401] cursor-pointer text-white font-semibold my-2 shadow-lg hover:shadow-none hover:bg-white hover:text-[#FD7401] shadow-[#FD7401] duration-200 transition-all"
            >
              Login Now
            </button>
          </div>
        </form>
      </div>
      <div>
       {!Icon && <img src="/loginpage.png" alt="Login Illustration" className=""/>}
      </div>
    </div>
  );
};

export default LoginPage;
