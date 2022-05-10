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
		dispatch(likeActions.getSortedLikes(listSorting));
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
		listSorting = { ...listSorting, ...listSortingValues };
		dispatch(likeActions.getSortedLikes(listSorting));
	};
	// Default Sort Values
	let listSorting = {
		reversed: false,
		searchWord: "",
		pageNumber: 1,
		pageSize: 20,
		orderBy: "Id",
	};
	// Sort Data from API
	const sortInfo = useSelector((state) => state.common.SortInfo);

	return (
		<div id="admin-like-page-wrapper">
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
