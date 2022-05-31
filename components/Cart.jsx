import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    decQty,
    incQty,
        qty
  } = useStateContext();

  const handleCheckout = async ()=> {
    const stripe = await getStripe();

    const res = await fetch('/api/stripe',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    
    if(res.statusCode === 500) return;

    const data = await res.json();
    toast.loading('Redirecting. . .');

    stripe.redirectToCheckout({sessionId: data.id});

  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={50} />

            <h3>Your Shopping Cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div key={item._id} className="product">
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                ></img>
                <div className="item-desc">
                  <div className="flex top">
                <h5>{item.name}</h5>
                <h5>${item.defaultProductVariant.price}</h5>
                  </div>
                  <div className="flex bottom">
                    <div>
                    <p className="flex border-2 justify-center text-center items-center p-[1rem] gap-3">
              <span className="text-md" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                <AiOutlineMinus />
              </span>
              <span className="font-bold">{item.quantity}</span>
              <span className="text-md" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                <AiOutlinePlus />
              </span>
            </p>
                    </div>
                    <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                      <TiDeleteOutline/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >=1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container"><button className="btn" type="button" onClick={handleCheckout}>
              Pay with Stripe
              </button></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
