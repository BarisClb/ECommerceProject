import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "../../components/table/Table";
import { productActions } from "../../store/actions/productActions";
import Header from "../../components/header/Header";

function SellerComments() {
	// Data
	const comments = useSelector((state) => state.product.comments);

	// Params
	const { id } = useParams();
	// Actions
	const dispatch = useDispatch();
	useEffect(() => {
		if (typeof id == "number") {
			dispatch(productActions.getCommentsBySeller(id));
		}
	}, []);

	return (
		<div className="">
			<Header title={"Coments"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={comments}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Comment Text"}
					tableHead3={"User"}
					tableHead4={"Rating"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"product"}
					tableData2={"comment"}
					tableData3={"user"}
					tableData4={"rating"}
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
					isNav={"Comment"}
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

export default SellerComments;
