/**
 * Created by JingLong on 2017/1/11.
 * 尚硅谷QQ公开课：
 * http://www.atguigu.com
 */
window.onload = function () {

    var aimaState = {
        "page0" : 0,
        "page1" : 0
    }

    initPageSize();

    var firstChild = document.querySelector("#page0 div:first-child");
    var lastChild = document.querySelector("#page0 div:last-child");

    var boxes = document.querySelectorAll(".box");

    var menu = document.querySelector("#menu");
    var menuItem = menu.querySelectorAll("a");

    var currentIndex = 0;
    //在那一页显示那个页面对应的导航
    var hrefVal = location.href;
    //注意这里使用indexOf > 0 即可 最后解决这个BUG
    if(hrefVal.indexOf("#page") > 0){
        currentIndex = hrefVal.substr(hrefVal.length - 1);
    }
    menuItem[currentIndex].classList.add("item-active");
    menu.onclick = function(ev){
        var hrefVal = ev.target.href;
        if(hrefVal == null){
            return;
        }
        menuItem[currentIndex].classList.remove("item-active");
        currentIndex= hrefVal.substring(hrefVal.length - 1);
        menuItem[currentIndex].classList.add("item-active");

        page0Animation();
        page1Animation();
    }

    page0Animation();

    var lastWheelTime = Date.now();
    window.onmousewheel = function(ev){
        var currentWheelTime = Date.now();
        var intervalWheelTime = currentWheelTime - lastWheelTime;

        //当两个滚轮事件的时间间隔大于120ms，可以当作有效的滚轮事件（函数节流）
        if(intervalWheelTime > 120){
            console.log(ev.wheelDelta);
            //上翻页
            if(ev.wheelDelta < 0 && currentIndex < 2){
                menuItem[currentIndex].classList.remove("item-active")
                ++currentIndex;
                menuItem[currentIndex].click();
                menuItem[currentIndex].classList.add("item-active")

            }

            //下翻页
            if(ev.wheelDelta > 0 && currentIndex >0){
                menuItem[currentIndex].classList.remove("item-active")
                --currentIndex;
                menuItem[currentIndex].click();
                menuItem[currentIndex].classList.add("item-active")
            }

            page0Animation();
            page1Animation();


        }

        lastWheelTime = currentWheelTime;

    }

    function page0Animation(){

        if(currentIndex == 0 && aimaState.page0 == 0){
            firstChild.classList.add("page0-show");
            lastChild.classList.add("page0-show");
            aimaState.page0 = 1;
        }
        if(currentIndex != 0 && aimaState.page0 == 1){
            firstChild.classList.remove("page0-show");
            lastChild.classList.remove("page0-show");
            aimaState.page0 = 0;
        }
    }

    function page1Animation(){
        if(currentIndex == 1 && aimaState.page1 == 0){
            boxes.forEach(function(boxDom){
                boxDom.classList.add("page1-show");
            })
            aimaState.page1 = 1;
        }
        if(currentIndex != 1 && aimaState.page1 == 1){
            boxes.forEach(function(boxDom){
                boxDom.classList.remove("page1-show");
            })
            aimaState.page1 = 0;
        }

    }

    function initPageSize(){
        //pages
        var pageList = document.querySelectorAll("#pages li");
        pageList.forEach(function(pageDom){
            pageDom.style.width = innerWidth + "px";
            pageDom.style.height = innerHeight + "px";
        })
    }

}
