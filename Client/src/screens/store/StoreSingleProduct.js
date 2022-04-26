import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DummySingleProduct from "../../components/store/DummySingleProduct";
import ProductNotFound from "../../components/store/ProductNotFound";
import SingleProduct from "../../components/store/SingleProduct";
import { productActions } from "../../store/actions/productActions";
import { categoryActions } from "../../store/actions/categoryActions";

function StoreSingleProduct() {
	// DATA
	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productActions.getProducts(id));
	}, []);

	// const product = useSelector((state) => state.product.singleProduct);

	// DELETE AFTER MODELLING
	const product = {
		id: 5,
		name: "Product Name",
		description: "Product Description",
		price: 1000.0,
		stock: 100,
	};

	return (
		<>
			{id === "0" ? (
				<DummySingleProduct />
			) : product.id === undefined ? (
				<ProductNotFound />
			) : (
				<SingleProduct product={product} />
			)}
		</>
	);
}

export default StoreSingleProduct;
