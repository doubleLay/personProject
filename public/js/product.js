$(function(){
    if(location.search.indexOf("id=")!=-1) {
        var pid=location.search.split("=")[1];
         $.ajax({
            url:"http://localhost:3000/product/list",
            type:"get",
            dataType:"json",
            data:{pid},
            async:"false",
            success:function(result){
                console.log(result);
                //导入放大镜模块图片
                var html="";
                for(var list of result){
                html+=`
                    <li>
                        <a href="#" class="${list.pid==list.nid?'active':''}" data-id="${list.nid}">
                            <img src="${list.img_url}" data-md="${list.img_url}" data-lg="${list.img_url}">
                        </a>
                    </li>`;
                }
                $("ul.mask-ul").html(html);
                //获取放大镜的背景图片
                var lboxDiv=$("div.lBox");
                lboxDiv.css("background",`url(${result[0].img_url})`);
                //获取中图图片
                var mImg=$("div.mImg").children(":first-child");
                mImg.attr("src",result[0].img_url);
                var $mask=$("div.mask");
                var ulList=$("ul.details-list");
                var liLen=$("ul.mask-ul").children().length;
                ulList.css("width",liLen*450);
                var $lBox=$("div.lBox");
                var mSize=150;
                var MAX=300-mSize;
                // $lBox.css("background-image",`url(${pic})`);
                $("div.s-mask").mouseenter(function(){
                    $mask.show();
                    $lBox.show();
                    $lBox.css("background-color","#fff");
                });
                $("div.s-mask").mouseleave(function(){
                    $mask.hide();
                    $lBox.hide();
                });
                $("div.s-mask").mousemove(function(e){
                    // console.log(e.offsetX);
                    var left=e.offsetX-mSize/2;
                    var top=e.offsetY-mSize/2;
                    // console.log(e.offsetY);
                    if(left<0) left=0; else if(left>MAX) left=MAX;
                    if(top<0) top=0;else if(top>MAX) top=MAX;
                    $mask.css({left,top});
                    $lBox.css("background-position",`-${2*left}px -${2*top}px`);
                })
                //图片切换，按钮禁用
                var up=$("button.section-up");
                var down=$("button.section-down");
                var ul=$("ul.mask-ul");
                var len=ul.children().length;
                down.addClass("disabled");
                var html="";
                for( var list of result){
                    html+=`
                    <li>
                    <h3 class="h3-text">${list.pname}</h3>
                    <a href="#" class="a-i">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star fa-else"></i>
                    </a>
                    <a href="#" class="a-text">12条评论
                    </a>
                    <b>|</b>
                    <a href="#" class="a-text"> 添加评论</a>
                    <div class="text-main">
                    <h3>￥${list.new_price.toFixed(2)}
                        <del>￥${list.old_price.toFixed(2)}</del>
                        <span>库存:${list.stock}件</span>
                    </h3>
                    <p>
                    ${list.details}
                    </p>
                    <div class="input-text">
                    <span>数量</span>
                    <div class="input-span">
                    <span class="input-span1">-</span>
                    <input type="text" value="1">
                    <span class="input-span2">+</span>
                    <span class="input-else">(亲!商品限购150件)</span>
                    </div>
                    </div>
                    <button class="button-type">
                        <i class="fa fa-shopping-cart"></i>
                        <a href="#" data-nid=${list.nid}>添加购物车</a>
                    </button>
                    <ul class="ul-type">
                        <li>
                        <a href="#">
                            <i class="fa fa-heart-o"></i>
                            添加收藏
                        </a>
                        <a href="#" class="cate">
                            <i class="fa fa-exchange"></i>
                            同类产品
                        </a>
                        </li>
                        <li>
                        种类:
                        <a href="#" class="cate">手机</a>
                        <a href="#" class="cate">配件</a>
                        </li>
                        </ul>
                    </li>
                    `
                }
                ulList.html(html);
                    var moved=0;
                    // 下边按钮默认禁用
                    down.on("click",function(){
                        // 如果下边是禁用状态，那么下边按钮不能点击
                        if (!$(this).is(".disabled")){
                        moved--;
                        ul.css("marginTop",-161*moved);
                        up.removeClass("disabled");
                        ul.find("a").removeClass("active");
                        ul.find("li").eq(moved).children(":first-child").addClass("active");
                        var ulList=$("ul.details-list");
                        ulList.css("marginLeft",-moved*450);
                        var img= ul.find("li").eq(moved).children(":first-child").children(":first-child");
                        var mImg=$("div.mImg").children(":first-child");
                        var md=img.attr("data-md");
                        var lg=img.attr("data-lg");
                        lboxDiv.css("background",`url(${lg})`);
                        mImg.attr("src",md);              
                        //console.log(moved)
                        if (moved==0){
                            $(this).addClass("disabled");
                        }
                          } //jquery中不用px
                        //判断左边按钮何时禁用
                        //当移动到第一张图片的时候禁用
                    })
                    up.on("click",function(){
                        if(!$(this).is(".disabled")){
                        moved++;
                        console.log(moved);
                        ul.css("marginTop",-161*moved);
                        ul.find("a").removeClass("active");
                        ul.find("li").eq(moved).children(":first-child").addClass("active");
                        down.removeClass("disabled");
                        var img= ul.find("li").eq(moved).children(":first-child").children(":first-child");
                        console.log(img);
                        var mImg=$("div.mImg").children(":first-child");
                        console.log(mImg);
                        var md=img.attr("data-md");
                        var lg=img.attr("data-lg");
                        lboxDiv.css("backgroundImage",`url(${lg})`);
                        mImg.attr("src",md);
                        console.log(mImg.attr("src"));
                        var ulList=$("ul.details-list");
                        ulList.css("marginLeft",-moved*450);    
                        if (len-moved<=3){
                            $(this).addClass("disabled");
                        }
                        }
                    })
                    //点击图片添加选中样式 active
                   ul.on("click","a",function(e){
                        e.preventDefault();
                       var $btn=$(this);
                       var img=$btn.children(":first-child");
                       var mImg=$("div.mImg").children(":first-child");
                       var md=img.attr("data-md");
                       var lg=img.attr("data-lg");
                       lboxDiv.css("background",`url(${lg})`);
                       mImg.attr("src",md);
                        ul.children().find("a").removeClass("active");
                        $btn.addClass("active");
                        var t=$btn.parent().index();
                        console.log($btn.parent().index());
                        console.log(t);
                        ulList.css("marginLeft",-t*450);
                    })
                 //添加商品按钮
                 var odd=$("span.input-span1");
                 var add=$("span.input-span2");
                 var input=$("div.input-span").children(":nth-child(2)");
                 //输入框内容监听
                 input.each(function(){
                    var $btn=$(this);
                    $btn.focus(function(){
                       $btn.attr("data-oval",$btn.val());
                    }).blur(function(){
                        var oldVal=$btn.attr("data-oval");
                        var newVal=$btn.val();
                        if(oldVal!=newVal){
                           $btn.val(newVal);
                       }
                   })
                 })
                odd.click(function(){
                    var $btn=$(this);
                    $btn.next().blur();
                    var val=$btn.next().val();
                     if(val>0)
                     {
                        val--;
                        $btn.next().val(val);
                     }else{
                        return;
                     }
                })
                add.click(function(){
                    var $btn=$(this);
                    $btn.prev().blur();
                    var val=$btn.prev().val();
                     if(val<150){
                        val++;
                        $btn.prev().val(val); 
                     }
                     else{
                         return;
                     }
                })
                //点击切换
                var $diVs=$("div.flow").children();
                $("ul.ul-flow").on("click","[data-flow]",function(e){
                      e.preventDefault();
                      var $btn=$(this);
                      if($("ul.ul-flow>li").is(".active")){
                          $("ul.ul-flow>li").removeClass("active");
                          $btn.parent().addClass("active");
                      } 
                      var id=$btn.attr("href");
                      $diVs.removeClass("in");
                      $(id).addClass("in");
                })
                //图片分页请求
                $("ul.ul-flow").children(":nth-child(3)").children(":first-child").click(function(){
                    var pno=0;
                    function loadPage(no=0){
                      pno=no;
                        $.ajax({
                            url:"http://localhost:3000/product/comment",
                            type:"get",
                            dataType:"json",
                            data:{pno},
                            success:function(output){
                                console.log(output);
                                var html="";
                                var ul=$("ul.comment-ul");
                                for(var list of output.products){
                                    html+=`
                                    <li>
                                    <div class="comment-name">
                                    <h5>${list.cname}</h5>
                                    <p>${list.comment_date.slice(0,10)}</p>
                                    <div>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div> 
                                    </div> 
                                    <div class="comment-contain">
                                        ${list.comment_contain}
                                    </div>                                          
                                    </li>
                                    `;
                                ul.html(html);
                               }
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
                        }
                        })
                    }
                    loadPage();
                    var ulPage=$("ul.pagenation");
                    ulPage.on("click","a",function(e){
                        e.preventDefault();
                        var $a=$(this);
                        var no=$a.html()-1;
                        loadPage(no);//重新加载页面内容
                    })  
                })
                //购物车请求
                function cart(){
                    var $btn=$("button.button-type").children(":nth-child(2)");
                    console.log($btn);
                    $btn.click(function(e){
                        e.preventDefault();
                        var $btn=$(this);
                        var nid=$btn.attr("data-nid");
                        var count=$btn.parent().prev().children(":nth-child(2)").children(":nth-child(2)").val();
                        console.log(count);
                        console.log(nid);
                        $.ajax({
                            url:"http://localhost:3000/user/islogin",
                            type:"get",
                            dataType:"json",
                            success:function(result){
                                if(result.ok==0){
                                    alert("亲!登录后才可添加购物车");
                                }
                                else{
                                    $.ajax({
                                        url:"http://localhost:3000/cart/add",
                                        type:"get",
                                        data:{nid,count},
                                        success:function(result){
                                            alert("添加购物车成功!");
                                            location.href="cart.html";
                                        }
                                    })
                                }
                            }
                        })
                    })
                }
                cart()
            }
         })
         $.ajax({
             url:"http://localhost:3000/product/lslist",
             type:"get",
             dataType:"json",
             async:"falese",
             success:function(result){
                 console.log(result);
                 //遍历获取类似商品
                 var html="";
                 var $ulSimi=$("ul.carousel-ul");
                 for( var list of result){
                     html+=`
                     <li>
                        <div class="center-product1">
                            <img src="${list.img_url}">
                            <p>${list.pname}</p>
                            <h3>
                                <a href="#">${list.title}</a>
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
                        <ul class="center-product-ul">
                            <li class="tipp">
                                <a href="#">
                                    <i class="fa fa-heart-o"></i>
                                </a>
                                <span class="tooltipp">添加收藏</span>
                            </li>
                            <li class="change">
                                <a href="#">
                                    <i class="fa fa-exchange"></i>
                                </a>
                                <span class="exchange">对比产品</span>
                            </li>
                            <li  class="view">
                                <a href="#">
                                    <i class="fa fa-eye"></i>
                                </a>
                                <span class="quickView">详细信息</span>
                            </li>
                        </ul>
                        <div class="pro-bor1">
                            <a href="cart.html">
                                <i class="fa fa-shopping-cart"></i>
                                加入购物车
                            </a>
                        </div>
                    </li>
                     `;
                 }
                 $ulSimi.html(html);
                 $ulSimi.css("width",$ulSimi.children().length*293);
                 console.log($ulSimi.width());
                //最下的自动轮播
                var v1=$("div.carousel-note");
                var v2=$("ul.carousel-ul");
                var v3=$("ul.carousel-clone");
                    v3.html(v2.html());
                function marquee() {
                var width=parseInt(v2.width());
                var left=parseInt(v2.css("left"));
                    if(left<=-1465){
                        v2.css("left",0);
                    }else{
                        left--;
                        v2.css("left",left);
                    }
                }
                // 设置一个定时器
                var s = setInterval(marquee, 20);
                // 鼠标悬浮滚动停止
                v1.mouseenter(function() { clearInterval(s);}) 
                v1.mouseleave(function() { s = setInterval(marquee,20);})
            }
         })
    }
})

