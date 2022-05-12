import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import Header from "../../components/header/Header";
import { productActions } from "../../store/actions/productActions";

function SellerProducts() {
	const dispatch = useDispatch();

	const seller = useSelector((state) => state.account.seller);

	// Table Data
	const products = useSelector((state) => state.product.products);
	useEffect(() => {
		dispatch(productActions.getSortedProductsByEntity("Seller", listSorting, seller.id));
	}, []);

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldCommentReply) => {
		dispatch(
			productActions.deleteCommentReply(
				oldCommentReply.id,
				productActions.getSortedProductsByEntity("Seller", sortInfo, seller.id)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		if (seller && seller.id) {
			listSorting = { ...listSorting, ...listSortingValues };
			dispatch(productActions.getSortedProductsByEntity("Seller", listSorting, seller.id));
		}
	};
	// Default Sort Values
	let listSorting = {
		reversed: false,
		searchWord: "",
		pageNumber: 1,
		pageSize: 20,
		orderBy: "Id",
	};
	// Sort Data from API
	const sortInfo = useSelector((state) => state.common.SortInfo);

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
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
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
