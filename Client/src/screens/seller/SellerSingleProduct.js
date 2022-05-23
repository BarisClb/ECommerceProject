import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UnauthorizedPage from "../../components/common/UnauthorizedPage";
import SellerProduct from "../../components/seller/SellerProduct";
import { productActions } from "../../store/actions/productActions";
import { categoryActions } from "../../store/actions/categoryActions";

function SellerSingleProduct() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const seller = useSelector((state) => state.account.seller);
	const product = useSelector((state) => state.product.singleProduct);

	useEffect(() => {
		if (parseInt(id) !== 0) dispatch(productActions.getProducts(id));
		dispatch(categoryActions.getCategories());
	}, []);

	const createProduct = (newProduct) => {
		dispatch(productActions.createProduct(newProduct /*, productActions.getProducts(id)*/));
	};

	const updateProduct = (productId, newProduct) => {
		dispatch(productActions.updateProduct(productId, newProduct, productActions.getProducts(id)));
	};

	return (
		<>
			{parseInt(id) === 0 || seller.id === product.sellerId ? (
				<SellerProduct
					product={parseInt(id) === 0 ? { id: 0 } : product}
					createProduct={createProduct}
					updateProduct={updateProduct}
				/>
			) : (
				<div
					className="seller-unauthorized-wrapper"
					style={{ display: "flex", height: "calc(100vh - 50px)" }}
				>
					<UnauthorizedPage />
				</div>
			)}
		</>
	);
}

export default SellerSingleProduct;
