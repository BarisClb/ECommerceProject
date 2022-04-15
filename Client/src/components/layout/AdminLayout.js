import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonAction } from "../../store/actions";
import Loading from "../common/Loading";
import AdminNavigation from "../navigation/AdminNavigation";
import "./css/index.css";

const AdminLayout = ({ children }) => {
	const dispatch = useDispatch();
	const common = useSelector((state) => state.common);
	useEffect(() => {
		dispatch(commonAction.asyncEnd());
	}, []);
	return (
		<>
			<AdminNavigation />
			<button onClick={() => dispatch(commonAction.asyncEnd())}></button>
			<div>Hello world</div>
			{common.IsLoading && <Loading />}
			{children}
		</>
	);
};

export default AdminLayout;
