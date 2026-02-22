import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const increase = (i) => {
    const updated = [...cart];
    updated[i].quantity += 1;
    updateCart(updated);
  };

  const decrease = (i) => {
    const updated = [...cart];
    if (updated[i].quantity > 1) {
      updated[i].quantity -= 1;
      updateCart(updated);
    }
  };

  const remove = (i) => {
    updateCart(cart.filter((_, idx) => idx !== i));
  };

  const total = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const saveOrder = async (status) => {
    const res = await axios.post("https://kitchenpro-backend.onrender.com/api/orders", {
      items: cart,
      total: total(),
      address,
      paymentMethod,
      paymentStatus: status,
    });

    localStorage.removeItem("cart");

    navigate("/order-success", {
      state: { orderId: res.data._id, total: total() },
    });
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "COD") saveOrder("Pending");
    else handleOnlinePayment();
  };

  const handleOnlinePayment = async () => {
    const { data } = await axios.post(
      "https://kitchenpro-backend.onrender.com/api/payment/create-order",
      { amount: total() }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async () => saveOrder("Paid"),
    };

    new window.Razorpay(options).open();
  };

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 md:px-10 lg:px-16 bg-gray-100 min-h-screen">

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 md:p-5 rounded shadow flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-600">
                      ₹{item.price}
                    </p>

                    <div className="flex gap-3 mt-3 items-center">
                      <button
                        onClick={() => decrease(i)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increase(i)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => remove(i)}
                      className="text-red-500 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ADDRESS + PAYMENT */}
            <div className="bg-white p-5 md:p-6 rounded shadow space-y-4 h-fit">

              <h2 className="font-bold text-lg">Delivery Address</h2>

              <input
                placeholder="Name"
                className="border p-2 w-full rounded"
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                className="border p-2 w-full rounded"
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />

              <textarea
                placeholder="Full Address"
                className="border p-2 w-full rounded"
                onChange={(e) =>
                  setAddress({
                    ...address,
                    addressLine: e.target.value,
                  })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="City"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />

                <input
                  placeholder="Pincode"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>

              <h2 className="font-bold mt-3">Payment Method</h2>

              <label className="flex gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              <label className="flex gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI / Card
              </label>

              <div className="border-t pt-3">
                <p className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₹{total()}</span>
                </p>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-orange-500 text-white py-3 mt-3 rounded hover:bg-orange-600"
                >
                  Place Order
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
