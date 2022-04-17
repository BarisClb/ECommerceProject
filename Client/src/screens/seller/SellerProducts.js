import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "../../components/table/Table";
import { productActions } from "../../store/actions/productActions";
import Header from "../../components/header/Header";

function SellerProducts() {
	// Data
	const products = useSelector((state) => state.product.products);

	// Params
	const { id } = useParams();
	// Actions
	console.log(id);
	const dispatch = useDispatch();
	useEffect(() => {
		if (typeof id == "number") {
			dispatch(productActions.getProductsBySeller(id));
		}
	}, []);

	return (
		<div className="">
			<Header title={"Products"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={products}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Category"}
					tableHead3={"Unit Price"}
					tableHead4={"Units In Stock"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"category"}
					tableData3={"unitPrice"}
					tableData4={"unitsInStock"}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableUpdateButton={false}
					tableDeleteButton={false}
					// Table Button Actions
					tableAddButtonClick={false}
					// Nav
					isNav={true}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Action
					navAddButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
					// Special
					isCart={false}
					instaSearch={false}
				/>
			</div>
		</div>
	);
}

export default SellerProducts;
