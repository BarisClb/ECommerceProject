import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { commentReplyActions } from "../../store/actions/commentReplyActions";
import { useSelector } from "react-redux";

function AdminOrders() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(commentReplyActions.getCommentReplies());
	}, []);

	const commentReplies = useSelector(
		(state) => state.commentReply.commentReplies
	);

	const navAddCommentReplyComp = async (newCommentReply) => {
		dispatch(commentReplyActions.addCommentReply(newCommentReply));
		// dispatch(commentReplyActions.getCategories());
	};
	const navUpdateCommentReplyComp = (oldCommentReply, newCommentReply) => {
		dispatch(
			commentReplyActions.updateCommentReply(
				oldCommentReply,
				newCommentReply
			)
		);
		// dispatch(commentReplyActions.getCategories());
	};
	const navDeleteCommentReplyComp = (oldCommentReply) => {
		dispatch(commentReplyActions.deleteCommentReply(oldCommentReply));
		// dispatch(commentReplyActions.getCategories());
	};

	return (
		<div className="">
			<Header title={"Orders"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={commentReplies}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"User"}
					tableHead3={"Seller"}
					tableHead4={false}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"product"}
					tableData2={"user"}
					tableData3={"seller"}
					tableData4={false}
					// Special
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					// Nav
					isNav={"Order"}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={navAddCommentReplyComp}
					navUpdateButtonClick={navUpdateCommentReplyComp}
					navDeleteButtonClick={navDeleteCommentReplyComp}
				/>
			</div>
		</div>
	);
}

export default AdminOrders;
