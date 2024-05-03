import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
    const initialFormData = {
        plate: "",
        manufacture: "",
        model: "",
        image: "",
        rentPerDay: "",
        capacity: "",
        description: "",
        availableAt: "",
        transmission: "",
        available: "",
        type: "",
        year: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData({ ...formData, image: imageFile });
    };

    const handleDescriptionChange = (e) => {
        const descriptionValue = e.target.value;
        setFormData({ ...formData, description: descriptionValue });
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            const imageFormData = new FormData();
            imageFormData.append("image", formData.image);
            const imageResponse = await axios.post("http://localhost:5000/api/v1/upload", imageFormData);
    
            const productData = {
                ...formData,
                image: imageResponse.data.imageUrl // Gunakan URL gambar yang dikembalikan dari backend
            };
            await axios.post("http://localhost:5000/api/v1/products", productData);
            navigate("/products");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    

    return (
        <div>
            <h1 className="title">Products</h1>
            <h2 className="subtitle">Add New Product</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveProduct}>
                            <p className="has-text-centered">{msg}</p>
                            {Object.entries(formData).map(([key, value]) => (
                                <div className="field" key={key}>
                                    <label className="label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                    <div className="control">
                                        {key === "image" ? (
                                            <input
                                                type="file"
                                                className="input"
                                                onChange={handleImageChange}
                                            />
                                        ) : key === "description" ? (
                                            <textarea
                                                className="textarea"
                                                onChange={handleDescriptionChange}
                                                placeholder="Description"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="input"
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="field">
                                <div className="control">
                                    <button
                                        type="submit"
                                        className="button is-success"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddProduct;
