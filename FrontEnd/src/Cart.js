const cart = sessionStorage.getItem('cart') ? sessionStorage.getItem('cart') :[];

export function addToCart(name, sku, amount, price){
    let storedCart = sessionStorage.getItem('cart') ? sessionStorage.getItem('cart') :[];
    let currentCart = sessionStorage.getItem('cart') ? JSON.parse(storedCart) : [];
    currentCart.push(
        {
        name: name,
        sku: sku,
        amount: amount,
        price: price,
        }
    );
    alert("Added to cart!");
    sessionStorage.setItem('cart', JSON.stringify(currentCart));
}

export function removeFromCart(i){
    let storedCart = sessionStorage.getItem('cart');
    let currentCart = JSON.parse(storedCart)
    currentCart.splice(i, 1);
    alert("Removed From Cart!");
    sessionStorage.setItem('cart', JSON.stringify(currentCart));
    if(currentCart.length < 1){
        sessionStorage.removeItem('cart');
    }
}

export function UpdateAmount(a, id){
    let storedCart = sessionStorage.getItem('cart');
    let currentCart = JSON.parse(storedCart)
    currentCart[id].amount = a;
    sessionStorage.setItem('cart', JSON.stringify(currentCart));
}

export default cart;