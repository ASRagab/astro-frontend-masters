import { computed, map } from 'nanostores'

export const $cart = map<Record<number, CartItem>>([])

export const addItemToCart = (item: ShopItem) => {
	const maybeItem = $cart.get()[item.id]

	const quantity = maybeItem ? maybeItem.quantity : 0

	$cart.setKey(item.id, {
		item,
		quantity: quantity + 1,
	})
}

export const removeItemFromCart = (id: number) => {
	//@ts-ignore
	$cart.setKey(id, undefined)
}

export const subTotal = computed($cart, (cart) => {
	return Object.values(cart).reduce((acc, { item, quantity }) => {
		return acc + item.price * quantity
	}, 0)
})
