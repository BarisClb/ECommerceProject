import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/actions/cartActions";
import { Link } from "react-router-dom";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Badge,
} from "reactstrap";
import "./css/index.css";

const MiniCart = () => {
	// Data
	const cart = useSelector((state) => state.cart.currentCart);

	// Actions

	const dispatch = useDispatch();

	const removeFromCartComp = (cartItem) => {
		dispatch(cartActions.removeFromCart(cartItem, cart));
	};

	const clearCartComp = () => {
		dispatch(cartActions.clearCart());
	};

	// Dropdown

	const [dropdown, setDropdown] = useState(false);
	// Added 'fix' for Dropdown => If I don't put toggle(func) on the parent, it gives console error.
	// If I do, Childs inherit it, closes the dropdown whereever I click. So I gave a 'fake' function to the parent, a 'real' one to the children.
	const toggle = (fix) => {
		if (!fix) {
			setDropdown(!dropdown);
		}
	};

	return (
		<th scope="col" className="dropdown thead-buttons text-end">
			<Dropdown isOpen={dropdown} toggle={toggle}>
				<DropdownToggle caret onClick={() => toggle(false)}>
					{cart && cart.length < 1
						? `Empty Cart`
						: `Cart (${cart.length} Items)`}
				</DropdownToggle>
				<DropdownMenu dark end>
					<Link to="/Cart" id="miniCartLink">
						<DropdownItem className="text-center">
							Go to Cart
						</DropdownItem>
					</Link>
					<DropdownItem divider />
					{cart.map((item, index) => (
						<DropdownItem
							key={index}
							className="miniCartDropdownItem"
							onClick={() => removeFromCartComp(item)}
						>
							<i className="bi bi-trash" id="trashIcon"></i>
							{item.title.length > 20
								? `${item.title.slice(0, 20)} ...`
								: item.title.slice(0, item.title.length)}
							<Badge className="text-end" id="miniCartBadge">
								{item.quantity}
							</Badge>
						</DropdownItem>
					))}
					<DropdownItem divider />
					<DropdownItem className="text-center" onClick={clearCartComp}>
						Delete All
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</th>
	);
};

export default MiniCart;
