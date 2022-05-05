import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { commentActions } from "../../store/actions/commentActions";
import { useSelector } from "react-redux";

function AdminComments() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(commentActions.getComments());
	}, []);

	const comments = useSelector((state) => state.comment.comments);

	const navCreateCommentClick = async (newComment) => {
		dispatch(commentActions.createComment(newComment, commentActions.getComments()));
	};
	const navUpdateCommentClick = (commentId, updatedComment) => {
		dispatch(
			commentActions.updateComment(commentId, updatedComment, commentActions.getComments())
		);
	};
	const navDeleteCommentClick = (oldComment) => {
		dispatch(commentActions.deleteComment(oldComment, commentActions.getComments()));
	};

	const tableDeleteButtonClick = (oldComment) => {
		dispatch(commentActions.deleteComment(oldComment.id, commentActions.getComments()));
	};

	return (
		<div className="">
			<Header title={"Comments"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={comments}
					//// Table Content
					// Table Headings
					tableHead={"Text"}
					tableHead2={"Rating"}
					tableHead3={"Product"}
					tableHead4={"User"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"text"}
					tableData2={"rating"}
					tableData3={"productName"}
					tableData4={"userUsername"}
					// Special
					isAdmin={true}
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Comment"}
					navSearch={true}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateCommentClick}
					navUpdateButtonClick={navUpdateCommentClick}
					navDeleteButtonClick={navDeleteCommentClick}
				/>
			</div>
		</div>
	);
}

export default AdminComments;
