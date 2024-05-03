import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/products");
            setProducts(response.data.products);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/products/${productId}`);
            getProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div>
            <h1 className="title">Products</h1>
            <h2 className="subtitle">List of Products</h2>
            <Link to="/products/add" className="button is-primary mb-2">
                Add New
            </Link>
            {loading ? (
                <p>Loading...</p> // Show loading message while data is being fetched
            ) : (
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Plate</th>
                            <th>Rental Per Day</th>
                            <th>Model</th>
                            <th>Manufacture</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.uuid}>
                                <td>{index + 1}</td>
                                <td>{product.plate}</td>
                                <td>{product.rentPerDay}</td>
                                <td>{product.model}</td>
                                <td>{product.manufacture}</td>
                                <td>
                                    <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info">
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
