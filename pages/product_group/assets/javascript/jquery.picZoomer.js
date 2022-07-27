// **************** Zoom image in product detail ****************\\
var img, lens, result, cx, cy;
img = document.getElementById("myimage");
result = document.getElementById("myresult");
lens = document.querySelector(".img-zoom-lens");
var img_container = document.querySelector(".img-zoom-container");

// console.log(window.innerWidth);
if(window.innerWidth > 1000) {
    if(img) {
        img.addEventListener("mouseenter", function() {
            result.style.display = "block";
            lens.style.display = "block";
        
            cx = result.offsetWidth / lens.offsetWidth;
            cy = result.offsetHeight / lens.offsetHeight;
        
            /*set background properties for the result DIV:*/
            result.style.backgroundImage = "url('" + img.src + "')";
            result.style.backgroundRepeat = "no-repeat";
            result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
            
        });
        
        img_container.addEventListener("mouseleave", function(e) {
            lens.style.display = "none";
            result.style.display = "none";
        })
        
        img.addEventListener("mousemove", moveLens);
        lens.addEventListener("mousemove", moveLens);
        
        /*and also for touch screens:*/
        lens.addEventListener("touchmove", moveLens);
        img.addEventListener("touchmove", moveLens);
        
        function moveLens(e) {
        result.style.display = "block";
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
        if (y < 0) {y = 0;}
        
        /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
        }
        
        function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
        }
    }
    
}

var picItems = document.querySelectorAll('.piclist li');
    var myImage = document.getElementById('myimage');
    
    picItems.forEach((picItem) => {
    picItem.onclick = (e) => {
    document.querySelector('li.pic-item--active').classList.remove("pic-item--active");
    e.target.parentElement.classList.add('pic-item--active');
    myImage.src = e.target.src;
    }
})
