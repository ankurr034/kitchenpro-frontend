import { useNavigate } from "react-router-dom";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-10">
          KitchenPro Admin
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/admin")}
            className="block w-full text-left hover:text-orange-400"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin-products")}
            className="block w-full text-left hover:text-orange-400"
          >
            Manage Products
          </button>

          <button
            onClick={() => navigate("/admin-orders")}
            className="block w-full text-left hover:text-orange-400"
          >
            Manage Orders
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminAuth");
              navigate("/admin-login");
            }}
            className="block w-full text-left text-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;
