import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardGroup from "../../components/common/cardGroup/CardGroup";
import NotFound from "../../components/common/NotFound";
import SortWrapper from "../../components/common/sortWrapper/SortWrapper";
import { productActions } from "../../store/actions/productActions";
import { commonActions } from "../../store/actions/commonActions";
import DummyProductList from "../../components/store/DummyProductList";

function StoreProductsByCategory() {
	const dispatch = useDispatch();

	// Data
	const { id } = useParams();
	const products = useSelector((state) => state.product.products);
	useEffect(() => {
		dispatch(productActions.getSortedProductsByEntity("Category", listSorting, id));
	}, []);

	// Table Sort Button Action
	const sortButtonClick = (listSortingValues) => {
		listSorting = { ...listSorting, ...listSortingValues };
		dispatch(productActions.getSortedProductsByEntity("Category", listSorting, id));
	};
	// Default Sort Values
	let listSorting = {
		reversed: true,
		searchWord: "",
		pageNumber: 1,
		pageSize: 24,
		orderBy: "Id",
	};
	// Sort Data from API
	const sortInfo = useSelector((state) => state.common.SortInfo);

	return (
		<>
			{id === "0" ? (
				<SortWrapper listSorting={listSorting}>
					<DummyProductList />
				</SortWrapper>
			) : commonActions.objectIsEmpty(products) ? (
				<NotFound item={"Product"} noNav={true} />
			) : (
				<SortWrapper
					sortInfo={sortInfo}
					sortBy1={"Date"}
					sortBy2={"Name"}
					sortBy3={"Price"}
					sortBy4={"Category"}
					sortByValue4={"CategoryName"}
					sortAction={sortButtonClick}
					customPageButtonValues={[3, 6, 9, 12, 15, 24]}
				>
					<CardGroup data={products} />
				</SortWrapper>
			)}
		</>
	);
}

export default StoreProductsByCategory;
