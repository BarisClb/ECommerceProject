import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UnauthorizedPage from "../../components/common/UnauthorizedPage";
import SellerProduct from "../../components/seller/SellerProduct";
import { productActions } from "../../store/actions/productActions";

function SellerSingleProduct() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const seller = useSelector((state) => state.account.seller);
	const product = useSelector((state) => state.product.singleProduct);

	useEffect(() => {
		dispatch(productActions.getProducts(id));
	}, []);

	return (
		<>
			{id === 0 || seller.id === product.sellerId ? (
				<SellerProduct />
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
