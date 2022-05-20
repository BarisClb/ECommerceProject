import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { commonActions } from "../../../store/actions";
import "./css/index.css";

function CardGroup(props) {
	const randomImage = commonActions.randomImage;

	// DarkMode
	const darkMode = useSelector((state) => state.common.DarkMode);

	// Data
	const [data, setData] = useState(props.data);
	useEffect(() => {
		setData(props.data);
	}, [props.data]);

	return (
		<div
			id="cardgroup-container"
			className={`container ${darkMode ? "cardgroup-container-darkMode" : ""}`}
		>
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
				{data &&
					data.map((product) => (
						<div className="col" key={product.id}>
							<div className="store-cardGroup-card card">
								<a
									href={`/store/product/${product.id}`}
									style={{ textDecoration: "none", color: "GrayText" }}
								>
									<div className="card-body">
										<div
											id="cardGroup-card-random-image"
											className="row"
											style={{
												background: randomImage(),
											}}
										></div>
										<h6 className="card-top">{product.categoryName}</h6>
										<h5 className="card-title">{product.name}</h5>
										<p className="card-text">{product.description} </p>
										<div className="card-footer bg-transparent">
											<h4>Price : </h4>
											<h4>{product.price} $</h4>
										</div>
									</div>
								</a>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default CardGroup;
