import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../../store/actions";
import "./css/index.css";
import SellerSideNavigation from "../navigation/sellerNavigation/SellerSideNavigation";
import SellerTopNavigation from "../navigation/sellerNavigation/SellerTopNavigation";
import Loading from "../common/Loading";

const SellerLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonActions.asyncEnd());
	}, []);
	return (
		<>
			<SellerTopNavigation />
			<SellerSideNavigation />
			{common.IsLoading && <Loading />}
			<div id="seller-content-wrapper">{children}</div>
		</>
	);
};

export default SellerLayout;
