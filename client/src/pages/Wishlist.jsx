import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const remove = (id) => {
    const updated = wishlist.filter((i) => i._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-6">
        <h1 className="text-2xl font-bold mb-6">
          Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((p) => (
              <div key={p._id} className="bg-white p-4 shadow rounded">
                <img
                  src={`https://kitchenpro-backend.onrender.com${p.image}`}
                  className="h-40 w-full object-cover rounded"
                />

                <h3 className="mt-2 font-semibold">{p.name}</h3>

                <p className="text-gray-500 text-sm">
                  {p.description}
                </p>

                <p className="text-orange-500 font-bold">
                  ₹{p.price}
                </p>

                <button
                  onClick={() => remove(p._id)}
                  className="mt-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;