import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orderRes = await axios.get("http://localhost:5000/api/orders");
    const productRes = await axios.get("http://localhost:5000/api/products");

    setOrders(orderRes.data);
    setProducts(productRes.data);
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-10">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-orange-500">
            ₹{totalRevenue}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">
            Total Orders
          </h3>
          <p className="text-2xl font-bold">
            {orders.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">
            Total Products
          </h3>
          <p className="text-2xl font-bold">
            {products.length}
          </p>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        {orders.slice(0, 5).map((order) => (
          <div
            key={order._id}
            className="border-b py-3"
          >
            <p>
              ₹{order.total} — {order.orderStatus}
            </p>
          </div>
        ))}
      </div>

    </AdminLayout>
  );
}

export default Admin;
