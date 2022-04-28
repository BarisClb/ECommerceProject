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
					tableHead2={"Description"}
					tableHead3={"Category"}
					tableHead4={"Seller"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"description"}
					tableData3={"categoryName"}
					tableData4={"sellerUsername"}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Actions
					tableAddButtonClick={false}
					tableUpdateButtonClick={false}
					tableDeleteButtonClick={false}
					// Nav
					isNav={"Product"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Action
					navCreateButtonClick={false}
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
