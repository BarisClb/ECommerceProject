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

	const navAddCommentComp = async (newComment) => {
		dispatch(commentActions.addComment(newComment));
	};
	const navUpdateCommentComp = (oldComment, newComment) => {
		dispatch(commentActions.updateComment(oldComment, newComment));
	};
	const navDeleteCommentComp = (oldComment) => {
		dispatch(commentActions.deleteComment(oldComment));
	};

	return (
		<div className="">
			<Header title={"Comments"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={comments}
					// Table Content
					// Table Headings
					tableHead={"Title"}
					tableHead2={"Text"}
					tableHead3={"ProductId"}
					tableHead4={"UserId"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"title"}
					tableData2={"text"}
					tableData3={"productId"}
					tableData4={"userId"}
					// Special
					isAdmin={true}
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					// Nav
					isNav={"Comment"}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
				/>
			</div>
		</div>
	);
}

export default AdminComments;
