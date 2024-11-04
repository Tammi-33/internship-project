let cart = [];


function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        console.log('Cart loaded from localStorage:', cart);
    } else {
        console.log('No cart found in localStorage.');
    }
    
    if (document.getElementById("cart-items")) {
        updateCartDisplay();
    }
}


function addToCart(title, price) {
    const item = cart.find(item => item.title === title);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    console.log('Cart after adding item:', cart);
    alert(`${title} has been added to your cart!`);
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay(); 
}


function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartContainer || !totalContainer) {
        console.error("Cart display elements not found.");
        return; 
    }

    cartContainer.innerHTML = ''; 

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemElement = document.createElement("div");
        itemElement.innerText = `${item.title} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartContainer.appendChild(itemElement);
    });

    totalContainer.innerText = `Total: $${total.toFixed(2)}`;
}


function applyCoupon() {
    const couponCode = document.getElementById("coupon-code").value;
    const discount = couponCode === "DISCOUNT10" ? 0.10 : 0;

    if (discount > 0) {
        alert("Congratulations! Your coupon has been applied.");
    } else {
        alert("Invalid coupon code. Please try again.");
        return; 
    }

    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountedTotal = total - (total * discount);

    document.getElementById("cart-total").innerText = `Total after discount: $${discountedTotal.toFixed(2)}`;
}


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    alert(`Checkout successful! Your total is $${total.toFixed(2)}. Thank you for your purchase.`);
    cart = []; 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartDisplay(); 
}


window.onload = loadCart;
