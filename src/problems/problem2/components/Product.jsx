import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Product.css';
import { LifeLine } from 'react-loading-indicators';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const fetchProduct = async () => {
        setLoading(true);
        const resp = await fetch('https://dummyjson.com/products');
        const data = await resp.json();
        setProducts(data.products || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className="product-list" style={{ position: "relative" }}>
            <h2>Product List</h2>
            {loading && (
                <div className="product-loader-overlay">
                    <LifeLine color="#32cd32" size="large" text="" textColor="" />
                </div>
            )}
            <div className="pagination__container">
                <span 
                className=''
                style={{ cursor: "pointer", display: page === 1 ? "none" : "inline" }}
                onClick={() => setPage(page !== 1 ? page - 1 : page)}
                >⬅️</span>
                {
                    Array(Math.ceil(products.length / itemsPerPage)).fill().map((_, index) => (
                        <button
                            key={index}
                            className={
                                "pagination__button" +
                                (page === index + 1 ? " page_active" : "")
                            }
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))
                }
                <span 
                className='' 
                style={{ cursor: "pointer", display: page >= (products.length / itemsPerPage) ? "none" : "inline" }}
                onClick={() => setPage(page < (products.length / itemsPerPage) ? page + 1 : page)}
                >➡️</span>
            </div>
            <div className="product__container" style={{ filter: loading ? "blur(2px)" : "none" }}>
                {products.length > 0 && !loading && (
                    products.slice(page*itemsPerPage-itemsPerPage,page*itemsPerPage).map(product => (
                        <motion.div
                            className="product__single"
                            key={product.id}
                            whileHover={{
                                rotateY: 10,
                                rotateX: 10,
                                scale: 1.06,
                                boxShadow: "0 8px 32px rgba(26,35,126,0.13), 0 2px 8px rgba(26,35,126,0.07)"
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            style={{ perspective: 1000 }}
                        >
                            <div className="product__img-container">
                                <motion.img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="product__img"
                                    whileHover={{
                                        scale: 1.15,
                                        filter: "brightness(0.7) blur(1px)"
                                    }}
                                    transition={{ duration: 0.4 }}
                                />
                                <motion.div
                                    className="product__overlay"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p>{product.description}</p>
                                </motion.div>
                            </div>
                            <h3>{product.title}</h3>
                            <p className="product__price">Price: ${product.price}</p>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Product;