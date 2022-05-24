import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardGroup from "../../components/common/cardGroup/CardGroup";
import NotFound from "../../components/common/NotFound";
import SortWrapper from "../../components/common/sortWrapper/SortWrapper";
import { commonActions } from "../../store/actions";
import { productActions } from "../../store/actions/productActions";

function StoreProductList(props) {
	const dispatch = useDispatch();
	// Data
	const { searchWord } = useParams();
	const products = useSelector((state) => state.product.products);

	useEffect(() => {
		// Adding reversed as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 24 };
		}
		if (sortInfo.reversed === undefined) {
			sortInfo = { ...sortInfo, reversed: true };
		}
		if (searchWord) {
			dispatch(
				productActions.getSortedProducts({
					...sortInfo,
					searchWord: searchWord,
				})
			);
		} else {
			dispatch(productActions.getSortedProducts(sortInfo));
		}
	}, []);

	// Table Sort Button Action
	const sortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(productActions.getSortedProducts(sortInfo));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: true,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 24,
	// 	orderBy: "Id",
	// };

	return (
		<>
			{commonActions.objectIsEmpty(products) ? (
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
					customPageButtonValues={[3, 6, 9, 12, 16, 20, 24]}
				>
					<CardGroup data={products} />
				</SortWrapper>
			)}
		</>
	);
}

export default StoreProductList;
