import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import Header from "../../components/header/Header";
import { productActions } from "../../store/actions/productActions";
import { useNavigate } from "react-router-dom";

function SellerProducts() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const seller = useSelector((state) => state.account.seller);

	// Table Data
	const products = useSelector((state) => state.product.products);
	useEffect(() => {
		// Adding pageSize and reversed as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		if (sortInfo.reversed === undefined) {
			sortInfo = { ...sortInfo, reversed: true };
		}
		dispatch(productActions.getSortedProductsByEntity("Seller", sortInfo, seller.id));
	}, []);

	// Table Side Button Actions
	const tableUpdateButtonClick = (product) => {
		navigate(`/seller/product/${product.id}`);
	};
	const tableDeleteButtonClick = (product) => {
		dispatch(
			productActions.deleteProduct(
				product.id,
				productActions.getSortedProductsByEntity("Seller", sortInfo, seller.id)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		if (seller && seller.id) {
			sortInfo = { ...sortInfo, ...listSortingValues };
			dispatch(productActions.getSortedProductsByEntity("Seller", sortInfo, seller.id));
		}
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: true,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

	return (
		<div className="seller-product-screen-wrapper">
			<Header title={"Products"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={products}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Category"}
					tableHead3={"Price"}
					tableHead4={"Stock"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"categoryName"}
					tableData3={"price"}
					tableData4={"stock"}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={true}
					tableDeleteButton={true}
					// Table Button Clicks
					tableUpdateButtonClick={tableUpdateButtonClick}
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Table Custom Buttons
					// Nav
					isNav={"Product"}
					navCreateButton={false}
					navUpdateButton={false}
					navDeleteButton={false}
					// Nav Action
					navCreateButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Date"}
					tableSortBy2={"Name"}
					tableSortBy3={"Price"}
					tableSortBy4={"Category"}
					tableSortByValue4={"CategoryName"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default SellerProducts;
