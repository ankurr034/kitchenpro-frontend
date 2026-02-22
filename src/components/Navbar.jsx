import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
      setCartCount(totalQty);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="fixed top-0 w-full bg-white shadow z-50">
      <div className="flex justify-between items-center px-4 md:px-10 py-4">

        <Link to="/" className="text-xl font-bold text-orange-500">
          KitchenPro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/orders">Orders</Link>

          <Link to="/cart" className="relative">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span>Hello {user.name}</span>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          <Link to="/admin">Admin</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-white shadow">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/orders" onClick={() => setOpen(false)}>Orders</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart ({cartCount})</Link>

          {user ? (
            <>
              <span>Hello {user.name}</span>
              <button onClick={logout} className="text-red-500 text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}

          <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
