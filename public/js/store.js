$(function(){
    //向Ajax发送异步请求
    if(location.search.indexOf("keyword=")!=-1) {
        var keyword=decodeURI(location.search.split("=")[1]);
        console.log(keyword);
        var pno=0;//初始页码.模拟状态
        function loadPage(no=0){
            pno=no;
            //封装AJAX
            $.ajax({
                url:"http://localhost:3000/store/list",
                type:"get",
                data:{keyword,pno},
                dataType:"json",
                success:function(output) {
                    console.log(output);
                    var {products}=output;
                    var html='';
                    var ulList=$("ul.carousel-ul");
                    for( var list of products){
                        html+=`
                        <li>
                            <div class="center-product1">
                                <img src="${list.img_url}">
                                <p>联想笔记本</p>
                                <h3>
                                    <a href="#">${list.pname}</a>
                                </h3>
                                <h4>
                                    <span>￥${list.new_price.toFixed(2)}</span>
                                    <del>￥${list.old_price.toFixed(2)}</del>
                                </h4>
                                <div class="star">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i> 
                                </div> 
                            </div>
                            <span class="pro-s1">热卖中</span>
                            <span class="pro-n1">新品</span>
                            <div class="pro-bor1">
                                <a href="cart.html">
                                    <i class="fa fa-shopping-cart"></i>
                                                加入购物车
                                </a>
                            </div>
                        </li>
                        `;
                    }
                    ulList.html(html);
                    var $pro=$("div.pro")
                    //分页
                    var html="";
                    var ulPage=$("ul.pagenation");
                    for(var i=1;i<=output.pageCount;i++){
                        html+=`
                        <li class="page-link ${i==pno+1?'active':''}">
                            <a href="#">${i}</a>
                        </li> 
                        `
                    }
                    ulPage.html(html);
                    var $box=$("div.pro-bor1");
                    $box.mouseenter(function(){
                        $box.css("padding")
                    })
                    ulPage.prepend(`
                        <li class="page-link">
                            <button >上一页</button>
                        </li>`);
                    ulPage.append(`                                    
                    <li class="page-link">
                        <button>下一页</button>
                    </li>
                    `);
                    //如果pno=0 禁用上一页按钮
                    if(pno==0){
                        ulPage.find("li").eq(0).children(":first-child").addClass("disabled");
                    }else{
                        ulPage.find("li").eq(0).children(":first-child").removeClass("disabled");
                    }
                    //最后一页设置禁用下一页
                    if(pno==output.pageCount-1){
                        ulPage.find("li").eq(pno+2).children(":first-child").addClass("disabled");
                    }else{
                        ulPage.find("li").eq(pno+2).children(":first-child").removeClass("disabled");
                    }
                    var $btn1=ulPage.find("li").eq(0).children(":first-child");
                    console.log($btn1);
                    $btn1.click(function(){
                        if(pno>=1){
                            no=pno-1;
                            loadPage(no);
                        }
                    })
                    var $btn2=ulPage.find("li").eq(-1).children(":first-child");
                    $btn2.click(function(){
                        if(pno<=output.pageCount-2){
                            no=pno+1;
                            loadPage(no);
                        }
                    })
                    var ulPage=$("ul.pagenation");
                    ulPage.on("click","a",function(e){
                        e.preventDefault();
                        var $a=$(this);
                        var no=$a.html()-1;
                        loadPage(no);//重新加载页面内容
                    })  
                }
    })
}
    loadPage();
}
})