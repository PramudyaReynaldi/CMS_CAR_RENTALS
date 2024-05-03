import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
    const [manufacture, setManufacture] = useState("");
    const [model, setModel] = useState("");
    const [rentPerDay, setRentPerDay] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [transmission, setTransmission] = useState("");
    const [type, setType] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/products/${id}`
                );
                const productData = response.data;
                setManufacture(productData.manufacture);
                setModel(productData.model);
                setRentPerDay(productData.rentPerDay);
                setCapacity(productData.capacity);
                setDescription(productData.description);
                setTransmission(productData.transmission);
                setType(productData.type);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getProductById();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/v1/products/${id}`, {
                manufacture,
                model,
                rentPerDay,
                capacity,
                description,
                transmission,
                type,
            });
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
            <h2 className="subtitle">Edit Product</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateProduct}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Manufacture</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={manufacture}
                                        onChange={(e) =>
                                            setManufacture(e.target.value)
                                        }
                                        placeholder="Manufacture"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Model</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={model}
                                        onChange={(e) =>
                                            setModel(e.target.value)
                                        }
                                        placeholder="Model"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Rental Per Day</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={rentPerDay}
                                        onChange={(e) =>
                                            setRentPerDay(e.target.value)
                                        }
                                        placeholder="Rental Per Day"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Capacity</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={capacity}
                                        onChange={(e) =>
                                            setCapacity(e.target.value)
                                        }
                                        placeholder="Capacity"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="Description"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Transmission</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={transmission}
                                        onChange={(e) =>
                                            setTransmission(e.target.value)
                                        }
                                        placeholder="Transmission"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Type</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={type}
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }
                                        placeholder="Type"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button
                                        type="submit"
                                        className="button is-success"
                                    >
                                        Update
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

export default FormEditProduct;
