import React, { useState, useEffect } from 'react';
import './style.css';
import { auth, db } from './firebase';

const WingsCafeInventorySystem = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([{ email: 'admin@example.com', password: 'admin123' }]); // Sample admin user
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Images for rotation
    const images = [
        './Assets/bagger.jpg',
        './Assets/image2.jpg',
        './Assets/image3.jpg',
        './Assets/image4.jpg',
        './Assets/image5.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Login function
    const handleLogin = (e) => {
        e.preventDefault();
        setIsAuthenticated(true);
        setCurrentUser(loginEmail);
        setLoginEmail('');
        setLoginPassword('');
    };

    // Logout function
    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    // Add a new user
    const addUser = (e) => {
        e.preventDefault();
        const newUser = { email: email.trim(), password: password.trim() };
        setUsers([...users, newUser]);
        setEmail('');
        setPassword('');
    };

    // Add a new product
    const addProduct = (e) => {
        e.preventDefault();
        const newProduct = { productName, description, category, price, quantity };
        setProducts([...products, newProduct]);
        setProductName('');
        setDescription('');
        setCategory('');
        setPrice(0);
        setQuantity(0);
    };

    // Sell stock function
    const sellStock = (index) => {
        const amountToSell = parseInt(prompt("Enter the amount of stock to sell:"), 10);
        if (!isNaN(amountToSell) && amountToSell > 0 && amountToSell <= products[index].quantity) {
            const updatedProducts = [...products];
            updatedProducts[index].quantity -= amountToSell;
            setProducts(updatedProducts);
        } else {
            alert("Please enter a valid amount within the available stock quantity.");
        }
    };

    // Add stock function
    const addStock = (index) => {
        const additionalStock = parseInt(prompt("Enter the amount of stock to add:"), 10);
        if (!isNaN(additionalStock) && additionalStock > 0) {
            const updatedProducts = [...products];
            updatedProducts[index].quantity += additionalStock;
            setProducts(updatedProducts);
        } else {
            alert("Please enter a valid number greater than 0.");
        }
    };

    // Update stock and price function
    const updateStockAndPrice = (index) => {
        const newQuantity = parseInt(prompt("Enter the new stock quantity:"), 10);
        const newPrice = parseFloat(prompt("Enter the new price:"), 10);
        if (!isNaN(newQuantity) && newQuantity >= 0 && !isNaN(newPrice) && newPrice >= 0) {
            const updatedProducts = [...products];
            updatedProducts[index].quantity = newQuantity;
            updatedProducts[index].price = newPrice;
            setProducts(updatedProducts);
        } else {
            alert("Please enter valid numbers for quantity and price.");
        }
    };

    // Delete product function
    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    // Delete user function
    const deleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="login-container">
                {/* Playing Pictures (Shown before login) */}
                <div className="playing-pictures">
                    <h2>Enjoy Our Collection</h2>
                    <div className="image-row">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Playing ${currentImageIndex + 1}`}
                            className="playing-image"
                        />
                    </div>
                </div>

                <h1>Login to Wings Cafe Inventory System</h1>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Welcome, {currentUser}</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>

            {/* Dashboard */}
            <div className="dashboard">
                <h2>Current Stock Levels</h2>
                <table id="inventoryTable">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className="action-button add-stock" onClick={() => addStock(index)}>Add Stock</button>
                                    <button className="action-button reduce-stock" onClick={() => sellStock(index)}>Sell Stock</button>
                                    <button className="action-button update-stock" onClick={() => updateStockAndPrice(index)}>Update Stock & Price</button>
                                    <button className="action-button delete-product" onClick={() => deleteProduct(index)}>Delete Product</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Product Management */}
            <div className="product-form">
                <h2>Product Management</h2>
                <form onSubmit={addProduct}>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                    <label>Initial Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                    />
                    <button type="submit" className="add-product-button">Add Product</button>
                </form>
            </div>

            {/* User Management */}
            <div className="user-management">
                <h2>User Management</h2>
                <form onSubmit={addUser}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="add-user-button">Add User</button>
                </form>
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>
                                    <button className="action-button delete-user" onClick={() => deleteUser(index)}>Delete User</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WingsCafeInventorySystem;
