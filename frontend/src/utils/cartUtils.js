// Helper function to round a number to 2 decimal places
export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

export const updateCart=(state)=>{

      // Calculate items price
      state.itemsPrice = addDecimal(state.cartItems.reduce
        ((acc, item) => acc + item.price * item.qty, 0));

      // Determine shipping price (if order is > 5000 naira, it's free; else 1000 naira)
      state.shippingPrice = addDecimal(state.itemsPrice >= 5 ? 0: 5);
      
      // Calculate tax price (15% tax)
      state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) + Number(state.shippingPrice) 
        + Number(state.taxPrice)).toFixed(2);

      // Store the updated cart in local storage
      localStorage.setItem("cart", JSON.stringify(state));

return state
}

