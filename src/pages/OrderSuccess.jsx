import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  const { orderId, total } = state;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-lg shadow text-center w-96">

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-green-500 text-6xl mb-6"
        >
          ✔
        </motion.div>

        <h1 className="text-2xl font-bold mb-4">
          Order Placed Successfully!
        </h1>

        <p className="mb-2">
          Order ID:
        </p>

        <p className="font-semibold text-gray-700 mb-4">
          {orderId}
        </p>

        <p className="mb-6">
          Total Paid: <strong>₹{total}</strong>
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-5 py-2 rounded"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-500 text-white px-5 py-2 rounded"
          >
            View My Orders
          </button>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
