import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      form
    );

    localStorage.setItem("userToken", res.data.token);
    localStorage.setItem(
      "userInfo",
      JSON.stringify(res.data.user)
    );

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">
          Login
        </h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="bg-orange-500 text-white w-full py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
