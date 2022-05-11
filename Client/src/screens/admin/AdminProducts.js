import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { productActions } from "../../store/actions/productActions";
import { useSelector } from "react-redux";

const AdminProducts = () => {
	const dispatch = useDispatch();

	// Table Data
	const products = useSelector((state) => state.product.products);
	useEffect(() => {
		dispatch(productActions.getSortedProducts(listSorting));
	}, []);

	// Nav Form Actions
	const navCreateProductClick = async (newProduct) => {
		dispatch(
			productActions.createProduct(newProduct, productActions.getSortedProducts(sortInfo))
		);
	};
	const navUpdateProductClick = (productId, updatedProduct) => {
		dispatch(
			productActions.updateProduct(
				productId,
				updatedProduct,
				productActions.getSortedProducts(sortInfo)
			)
		);
	};
	const navDeleteProductClick = (oldProduct) => {
		dispatch(
			productActions.deleteProduct(oldProduct, productActions.getSortedProducts(sortInfo))
		);
	};

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldProduct) => {
		dispatch(
			productActions.deleteProduct(oldProduct.id, productActions.getSortedProducts(sortInfo))
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		listSorting = { ...listSorting, ...listSortingValues };
		dispatch(productActions.getSortedProducts(listSorting));
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
		<div id="admin-product-screen-wrapper">
			<Header title={"Products"} />
			<div id="admin-product-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={products}
					//// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Description"}
					tableHead3={"Category"}
					tableHead4={"Seller"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"description"}
					tableData3={"categoryName"}
					tableData4={"sellerUsername"}
					// Special
					isAdmin={true}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Product"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateProductClick}
					navUpdateButtonClick={navUpdateProductClick}
					navDeleteButtonClick={navDeleteProductClick}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"Name"}
					tableSortBy3={"Price"}
					tableSortBy4={"Category"}
					tableSortByValue4={"CategoryName"}
					tableSortBy5={"Seller"}
					tableSortByValue5={"SellerUsername"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
};

export default AdminProducts;
