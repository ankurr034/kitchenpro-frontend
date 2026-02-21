import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
  FaUtensils,
  FaBox,
  FaPlug,
  FaCut,
  FaTools,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://kitchenpro-backend.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <Navbar />

      {/* CONTENT WRAPPER */}
      <div className="pt-20">

        {/* HERO */}
        <div
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/images/kitchenbg.png')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Upgrade Your Kitchen Experience
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Premium utensils crafted for modern homes.
            </p>
            <button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="bg-orange-500 px-8 py-3 rounded-full text-lg hover:bg-orange-600 transition"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="py-20 bg-gray-50 px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Featured Products
            </h2>
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-4"
              >
                {product.image && (
                  <img
                    src={`https://kitchenpro-backend.onrender.com${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="font-semibold text-lg mb-2">
                  {product.name}
                </h3>

                <p className="text-orange-600 font-bold text-lg mb-3">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SHOP BY CATEGORY */}
        <div className="py-24 bg-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Shop by Category
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-4"></div>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-6 gap-8 px-6">

            <CategoryCard icon={<FaUtensils />} title="Cookware" items="150+ Items" />
            <CategoryCard icon={<FaCut />} title="Cutlery" items="80+ Items" />
            <CategoryCard icon={<FaBox />} title="Bakeware" items="120+ Items" />
            <CategoryCard icon={<FaTools />} title="Kitchen Tools" items="200+ Items" />
            <CategoryCard icon={<FaBox />} title="Storage" items="90+ Items" />
            <CategoryCard icon={<FaPlug />} title="Appliances" items="60+ Items" />

          </div>
        </div>

        {/* WHY CHOOSE */}
        <div className="py-20 bg-white px-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Why Choose KitchenPro?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-10 text-center">
            <Feature icon={<FaTruck />} title="Free Shipping" desc="Free delivery on orders over ₹500 across India" />
            <Feature icon={<FaShieldAlt />} title="Quality Guarantee" desc="30-day money-back guarantee on all products" />
            <Feature icon={<FaHeadset />} title="24/7 Support" desc="Round-the-clock customer support" />
            <Feature icon={<FaCreditCard />} title="Secure Payment" desc="Multiple secure payment options available" />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-slate-800 text-gray-300 pt-16 pb-8 px-10">
          <div className="grid md:grid-cols-4 gap-10 mb-10">

            <div>
              <h3 className="text-white text-xl font-bold mb-4">
                KitchenPro
              </h3>
              <p className="text-sm mb-4">
                Your trusted partner for premium kitchen utensils and cookware.
              </p>
              <div className="flex gap-4 text-lg">
                <FaFacebookF className="hover:text-orange-500 cursor-pointer" />
                <FaTwitter className="hover:text-orange-500 cursor-pointer" />
                <FaInstagram className="hover:text-orange-500 cursor-pointer" />
                <FaLinkedinIn className="hover:text-orange-500 cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/">Home</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/admin">Admin</a></li>
                <li><a href="/orders">Orders</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>Track Order</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="flex items-center gap-3 mb-3 text-sm">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>Patna</span>
              </div>
              <div className="flex items-center gap-3 mb-3 text-sm">
                <FaPhoneAlt className="text-orange-500" />
                <span>9576909867</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaEnvelope className="text-orange-500" />
                <span>ankurr2712@gmail.com</span>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-600 pt-6 text-center text-sm">
            © 2024 KitchenPro. All rights reserved.
          </div>
        </footer>

      </div>
    </div>
  );
}

function CategoryCard({ icon, title, items }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition text-center">
      <div className="text-5xl text-orange-500 mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm mt-2">{items}</p>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div>
      <div className="bg-orange-500 text-white w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-4 text-3xl">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}

export default Home;
