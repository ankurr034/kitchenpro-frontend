import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("https://kitchenpro-backend.onrender.com/api/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(`https://kitchenpro-backend.onrender.com/api/orders/${id}`, {
      status,
    });
    fetchOrders();
  };

  return (
    <div>
      <Navbar />
      <div className="pt-24 px-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">
          Admin Order Management
        </h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-lg shadow mb-6"
          >
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Current Status:</strong> {order.orderStatus}</p>

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border p-2 mt-3"
            >
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
