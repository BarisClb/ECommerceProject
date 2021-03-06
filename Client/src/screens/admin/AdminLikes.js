import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { likeActions } from "../../store/actions/likeActions";
import { useSelector } from "react-redux";

const AdminLikes = () => {
	const dispatch = useDispatch();

	// Table Data
	const likes = useSelector((state) => state.like.likes);
	useEffect(() => {
		// Adding pageSize as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		dispatch(likeActions.getSortedLikes(sortInfo));
	}, []);

	// Nav Form Actions
	const navCreateLikeClick = async (newLike) => {
		dispatch(likeActions.createLike(newLike, likeActions.getSortedLikes(sortInfo)));
	};
	const navUpdateLikeClick = (likeId, updatedLike) => {
		dispatch(likeActions.updateLike(likeId, updatedLike, likeActions.getSortedLikes(sortInfo)));
	};
	const navDeleteLikeClick = (oldLike) => {
		dispatch(likeActions.deleteLike(oldLike, likeActions.getSortedLikes(sortInfo)));
	};

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldLike) => {
		dispatch(likeActions.deleteLike(oldLike.id, likeActions.getSortedLikes(sortInfo)));
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(likeActions.getSortedLikes(sortInfo));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: false,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

	return (
		<div id="admin-like-screen-wrapper">
			<Header title={"Likes"} />
			<div id="admin-like-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={likes}
					//// Table Content
					// Table Headings
					tableHead={"CommentId"}
					tableHead2={"Product"}
					tableHead3={"User"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"commentId"}
					tableData2={"productName"}
					tableData3={"userUsername"}
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
					isNav={"Like"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateLikeClick}
					navUpdateButtonClick={navUpdateLikeClick}
					navDeleteButtonClick={navDeleteLikeClick}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"User"}
					tableSortByValue2={"UserUsername"}
					tableSortBy3={"Product"}
					tableSortByValue3={"ProductName"}
					tableSortBy4={"Comment"}
					tableSortByValue4={"CommentId"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
};

export default AdminLikes;
