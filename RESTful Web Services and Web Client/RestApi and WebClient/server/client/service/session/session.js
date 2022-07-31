function renderNavigationBar(page){
    return `
    <!-- Close Icon -->
            <div class="nav-close">
                <i class="fa fa-close" aria-hidden="true"></i>
            </div>
            <!-- Logo -->
            <div class="logo">
                <a href="index.html"><img src="./assets/images/logo/logo.png" alt=""></a>
            </div>
            <!-- Amado Nav -->
            <nav class="amado-nav">
                <ul>
                    <li class="${page === 'index' ? 'active': ''}"><a href="index.html">Home</a></li>
                    <li class="${page === 'shop' ? 'active': ''}"><a href="shop.html">Shop</a></li>
                    <li class="${page === 'productDetails' ? 'active': ''}"><a href="product-details.html">Product</a></li>
                    <li class="${page === 'cart' ? 'active': ''}"><a href="cart.html">Cart</a></li>
                    <li class="${page === 'checkout' ? 'active': ''}"><a href="checkout.html">Checkout</a></li>
                </ul>
            </nav>
            <!-- Button Group -->
            <div class="amado-btn-group mt-30 mb-100">
                <a href="#" class="btn amado-btn mb-15">%Discount%</a>
                <a href="#" class="btn amado-btn active">New this week</a>
            </div>
            <!-- Cart Menu -->
            <div class="cart-fav-search mb-100">
                <a href="cart.html" class="cart-nav"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Cart <span>(0)</span></a>
                <a href="#" class="fav-nav"><i class="fa fa-star" aria-hidden="true"></i> Favourite</a>
                <a href="#" class="search-nav"><i class="fa fa-search" aria-hidden="true"></i> Search</a>
                <a href="javascript:void(0);" class="search-nav" id="myAccount" onclick="myAccountOnClickHandler()"><i class="fa fa-user" aria-hidden="true"></i> My Account</a>
            </div>
            <!-- Social Button -->
            <div class="social-info d-flex justify-content-between">
                <a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            </div>
    `
}

function getSession(){
    const data =  sessionStorage.getItem(SESSION_KEY);
    if(data)
        return JSON.parse(data);
    else
        return {};
}

function SetSession(obj){
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(obj));
}
