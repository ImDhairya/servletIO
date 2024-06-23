// Importing necessary components and hooks
import {LockClosedIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import Button from "./utils/Button";
import Input from "./utils/Input";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";

// Component for the Login page
const Login = () => {
  // State to manage input data (username and password)
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [registered, setRegistered] = useState(false);

  // Function to update state when input data changes
  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", data);
      console.log("Login successful:", response.data);
      // Perform any further actions upon successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = () => {
    setRegistered(!registered);
    console.log(registered);
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen">
      <h1 className="text-3xl font-bold">FreeAPI Chat App</h1>
      <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
        <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
          <LockClosedIcon className="h-8 w-8 mb-2" /> Login
        </h1>
        {/* Input for entering the username */}
        <Input
          placeholder="Enter the username..."
          value={data.username}
          onChange={handleDataChange("username")}
        />
        {/* Input for entering the password */}
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
        />
        {/* Button to initiate the login process */}
        <Button
          disabled={Object.values(data).some((val) => !val)}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Button to the registration page */}
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
};

export default Login;
