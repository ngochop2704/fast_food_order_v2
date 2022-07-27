// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// **************** Scroll Window ****************\\
var header = document.querySelector('.header');
if(header) {
    window.onscroll = function() {
        if(document.documentElement.scrollTop > 120) {
            header.classList.add('header-js');
        }
        else if(document.documentElement.scrollTop == 0) {
            header.classList.remove('header-js');
        }
    }
}

// **************** BarMenu on mobile & tablet ****************\\
// //show and close bar menu
var barMenu = document.querySelector('.bar__menu');
var barMenuBtn = document.querySelector('.bar__menu-symbol');
var barMenuModal = document.querySelector('.bar__menu-modal');

if(barMenuBtn) {
    barMenuBtn.onclick = function() {
        barMenu.style.transform = 'translate3d(0, 0, 0)';
        barMenuModal.style.display = 'block'; //show modal layer
        // barMenuList.style.transform = 'translate3d(0, 0, 0)';
    }
}

if(barMenuModal) {
    barMenuModal.onclick = function(e) {
        barMenu.style.transform = 'translate3d(-100%, 0, 0)'; 
        barMenuList.style.transform = 'translate3d(0, 0, 0)';
        barMenuProductList.style.transform = 'translate3d(100%, 0, 0)';
        barMenuModal.style.display = 'none'; //close modal layer
    }
}

//show and hidden product list
var barMenuList = document.querySelector('.bar__menu-list');
var barMenuProductList = document.querySelector('.bar__menu-product-list');
var barMenuProductBtnShow = document.querySelector('.bar__menu-product');
var barMenuProductBtnHidden = document.querySelector('.bar__menu-product-left');

if(barMenuProductBtnShow) {
    barMenuProductBtnShow.onclick = function() {
        barMenuList.style.transform = 'translate3d(-20%, 0, 0)';
        barMenuProductList.style.transform = 'translate3d(0, 0, 0)';
    }
}

if(barMenuProductBtnHidden) {
    barMenuProductBtnHidden.onclick = function() {
        barMenuList.style.transform = 'translate3d(0, 0, 0)';
        barMenuProductList.style.transform = 'translate3d(100%, 0, 0)';
    }
}

// **************** Register & Login on mobile & tablet ****************\\
var containerApp = document.querySelector('.container');
var authForm = document.querySelector('.auth__form');
var loginForm = document.querySelector('.login-form');
var registerForm = document.querySelector('.register-form');
var loginFormBtn = document.querySelector('.login-btn-js');
var registerFormBtn = document.querySelector('.register-btn-js');
var headerUser = document.querySelector('.header__user');
var navIconUser = document.querySelector('.user-nav-icon-js');

if(navIconUser) {
    navIconUser.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        headerUser.style.display = 'block';
    
        headerBagDescript.style.display = 'none';   //close BagDescript because it stopPropagation
    
        // listener event on window to close headerUser
        function closeHeaderUser() {
            headerUser.style.display = 'none';
        }
        window.addEventListener('click', closeHeaderUser);
    }
}

// **************** Footer nav plus on mobile & tablet ****************\\
var headerBags = document.querySelectorAll('.footer__sub-heading');

headerBags.forEach((headerBag) => {
    headerBag.onclick = function(e) {
        if(e.target.nextElementSibling.style.display === '') {
            e.target.nextElementSibling.style.display = 'block';
        }
        else if(e.target.nextElementSibling.style.display === 'block') {
            e.target.nextElementSibling.style.display = '';
        } 
    }
});

var plusIcons = document.querySelectorAll('.footer__plus-icon');

plusIcons.forEach(plusIcon => {
    plusIcon.onclick = function(e) {
        navItemPlus = e.target.parentElement;
        navItemPlus.onclick = function() {
            if(navItemPlus.nextElementSibling.style.display === '') {
                navItemPlus.nextElementSibling.style.display = 'block';
            }
            else if(navItemPlus.nextElementSibling.style.display === 'block') {
                navItemPlus.nextElementSibling.style.display = '';
            }            
        }
    }
})

///////////////////////////////******************* jquery library *********************\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// **************** Transition slider banner ****************\\
const sliderMain = document.querySelector('.slider-main');

if(sliderMain) {
    const sliderItems = document.querySelectorAll('.slider-item');

    const sliderItemWidth = sliderItems[0].offsetWidth;
    const sliderLength = sliderItems.length;
    var count = 0;
    var alternate_flag = true;
    
    const handlePrevBtnClick = () => {
        count = count - 1;
    
        if(count >= 0) {
            sliderMain.style.left = `${count*(-1) * sliderItemWidth}px`;
        }else{
            count = 0;
        }
    }
    
    const handleNextBtnClick = () => {
        count = count + 1;
        if(count <= sliderLength - 1) {
            sliderMain.style.left = `${count*(-1) * sliderItemWidth}px`;
        }
        else{
            count = sliderLength - 1;
        }
    }
    
    setInterval(() => {
        if(alternate_flag) {
            handleNextBtnClick();
            if(count >= sliderLength - 1) {
                alternate_flag = false;
            }
        }
        else {
            handlePrevBtnClick();
            if(count <= 0) alternate_flag = true;
        }
    }, 5000);
}

// **************** Brand slick slider with frame work slick and jquery slider ****************\\
if(document.querySelector('.about__us-slick-slider')) {
    $(document).ready(function() {
        $('.about__us-slick-slider').slick({
            slidesToShow: 4,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 1000,
            dots: false,
            arrows: false,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    dots: true
                  },
                },
                {
                  breakpoint: 739,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                  },
                },
              ],
        });
    });
}

if(document.querySelector('.hot__new-slick-slider')) {
    $(document).ready(function() {
        $('.hot__new-slick-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 1000,
            arrows: false,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 739,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
        });
    });
}

if(document.querySelector('.brand__slick-slider')) {
    $(document).ready(function() {
        $('.brand__slick-slider').slick({
            slidesToShow: 6,
            slidesToScroll: 3,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 1000,
            arrows: false,
            // prevArrow: `<button type='button' class='slick-prev slick-arrow'>Prev</button>`,
            // nextArrow: `<button type='button' class='slick-next slick-arrow'>Next</button>`,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                  },
                },
                {
                  breakpoint: 740,
                  settings: {
                    slidesToShow: 2,
                  },
                },
              ],
        });
    });
}

///////////////////////////////****************************************\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//********** defined RENDER PRODUCT function **********\\
function renderProduct(products) {
    htmls = products.map(product => {
                    return  `
                                <div class="col l-3 m-3 c-6 product-opacity-js">
                                    <a href="./detail_product.html?id=${product.id}#" class="list__product-item margin_bottom_30px">
                                        <div class="list__product-item-img" style="background-image: url(${product.image});"></div>
                                        <ul class="list__product-item-action">
                                            <li class="list__product-item-buy list__product-item--common" onclick="handleAddOneItem(this, ${product.id}, '${product.name}', ${Number.isInteger(product.currentPrice) ? product.currentPrice : `'${product.currentPrice}'`}, '${product.image}', ${product.quantity});">
                                                <i class="product__buy-icon fa-solid fa-cart-shopping"></i>
                                            </li>
                                            <li class="list__product-item-search list__product-item--common">
                                                <i class="product__search-icon fa-solid fa-magnifying-glass"></i>
                                            </li>
                                        </ul>
                                        <div class="list__product-item-content">
                                            <div class="list__product-item-name">${product.name}</div>
                                            <div class="list__product-item-price">
                                                <span class="list__product-item-price-current">${Number.isInteger(product.currentPrice) ? product.currentPrice.toLocaleString()+'₫' : product.currentPrice}</span>
                                                <span class="list__product-item-price-old">${product.oldPrice.toLocaleString() && product.oldPrice.toLocaleString()+'₫'}</span>    
                                            </div>
                                        </div>
                                    </a>
                                </div>     
                            `;
                });
    return htmls;
}  

///////////////////////////////////// Add, update, delete product /////////////////////////////////////////////
var totalBill = 0;
var totalQuantity = 0;
var oldQuantity;

var wrapperShoppingCart = document.querySelector('.wrapper-shopping-cart');
var cart = JSON.parse(localStorage.getItem('cart'));

var bagDescript = document.querySelector('.header__bag-description');
var bagWrapper = document.querySelector('.bag-content-wrapper');
var bagList = document.querySelector('.bag-content-list');
var bagLabel = document.querySelector('.header__bag-label');
var quantityItem = document.querySelector('.bag-content-heading b');
var bagPayment = document.querySelector('.bag-content-total');

if(wrapperShoppingCart || bagDescript || bagWrapper) {
    renderDetailCart();
}
//********** renderDetailCart (cart in header bar menu) **********\\
function renderDetailCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    totalBill = 0;
    totalQuantity = 0;

    if(cart.length !== 0) {
        // hiden notify no product
        bagDescript.style.display = 'none';
        bagWrapper.style.display = 'block';

        var htmls = cart.map(item => {
            totalBill += (Number.isInteger(item.price) ? item.price : 0) * item.quantity;
            totalQuantity += item.quantity;

            return `
                <li class="bag-content-item">
                    <a href="./detail_product.html?id=${item.id}#" class="bag-content-link">
                        <img src="${item.image}" alt="${item.name}" class="bag-content-img">
                    </a>
                    <div class="bag-content-info">
                        <a href="./detail_product.html?id=${item.id}#">${item.name}</a>
                        <p>
                            <span class="bag-content-price">${Number.isInteger(item.price) ? item.price.toLocaleString()+'₫' : item.price}</span>
                            <span class="bag-content-quantity">x ${item.quantity}</span>
                        </p>
                    </div>
                    <p class="bag-content-remove" onclick="handleRemoveItem(this, ${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </p>
                </li>                           
            `;
        });
        bagList.innerHTML = htmls.join('');
        bagLabel.innerHTML = totalQuantity;
        quantityItem.innerHTML = totalQuantity;
        // calculate the total bill
        bagPayment.innerText = totalBill.toLocaleString()+'₫';
    }
    else {
        // show notify no product
        bagDescript.style.display = 'block';
        bagWrapper.style.display = 'none';

        bagLabel.innerHTML = cart.length;
    }
}

//********** Render product on sidebar (check_out.html page) **********\\

//********** renderProductsHasBought (render products was bought in shopping_cart.html) **********\\
function renderProductsHasBought() {
    // render products was bought
    var cart = JSON.parse(localStorage.getItem('cart'));

    if(cart.length !== 0) {
      //collect products to display in the cart
      var htmls = cart.map(item => {
        return `
                <div class="item-cart__product">
                  <div class="item-cart__product-img">
                    <a href="./detail_product.html?id=${item.id}#" class="item-cart__product-link">
                      <img src="${item.image}" alt="${item.name}">
                    </a>
                  </div>
                  <div class="item-cart__product-info">
                    <a href="./detail_product.html?id=${item.id}#" class="item-cart__product-name">${item.name} - 2 kg</a>
                    <p class="item-cart__product-price">${Number.isInteger(item.price) ? item.price.toLocaleString()+'₫' : item.price}</p>
                  </div>
                  <div class="item-cart__product-amount">
                    <button class="btn item-cart__product-btn-decrease" onclick="handleDecreaseItem(this, ${Number.isInteger(item.price) ? item.price : 0}, ${item.id})">-</button>
                    <input type="number" class="item-cart__product-quantity" value="${item.quantity}" onclick = "handleClickInput(this)" onchange="handleChangeQuantity(this, ${Number.isInteger(item.price) ? item.price : 0}, this.value, ${item.id})">
                    <button class="btn item-cart__product-btn-increase" onclick="handleIncreaseItem(this, ${Number.isInteger(item.price) ? item.price : 0}, ${item.id})">+</button>
                    <span class="item-cart__product-delete hide-on-pc-tablet" onclick="handleRemoveItem(this, ${item.id})">Xóa</span>
                  </div>
                  <div class="item-cart__product-total hide-on-mobile">
                    <span>Tổng tiền:</span>
                    <span class="item-bill">${Number.isInteger(item.price) ? (item.price * item.quantity).toLocaleString() +'₫' : item.price}</span>
                    <p>
                      <span class="item-cart__product-delete" onclick="handleRemoveItem(this, ${item.id})">
                        <i class="fa-solid fa-trash-can"></i>
                        Xóa
                      </span>
                    </p>
                  </div>
                </div>
              `
      });

      // render products in the cart
      wrapperShoppingCart.innerHTML = `
        <h3 class="shopping-cart-title">Giỏ hàng của bạn (${totalQuantity} sản phẩm)</h3>
        <div class="shopping-cart-body">
          <!-- Render products in shopping cart -->
          ${htmls.join('')}
        </div>
        <p class="shopping-cart-bill">
          Thành tiền: <span></span> 
        </p>
        <div class="shopping-cart-action">
          <a href="./all_product.html" class="btn">Tiếp tục mua sắm</a>
          <a href="./check_out.html" class="btn btn--primary">Đặt hàng ngay</a>
        </div>
      `;
      // calculate the total bill
      document.querySelector('.shopping-cart-bill>span').innerText = totalBill.toLocaleString()+'₫';
    }
    else {
      wrapperShoppingCart.innerHTML = `
          <h3 class="shopping-cart-title">Giỏ hàng của bạn (0 sản phẩm)</h3>
          <p class="shopping-cart-notify">Không có sản phẩm nào trong giỏ hàng. Quay lại cửa hàng để tiếp tục mua sắm.</p>
        `;
    }
}

///////////////////////////////////// Add, update, delete product in the cart /////////////////////////////////////////////
//********** handleRemoveItem **********\\
function handleRemoveItem(_this, id) {
    var isAgree = confirm('Bạn muốn xóa sản phẩm này?');
    
    if(isAgree) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        
        renderDetailCart();
        if(wrapperShoppingCart) { // vì hàm handleRemoveItem() dùng chung cho index.html và shopping_cart.html nên phải loại hàm renderProductsHasBought() khi đang ở trang index.html và trang index.html
            renderProductsHasBought();
        }
    }
}
  
//********** handleDecreaseItem **********\\
function handleDecreaseItem(_this, price, id) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var quantityInputItem = _this.parentElement.querySelector('input');
    var itemBill = _this.parentElement.nextElementSibling.querySelector('.item-bill');
    var cartTitle = document.querySelector('.shopping-cart-title');

    if(quantityInputItem.value > 1) {
        quantityInputItem.value--;
        itemBill.innerText = (price * quantityInputItem.value).toLocaleString()+'₫';

        totalBill = totalBill - price;
        document.querySelector('.shopping-cart-bill>span').innerText = totalBill.toLocaleString()+'₫';

        // update localStorage
        cart.forEach(item => {
            if(item.id === id) {
                item.quantity = parseInt(quantityInputItem.value);
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        
        renderDetailCart();
        cartTitle.innerText = `Giỏ hàng của bạn (${totalQuantity} sản phẩm)`;
    }
    else {
        alert('Mỗi mặt hàng phải có ít nhất 1 sản phẩm!');
    }
}

//********** handleIncreaseItem **********\\
function handleIncreaseItem(_this, price, id) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var quantityInputItem = _this.parentElement.querySelector('input');
    var itemBill = _this.parentElement.nextElementSibling.querySelector('.item-bill');
    var cartTitle = document.querySelector('.shopping-cart-title');

    quantityInputItem.value++;
    itemBill.innerText = (price * quantityInputItem.value).toLocaleString()+'₫';

    totalBill = totalBill + price;
    document.querySelector('.shopping-cart-bill>span').innerText = totalBill.toLocaleString()+'₫';

    // update localStorage
    cart.forEach(item => {
        if(item.id === id) {
            item.quantity = parseInt(quantityInputItem.value);
        }
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    
    renderDetailCart();
    cartTitle.innerText = `Giỏ hàng của bạn (${totalQuantity} sản phẩm)`;
}

//********** handleClickInput **********\\
function handleClickInput(_this) {
    oldQuantity = _this.value;
}

//********** handleChangeQuantity **********\\
function handleChangeQuantity(_this, price, quantity, id) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var itemBill = _this.parentElement.nextElementSibling.querySelector('.item-bill');
    var cartTitle = document.querySelector('.shopping-cart-title');

    itemBill.innerText = (price * _this.value).toLocaleString()+'₫';

    if(_this.value > oldQuantity) {
        totalBill = totalBill + (_this.value - oldQuantity)*price;
        document.querySelector('.shopping-cart-bill>span').innerText = totalBill.toLocaleString()+'₫';
    }
    else {
        totalBill = totalBill - (oldQuantity - _this.value)*price;
        document.querySelector('.shopping-cart-bill>span').innerText = totalBill.toLocaleString()+'₫';
    }

    // update localStorage
    cart.forEach(item => {
        if(item.id === id) {
            item.quantity = parseInt(quantity);
        }
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    
    renderDetailCart();
    cartTitle.innerText = `Giỏ hàng của bạn (${totalQuantity} sản phẩm)`;
}

//********** handleAddOneItem **********\\ (add an item into bag when user click on cart icon)
function handleAddOneItem(_this, id, name, price, image, quantity) {
    event.preventDefault();
    addShoppingCart(id, name, price, image, quantity);
}

//********** addShoppingCart **********\\
function addShoppingCart(id, name, price, image, quantity, flagDetail) {
    var quantityInput = document.querySelector('.product__detail-number');
    if(flagDetail === true) {// add item bao gồm cả trường hợp nhập input
        quantity = parseInt(quantityInput.value);
    }

    var cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null) {
      cart = [];
      cart.push({id: id, name: name, price: price, image: image, quantity: quantity});
    }
    else {
      let item = cart.find(item => item.id === id);
      if(item) {
        // đang muốn dùng chung 1 hàm này cho cả trang detail_product.html nhưng trang này thêm main.js vào thì bị lỗi nên để xử lý sau
        if(quantityInput) {// add item trường hợp nhập input
            item.quantity += quantity;
        }
        else {// add item trường hợp nhấn vào cart icon
            item.quantity++;
        }
      }
      else cart.push({id: id, name: name, price: price, image: image, quantity: quantity});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderDetailCart();
    showDialogCart(id, totalQuantity, totalBill, cart);
}

//********** Show Dialog Cart **********\\
var modalMain = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal__overlay');
var dialogContent = document.querySelector('.dialog__content');
var dialogClose = document.querySelector('.dialog__close');

if(dialogClose) {
    dialogClose.onclick = function() {
        modalMain.style.display = 'none';
    }
}

if(modalOverlay) {
    modalOverlay.onclick = function() {
        modalMain.style.display = 'none';
    }
}

function showDialogCart(id, totalQuantity, totalBill, cart) {
    modalMain.style.display = 'block';
    
    var item = cart.find(item => item.id === id);
    var htmls = `
                    <div class="dialog__left">
                        <p class="dialog-title">
                            <i class="fa-solid fa-check"></i> 
                            Sản phẩm đã được thêm vào giỏ hàng!
                        </p>
                        <div class="dialog__left-body">
                            <div class="dialog__left-media">
                                <img src="${item.image}" alt="${item.name}" class="dialog__left-img">
                            </div>
                            <div class="dialog__left-descript">
                                <p class="dialog__left-name">${item.name}</p>
                                <span class="dialog__left-price">${Number.isInteger(item.price) ? item.price.toLocaleString()+'₫' : item.price}</span>
                            </div>
                        </div>
                    </div>
                    <div class="dialog__right">
                        <p class="dialog-title">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Giỏ hàng của bạn (${totalQuantity} sản phẩm)
                        </p>
                        <div class="dialog__right-body">
                            <p class="dialog__right-total">
                                <!-- <span>Tổng tiền:</span> -->
                                Tổng tiền:
                                <span>${totalBill.toLocaleString()+'₫'}</span>
                            </p>
                            <p class="dialog__right-transfer">
                                <a href="./check_out.html" class="btn btn--primary dialog__right-btn">Tiến hành thanh toán</a>
                            </p>
                        </div>
                    </div>
                `;
    dialogContent.innerHTML = htmls;
}





