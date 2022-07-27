        var url = "https://fast-food-order-api.herokuapp.com/products";

        var htmls;
        var products = [];
        var currentPage = 1;
        var perPage = 12;
        var totalPage = 0;
        var perProducts = [];
        var paginationOrderBtn = [];
        var checkFlag = false;
        var selectTool = document.querySelector('.filter__tool-select');

        /////////////////////////////////////////////////////////////
        //handle click event pagination link
        function handlePageNumbers(num) {
            currentPage = num;

            if(currentPage > 1) {
                if(document.querySelector('.products-pagination-prev-js')) {
                    document.querySelector('.products-pagination').firstElementChild.remove();
                }
                const prevPagination = document.createElement("li");
                prevPagination.classList.add('products-pagination-item')
                prevPagination.innerHTML = `<a href="#${currentPage-1}" class="products-pagination-link products-pagination--round products-pagination-prev-js" onclick="handlePageNumbers(${currentPage-1})">Prev</a>`;
                document.querySelector('.products-pagination').insertBefore(prevPagination, document.querySelector('.products-pagination').firstElementChild);
            }
            else {
                if(document.querySelector('.products-pagination-prev-js')) {
                    document.querySelector('.products-pagination').firstElementChild.remove();
                }
            }

            if(currentPage < totalPage) {
                if(document.querySelector('.products-pagination-next-js')) {
                    document.querySelector('.products-pagination').lastElementChild.remove();
                }
                const nextPagination = document.createElement("li");
                nextPagination.classList.add('products-pagination-item')
                nextPagination.innerHTML = `<a href="#${currentPage+1}" class="products-pagination-link products-pagination--round products-pagination-next-js" onclick="handlePageNumbers(${currentPage+1})">Next</a>`;
                document.querySelector('.products-pagination').appendChild(nextPagination);
            }
            else {
                if(document.querySelector('.products-pagination-next-js')) {
                    document.querySelector('.products-pagination').lastElementChild.remove();
                }
            }

            checkFlag = true;
            handleRenderProducts();

            var paginationLinks = document.querySelectorAll('.products-pagination-link');
            paginationLinks.forEach(paginationLink => {
                if(paginationLink.innerText == currentPage) {
                    if(document.querySelector('.products-pagination--active')) {
                        document.querySelector('.products-pagination--active').classList.remove('products-pagination--active');
                    }
                    paginationLink.classList.add('products-pagination--active');
                }
            });
        }
        //render pageNumbers
        function renderPageNumbers(realRenderedProducts) {
            totalPage = Math.ceil(realRenderedProducts.length/perPage); 
            if(totalPage > 1) {
                for (var i = 1; i <= totalPage; i++) {
                    if(i===1) {
                        document.querySelector('.products-pagination').innerHTML += `<li class="products-pagination-item"><a href="#${i}" class="products-pagination-link products-pagination--active" onclick="handlePageNumbers(${i})">${i}</a></li>`;
                    }
                    else {
                        document.querySelector('.products-pagination').innerHTML += `<li class="products-pagination-item"><a href="#${i}" class="products-pagination-link" onclick="handlePageNumbers(${i})">${i}</a></li>`;
                    }
                }
                document.querySelector('.products-pagination').innerHTML += `<li class="products-pagination-item"><a href="#${currentPage+1}" class="products-pagination-link products-pagination--round products-pagination-next-js" onclick="handlePageNumbers(${currentPage+1})">Next</a></li>`;   
            }
        }

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
        
        // định nghĩa hàm handleRenderProducts
        function handleRenderProducts() {
            //******************** filter tool trên pc & tablet ********************\\
            if(window.innerWidth > 739) {
                // sắp xếp sản phẩm theo mặc định
                var defaultBtn = document.querySelector('.defaulting_js');
                if(defaultBtn.lastElementChild.className.includes('filter__tool--active')) {
                    handleDefaultProduct();
                }
                defaultBtn.onclick = (e) => {
                    e.preventDefault();
                    checkFlag = false;
                    currentPage = 1;
                    if(!e.target.lastElementChild.className.includes('filter__tool--active')) {
                        document.querySelector('.products-pagination').innerHTML = "";
                        handleDefaultProduct();
                    }
                }
    
                function handleDefaultProduct() {
                    products.sort((a, b) => a.id - b.id);
    
                    perProducts = products.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );
                    if(checkFlag === false) {
                        renderPageNumbers(products);
                    }
    
                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    defaultBtn.querySelector('i').classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }
                // sắp xếp sản phẩm theo sản phẩm mới
                var lineNewBtn = document.querySelector('.linenew_js');
                
                if(lineNewBtn.lastElementChild.className.includes('filter__tool--active')) {
                    handleLineNewProduct();
                }
    
                lineNewBtn.onclick = (e) => {
                    e.preventDefault();
    
                    checkFlag = false;
                    currentPage = 1;
    
                    if(!e.target.lastElementChild.className.includes('filter__tool--active')) {
                        document.querySelector('.products-pagination').innerHTML = "";
                        handleLineNewProduct();
                    }
                }
    
                function handleLineNewProduct() {
                    var lineNewProducts = products.filter(product => product.currentPrice === 'Liên hệ');
                    perProducts = lineNewProducts.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );
                    
                    if(checkFlag === false) {
                        renderPageNumbers(lineNewProducts);
                    }
    
                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    lineNewBtn.querySelector('i').classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }
                // sắp xếp sản phẩm theo sản phẩm giảm giá
                var discountBtn = document.querySelector('.discounting_js');
    
                if(discountBtn.lastElementChild.className.includes('filter__tool--active')) {
                    handleDiscountProduct();
                }
                
                discountBtn.onclick = (e) => {
                    e.preventDefault();
    
                    checkFlag = false;
                    currentPage = 1;
    
                    if(!e.target.lastElementChild.className.includes('filter__tool--active')) {
                        document.querySelector('.products-pagination').innerHTML = "";
                        handleDiscountProduct();
                    }
                }
    
                function handleDiscountProduct() {
                    var discountProducts = products.filter(product => product.oldPrice !== '');
                    perProducts = discountProducts.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );
    
                    if(checkFlag === false) {
                        renderPageNumbers(discountProducts);
                    }
                    
                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    discountBtn.querySelector('i').classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }
                // sắp xếp sản phẩm theo thứ tự giá tăng dần
                var ascendingBtn = document.querySelector('.ascending_js');
    
                if(ascendingBtn.lastElementChild.className.includes('filter__tool--active')) {
                    handleAscProduct();
                }

                ascendingBtn.onclick = (e) => {
                    e.preventDefault();
    
                    checkFlag = false;
                    currentPage = 1;
    
                    if(!e.target.lastElementChild.className.includes('filter__tool--active')) {
                        document.querySelector('.products-pagination').innerHTML = "";
                        handleAscProduct();
                    }
                }
    
                function handleAscProduct() {
                    products.sort((a, b) => a.currentPrice - b.currentPrice);
                    var priceAscProducts = products.filter(product => product.currentPrice !== 'Liên hệ');
                    perProducts = priceAscProducts.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );
    
                    if(checkFlag === false) {
                        renderPageNumbers(priceAscProducts);
                    }
    
                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    ascendingBtn.querySelector('i').classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }
                // sắp xếp sản phẩm theo thứ tự giá giảm dần
                var descendingBtn = document.querySelector('.descending_js');
    
                if(descendingBtn.lastElementChild.className.includes('filter__tool--active')) {
                    handleDescProduct();
                }
    
                descendingBtn.onclick = (e) => {
                    e.preventDefault();
    
                    checkFlag = false;
                    currentPage = 1;
    
                    if(!e.target.lastElementChild.className.includes('filter__tool--active')) {
                        document.querySelector('.products-pagination').innerHTML = "";
                        handleDescProduct();
                    }
                }
    
                function handleDescProduct() {
                    products.sort((a, b) => b.currentPrice - a.currentPrice);
                    var priceDesProducts = products.filter(product => product.currentPrice !== 'Liên hệ');
                    perProducts = priceDesProducts.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );
    
                    if(checkFlag === false) {
                        renderPageNumbers(priceDesProducts);
                    }
    
                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    descendingBtn.querySelector('i').classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }     
            }
            else {
                //******************** filter tool trên mobile ********************\\
                // sắp xếp sản phẩm theo mặc định
                var defaultBtn = document.querySelector('.defaulting_js.filter__tool--active');
                if(defaultBtn) {
                    handleDefaultProduct();
                }

                function handleDefaultProduct() {
                    products.sort((a, b) => a.id - b.id);

                    perProducts = products.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );
                    if(checkFlag === false) {
                        renderPageNumbers(products);
                    }

                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    selectTool[0].classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }
                
                // sắp xếp sản phẩm theo thứ tự giảm dần
                var descendingBtn = document.querySelector('.descending_js.filter__tool--active');
    
                if(descendingBtn) {
                    handleDescProduct();
                }

                function handleDescProduct() {
                    products.sort((a, b) => b.currentPrice - a.currentPrice);
                    var priceDesProducts = products.filter(product => product.currentPrice !== 'Liên hệ');
                    perProducts = priceDesProducts.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );

                    if(checkFlag === false) {
                        renderPageNumbers(priceDesProducts);
                    }

                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    selectTool[1].classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }  

                // sắp xếp sản phẩm theo thứ tự tăng dần
                var ascendingBtn = document.querySelector('.ascending_js.filter__tool--active');
    
                if(ascendingBtn) {
                    handleAscProduct();
                }

                function handleAscProduct() {
                    products.sort((a, b) => a.currentPrice - b.currentPrice);
                    var priceAscProducts = products.filter(product => product.currentPrice !== 'Liên hệ');
                    perProducts = priceAscProducts.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );

                    if(checkFlag === false) {
                        renderPageNumbers(priceAscProducts);
                    }

                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    selectTool[2].classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }

                // sắp xếp sản phẩm theo sản phẩm giảm giá
                var discountBtn = document.querySelector('.discounting_js.filter__tool--active');
    
                if(discountBtn) {
                    handleDiscountProduct();
                }
                
                function handleDiscountProduct() {
                    var discountProducts = products.filter(product => product.oldPrice !== '');
                    perProducts = discountProducts.slice(
                        (currentPage - 1) * perPage,
                        (currentPage - 1) * perPage + perPage
                    );

                    if(checkFlag === false) {
                        renderPageNumbers(discountProducts);
                    }
                    
                    if(document.querySelector('.filter__tool--active')) {
                        document.querySelector('.filter__tool--active').classList.remove('filter__tool--active');
                    }
                    selectTool[3].classList.add('filter__tool--active');
                    document.querySelector('.list-product-render').innerHTML = renderProduct(perProducts).join('');
                }
                
                // handle onchange event for selectTool (filter on mobile)
                selectTool.onchange = (e) => {
                    switch (e.target.value) {
                        case '0':
                            checkFlag = false;
                            currentPage = 1;
                            if(!e.target[0].className.includes('filter__tool--active')) {
                                document.querySelector('.products-pagination').innerHTML = "";
                                handleDefaultProduct();
                            }
                            break;
                        case '1':
                            checkFlag = false;
                            currentPage = 1;
                            
                            if(!e.target[1].className.includes('filter__tool--active')) {
                                document.querySelector('.products-pagination').innerHTML = "";
                                handleDescProduct();
                            }
                            break;
                        case '2':
                            checkFlag = false;    
                            currentPage = 1;
        
                            if(!e.target[2].className.includes('filter__tool--active')) {
                                document.querySelector('.products-pagination').innerHTML = "";
                                handleAscProduct();
                            }
                            break;
                        case '3':
                            checkFlag = false;
                            currentPage = 1;
    
                            if(!e.target[3].className.includes('filter__tool--active')) {
                                document.querySelector('.products-pagination').innerHTML = "";
                                handleDiscountProduct();
                            }
                            break;
                        default:
                            return 0;
                    }
                } 
                //########### END handle onchange event for selectTool (filter on mobile) ###########\\ 
            }
        }