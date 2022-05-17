import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../../components/common/NotFound";
import DummySingleProduct from "../../components/store/DummySingleProduct";
import SingleProduct from "../../components/store/SingleProduct";
import { commonActions } from "../../store/actions";
import { productActions } from "../../store/actions/productActions";

function StoreSingleProduct() {
	// DATA
	const { id } = useParams();
	const productPageData = useSelector((state) => state.product.singleProduct);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productActions.getProductPage(id));
	}, []);
	console.log(productPageData);
	return (
		<>
			{id === "0" ? (
				<DummySingleProduct />
			) : commonActions.objectIsEmpty(productPageData) ? (
				<NotFound item={"Product"} noNav={true} />
			) : (
				<SingleProduct productPageData={productPageData} />
			)}
		</>
	);
}

export default StoreSingleProduct;
