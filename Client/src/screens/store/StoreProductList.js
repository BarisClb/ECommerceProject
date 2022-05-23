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
		if (searchWord) {
			dispatch(
				productActions.getSortedProducts({
					...listSorting,
					searchWord: searchWord,
				})
			);
		} else {
			dispatch(productActions.getSortedProducts(listSorting));
		}
	}, []);

	// Table Sort Button Action
	const sortButtonClick = (listSortingValues) => {
		listSorting = { ...listSorting, ...listSortingValues };
		dispatch(productActions.getSortedProducts(listSorting));
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
