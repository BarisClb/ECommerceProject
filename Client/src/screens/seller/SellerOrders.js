import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "../../components/table/Table";
import { productActions } from "../../store/actions/productActions";
import Header from "../../components/header/Header";

function SellerOrders() {
	// Data
	const orders = useSelector((state) => state.product.orders);

	// Params
	const { id } = useParams();
	// Actions
	const dispatch = useDispatch();
	useEffect(() => {
		if (typeof id == "number") {
			dispatch(productActions.getOrdersBySeller(id));
		}
	}, []);

	return (
		<div className="">
			<Header title={"Orders"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={orders}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"User"}
					tableHead3={false}
					tableHead4={false}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"product"}
					tableData2={"user"}
					tableData3={false}
					tableData4={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableUpdateButton={false}
					tableDeleteButton={false}
					// Table Button Actions
					tableAddButtonClick={false}
					tableUpdateButtonClick={false}
					tableDeleteButtonClick={false}
					// Nav
					isNav={"Order"}
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

export default SellerOrders;
