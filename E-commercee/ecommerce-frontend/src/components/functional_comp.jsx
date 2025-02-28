import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false); // To toggle the form visibility
  const [formType, setFormType] = useState("login"); // To switch between login and signup
  const navigate = useNavigate();

  // Handle dropdown selection
  const handleSelection = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "login" || selectedValue === "signup") {
      setFormType(selectedValue);
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  // Login Form Component
  const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token); // Store JWT token in localStorage
        alert("Login successful!");
        navigate("/"); // Redirect to home page after login
      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || "An error occurred");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="abs">
        <h3 className="text-xl font-semibold mb-3">Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>
    );
  };

  // Signup Form Component
  const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5001/api/auth/signup", { email, password, username });
        localStorage.setItem("token", res.data.token); // Store JWT token in localStorage
        alert("Signup successful!");
        navigate("/"); // Redirect to home page after signup
      } catch (error) {
        console.error("Signup failed:", error.response?.data?.message || "An error occurred");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="abs">
        <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    );
  };

  // Sidebar Component
  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <ul>
            <li className="jjj">WELCOME 👋</li>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><Link to="/contact">Products</Link></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className="navbar">
        <img src="/src/assets/photo_5875268992254460676_y (1).jpg" alt="Logo" width="200" className="img" />
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <select id="menu" onChange={handleSelection} className="logo">
          <option value="">JOIN US</option>
          <option value="login">Login</option>
          <option value="signup">Sign Up</option>
        </select>

        {/* Display Login or Signup Form */}
        {showForm && (
          <section className="pp">
            {formType === "login" ? <LoginForm /> : <SignupForm />}
          </section>
        )}

        <Sidebar />
      </nav>

      {/* Rest of your code */}
      <h1 className="ll">Fast Food Delivery <br /> For Everyone!</h1>
      <p className="oo">
        Fast foods you want, where you want it. One of the best fast foods in town and the fastest delivery
        guys eagerly waiting to serve you! All with a click of a button.
      </p>
      <img src="/src/assets/ll.png" className="tt" alt="Food Delivery" />
      <h2 className="ii">"Made with Love, Served with Flavor - A Bite of Happiness in Every Dish!" 🍽️❤️</h2>

      {/* Food items list */}
      <ul className="container">
        {/* Your food items here */}
      </ul>

      <Link to="/han">
        <button className="md">Order Here</button>
      </Link>
    </>
  );
};

export default Navbar;