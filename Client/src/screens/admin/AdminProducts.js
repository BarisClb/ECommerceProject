import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { productActions } from "../../store/actions/productActions";
import { useSelector } from "react-redux";

const AdminProducts = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productActions.getProducts());
	}, []);

	const products = useSelector((state) => state.product.products);

	const navAddProductComp = async (newProduct) => {
		dispatch(productActions.addProduct(newProduct));
		// dispatch(productActions.getCategories());
	};
	const navUpdateProductComp = (oldProduct, newProduct) => {
		dispatch(productActions.updateProduct(oldProduct, newProduct));
		// dispatch(productActions.getCategories());
	};
	const navDeleteProductComp = (oldProduct) => {
		dispatch(productActions.deleteProduct(oldProduct));
		// dispatch(productActions.getCategories());
	};

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
					tableHead2={"Category"}
					tableHead3={"Unit Price"}
					tableHead4={"In Stock"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"category"}
					tableData3={"unitPrice"}
					tableData4={"unitsInStock"}
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
					isNav={"Product"}
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
};

export default AdminProducts;
