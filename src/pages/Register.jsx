import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    await axios.post(
      "http://localhost:5000/api/users/register",
      form
    );
    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">
          Register
        </h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

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
          onClick={handleRegister}
          className="bg-orange-500 text-white w-full py-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
