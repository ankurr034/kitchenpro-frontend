import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-24 px-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow mb-6"
            >
              <p className="font-semibold">
                Order Date: {order.date}
              </p>
              <p>Total: ₹{order.total}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p>
                Address: {order.address.name},{" "}
                {order.address.addressLine},{" "}
                {order.address.city} -{" "}
                {order.address.pincode}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
