import React, { useState } from 'react';
import './style.css';
import { auth, db } from './firebase';

const WingsCafeInventorySystem = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([{ username: 'admin', password: 'admin123' }]); // Sample admin user
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Login function
    const handleLogin = (e) => {
        e.preventDefault();
        setIsAuthenticated(true);
        setCurrentUser(loginUsername);
        setLoginUsername('');
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
        const newUser = { username: username.trim(), password: password.trim() };
        setUsers([...users, newUser]);
        setUsername('');
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
        const updatedProducts = [...products];
        if (updatedProducts[index].quantity > 0) {
            updatedProducts[index].quantity -= 1; // Reduce quantity by 1
            setProducts(updatedProducts);
        } else {
            alert("Stock is empty!");
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

    // Update stock function
    const updateStock = (index) => {
        const newQuantity = parseInt(prompt("Enter the new stock quantity:"), 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            const updatedProducts = [...products];
            updatedProducts[index].quantity = newQuantity;
            setProducts(updatedProducts);
        } else {
            alert("Please enter a valid number.");
        }
    };

    // Delete product function
    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    if (!isAuthenticated) {
        return (
            <div className="login-container">
                <h1>Login to Wings Cafe Inventory System</h1>
                <form onSubmit={handleLogin}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
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
                                    <button className="action-button update-stock" onClick={() => updateStock(index)}>Update Stock</button>
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
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>
                                    <button className="action-button delete">Delete</button>
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
