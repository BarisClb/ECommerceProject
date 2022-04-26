import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "../../components/table/Table";
import { productActions } from "../../store/actions/productActions";
import Header from "../../components/header/Header";

function SellerCommentReplies() {
	// Data
	const commentReplies = useSelector((state) => state.product.commentReplies);

	// Params
	const { id } = useParams();
	// Actions
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(productActions.getProductsBySeller(1));
		if (typeof id == "number") {
			dispatch(productActions.getOrdersBySeller(id));
		}
	}, []);

	return (
		<div className="">
			<Header title={"Comment Reply"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={commentReplies}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Reply"}
					tableHead3={"Comment"}
					tableHead4={"Rating"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"product"}
					tableData2={"reply"}
					tableData3={"comment"}
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
					isNav={"CommentReply"}
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

export default SellerCommentReplies;
