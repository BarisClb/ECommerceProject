import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { productActions } from "../store/actions/productActions";
import { cartActions } from "../store/actions/cartActions";
import SideCategoryList from "../components/sidetable/SideCategoryList";
import { categoryActions } from "../store/actions/categoryActions";

const Products = () => {
	// Data
	const products = useSelector((state) => state.product.products);
	const categories = useSelector((state) => state.category.categories);
	const cart = useSelector((state) => state.cart.currentCart);
	useEffect(() => {}, []);

	// Actions
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(productActions.getProducts());
		dispatch(categoryActions.getCategories());
	}, []);

	const addOrIncreaseCartClick = (product) => {
		dispatch(cartActions.addOrIncreaseCart(product, cart));
	};

	const navAddProductClick = async (newProduct) => {
		dispatch(productActions.addProduct(newProduct, productActions.getProducts()));
	};
	const navUpdateProductClick = (oldProductId, newProduct) => {
		dispatch(
			productActions.updateProduct(oldProductId, newProduct, productActions.getProducts())
		);
	};
	const navDeleteProductClick = (oldProduct) => {
		dispatch(productActions.deleteProduct(oldProduct, productActions.getProducts()));
	};

	return (
		<div>
			<MainLayout>
				<Header title={"Products"} />
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-2 col-12">
							<SideCategoryList
								sideListItems={categories}
								listDataName={"id"}
								listDataName2={"name"}
							/>
						</div>
						<div className="col-md-10 col-12">
							<Table
								// The Data
								apiData={products}
								// Table Content
								// Table Headings
								tableHead={"Product"}
								tableHead2={"Category"}
								tableHead3={"Unit Price"}
								tableHead4={"Units In Stock"}
								buttonHeadName={"Cart Actions"}
								// Table Datas
								tableData={"name"}
								tableData2={"category"}
								tableData3={"unitPrice"}
								tableData4={"unitsInStock"}
								// Table Buttons
								tableButtons={true}
								tableAddButton={true}
								tableUpdateButton={false}
								tableDeleteButton={false}
								// Table Button Actions
								tableAddButtonClick={addOrIncreaseCartClick}
								// Nav
								isNav={"Product"}
								navAddButton={true}
								navUpdateButton={true}
								navDeleteButton={true}
								// Nav Action
								navAddButtonClick={navAddProductClick}
								navUpdateButtonClick={navUpdateProductClick}
								navDeleteButtonClick={navDeleteProductClick}
								// Special
								isCart={true}
								instaSearch={true}
							/>
						</div>
					</div>
				</div>
			</MainLayout>
		</div>
	);
};

export default Products;
