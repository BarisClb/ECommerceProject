import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { commentActions } from "../../store/actions/commentActions";

function AdminComments() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(commentActions.getComments());
	}, []);

	const comments = useSelector((state) => state.category.comments);

	const tableAddButtonClick = () => {
		dispatch(commentActions.addComment);
	};

	const tableUpdateButtonClick = () => {
		dispatch(commentActions.updateComment);
	};

	const tableDeleteButtonClick = () => {
		dispatch(commentActions.deleteComment);
	};
	return (
		<div>
			<Table
				// The Data
				apiData={comments}
				// Table Content
				// Table Headings
				tableHead={"Category"}
				tableHead2={"Description"}
				// Table Datas
				tableData={"name"}
				tableData2={"description"}
				// Special
				isCategories={true}
				instaSearch={false}
				// Table Buttons
				tableButtons={false}
				tableAddButton={false}
				tableDeleteButton={false}
				tableUpdateButton={false}
				// Table Button Clicks
				// Nav
				isNav={true}
				navAddButton={true}
				navUpdateButton={true}
				navDeleteButton={true}
				// Nav Actions
				navAddButtonClick={true}
				navUpdateButtonClick={true}
				navDeleteButtonClick={true}
			/>
		</div>
	);
}

export default AdminComments;
