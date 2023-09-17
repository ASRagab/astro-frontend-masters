import { useStore } from '@nanostores/solid'
import { $cart as cart, removeItemFromCart, subTotal } from '../../stores/cart'
import styles from './cart.module.css'
import { Show, createSignal } from 'solid-js'

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount)
}

const EmptyState = () => {
	return (
		<>
			<p class={styles.icon}>
				<span role="img" aria-label="cart">
					🌭
				</span>
			</p>
			<p class={styles.empty}>Your cart is empty, click Add to Cart to get sndwched</p>
		</>
	)
}

const CheckoutNotice = () => <p class={styles.notice}>Checkout is not implemented</p>

export const Cart = () => {
	const [showCheckoutNotice, setShowCheckoutNotice] = createSignal(false)
	const $subTotal = useStore(subTotal)
	const $cart = useStore(cart)

	return (
		<aside class={styles.cart}>
			<h2>Your Cart</h2>
			<Show when={Object.values($cart()).length > 0} fallback={<EmptyState />}>
				<ul class={styles.items}>
					{Object.values($cart()).map((item) => (
						<li class={styles.item}>
							<span class={styles.quantity}>{item.quantity}</span>
							<span class={styles.name}>{item.item.title}</span>
							<span class={styles.remove}>
								<button title="remove item" onClick={() => removeItemFromCart(item.item.id)}>
									&times;
								</button>
							</span>
							<span class={styles.price}>{formatCurrency(item.item.price)}</span>
						</li>
					))}
				</ul>

				<div class={styles.details}>
					<p class={styles.subtotal}>
						<span class={styles.label}>Subtotal:</span> {formatCurrency($subTotal())}
					</p>
					<p class={styles.shipping}>
						<span class={styles.label}>Shipping:</span>
						<del>{formatCurrency(10.0)}</del>
						<ins>FREE</ins>
					</p>
					<p class={styles.total}>
						<span class={styles.label}>Total:</span> {formatCurrency($subTotal())}
					</p>

					<p class={styles.checkout}>
						<button class="big-link" onClick={() => setShowCheckoutNotice(true)}>
							Checkout
						</button>
					</p>

					<Show when={showCheckoutNotice()}>
						<CheckoutNotice />
					</Show>
				</div>
			</Show>
		</aside>
	)
}
