/** @jsxImportSource react */

import { addItemToCart } from '../../stores/cart'

export const AddToCart = ({ item }: { item: ShopItem }) => {
	return (
		<div>
			<button className="big-link" onClick={() => addItemToCart(item)}>
				Add to Cart
			</button>
		</div>
	)
}
