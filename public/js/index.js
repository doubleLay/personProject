$(function(){
    $.ajax({
        url:"http://localhost:3000/index/getIndex",
        type:"get",
        dataType:"json",
        success:function(result){
            var html="";
            var $hotdeal=$("ul.carousel-ul");
            var $topsell=$("#top-product>div.topsell-carousel-note").children(":first-child");
            //console.log($topsell);
            //console.log($hotdeal);
            //1.电脑页面自动生成
           for( var detail of result.slice(0,8)) {
                var {pid,pname,title,new_price,old_price,img_url}=detail;
                html+=`
                <li>
                <div class="center-product1">
                   <img src="${img_url}">
                   <p>${pname}</p>
                   <h3>
                       <a href="product.html?id=${pid}">${title}</a>
                   </h3>
                   <h4>
                       <span>￥${new_price.toFixed(2)}</span>
                       <del>￥${old_price.toFixed(2)}</del>
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
                        <a href="product.html?pid=${pid}">
                            <i class="fa fa-eye"></i>
                          </a>
                           <span class="quickView">详细信息</span>
                      </li>
                  </ul>
                  <div class="pro-bor1">
               <!--购物车图标要添加-->
                    <a href="cart.html?pid=${pid}">
                        <i class="fa fa-shopping-cart"></i>
                        加入购物车
                      </a>
                  </div>
              </li>
              `
           }
           $hotdeal.html(html);
           $topsell.html(html);
           //1.电脑页面的轮播图
           //寻找包裹轮播图的父元素
           var slideBox = $("#main-loop").next().children(":first-child");
           var topsellBox=$topsell.parent();
           console.log(topsellBox);
           //console.log(slideBox);
           var ul = slideBox.find("ul.carousel-ul");//获取ul
           //console.log(ul)
           var topul=topsellBox.find("ul.carousel-ul");
           var number = slideBox.find("div.spanBox>span");
           // console.log(number);            //注意分号 和逗号的用法
           var topNumber=topsellBox.find("div.spanBox>span");
           var timer = null;
           var topTimer=null;
           var sw = 0; 
           var topSw=0;                   
           //	每个span绑定click事件，完成切换颜色和动画，以及读取参数值
           number.on("click",function (){
           $(this).addClass("active").siblings("span").removeClass("active");
           sw=$(this).index();
           ul.animate({"left":-293*sw})
           });
           //
           topNumber.on("click",function (){
            $(this).addClass("active").siblings("span").removeClass("active");
            topSw=$(this).index();
            topul.animate({"left":-293*topSw})
            });
             //定时器的使用，自动开始
            timer = setInterval(function (){
                sw++;
                if(sw==number.length){sw=0};
                number.eq(sw).trigger("click");
            },4000);
            //
            topTimer = setInterval(function (){
                topSw++;
                if(topSw==topNumber.length){topSw=0};
                topNumber.eq(topSw).trigger("click");
            },4000);
         //hover事件完成悬停和，左右图标的动画效果
            slideBox.hover(function(){
                clearInterval(timer);
                 },function(){
                timer = setInterval(function (){
                    sw++;
                if(sw==number.length){sw=0};
                number.eq(sw).trigger("click");
            },3000);
            })
            //
            topsellBox.hover(function(){
                clearInterval(topTimer);
                 },function(){
                topTimer = setInterval(function (){
                    topSw++;
                if(topSw==topNumber.length){topSw=0};
                topNumber.eq(topSw).trigger("click");
            },3000);
            })
            //2.手机页面的自动生成
            //3.相机页面的自动生成
            //4.头戴耳机页面的自动生成
             //热卖栏动态生成
            var $li=$("#section-main>div.section-foot-main>ul.section-foot-ul").children(":first-child");
             console.log($li);
            function dateTime(){
                //抢购的具体时间
                var target=new Date("2019-1-1");
                //现在的时间
                var now=new Date();
                // console.log(target);
                //console.log(now);
                //将时间转换为秒
                var time=(target-now)/1000;
                 //console.log(time);
                //获取距离目标时间的天数
                var day=parseInt(time/24/3600);
                //console.log(day);
                //获取时间
                var hour=parseInt(time%(24*3600)/3600);
                //console.log(hour);
                //获取分钟
                //var minute=parseInt((time%(24*3600)/3600%hour)*60);
                var minute=parseInt(time%3600/60);
                console.log(minute);
                //获取秒数
                var seconds=Math.ceil(time%60);
                ;
                $li.children(":first-child").html(day);
                $li.next().children(":first-child").html(hour);
                $li.siblings().eq(1).children(":first-child").html(minute);
                //console.log( $li.siblings().eq(1).children(":first-child"));
                $li.siblings().eq(2).children(":first-child").html(seconds);
            }
            dateTime()
            setInterval(dateTime,1000)
            var html="";
            var padList=$("div.pad-carousel").children(":first-child");
            for( var list of result.slice(0,3)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                         ￥${new_price.toFixed(2)}
                            <del>￥${old_price.toFixed(2)}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.pad-carousel").children(":nth-child(2)");
            for( var list of result.slice(3,6)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                         ￥${new_price.toFixed(2)}
                            <del>￥${old_price.toFixed(2)}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.pad-carousel").children(":nth-child(3)");
            for( var list of result.slice(6,9)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                         ￥${new_price.toFixed(2)}
                            <del>￥${old_price.toFixed(2)}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.phone-carousel").children(":first-child");
            for( var list of result.slice(9,12)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                         ￥${new_price.toFixed(2)}
                            <del>￥${old_price.toFixed(2)}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.phone-carousel").children(":nth-child(2)");
            for( var list of result.slice(12,15)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                         ￥${new_price.toFixed(2)}
                            <del>￥${old_price.toFixed(2)}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.phone-carousel").children(":nth-child(3)");
            for( var list of result.slice(15,18)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                         ￥${new_price.toFixed(2)}
                            <del>￥${old_price.toFixed(2)}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.ace-carousel").children(":first-child");
            for( var list of result.slice(18,21)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                            ${new_price}
                            <del>${old_price}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.ace-carousel").children(":nth-child(2)");
            for( var list of result.slice(21,24)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                            ${new_price}
                            <del>${old_price}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var html="";
            var padList=$("div.ace-carousel").children(":nth-child(3)");
            for( var list of result.slice(24,27)) {
                var {pid,pname,title,new_price,old_price,img_url}=list;
                html+=`	
                    <li>
                        <div class="topshow-img">
                            <img src="${img_url}">
                        </div>
                        <div class="topshow-detail">
                            <p>${pname}</p>
                            <h4>
                            <a href="product.html?pid=${pid}">${title}</a>
                         </h4>
                         <h4>
                            ${new_price}
                            <del>${old_price}</del>
                        </h4>
                    </div>
                </li>`;
            }
            padList.html(html);
            var padBox=$("div.topshow-carousel");
            var phoneBox=$("div.topshow-phone");
            var aceBox=$("div.topshow-ace");
            var pad=$("div.pad-carousel");
            var oneWidth=parseInt(pad.children().eq(0).children().eq(0).width());
            var phone=$("div.phone-carousel");
            var ace=$("div.ace-carousel");
            var padTimer=null;
            var num3=0;
            function autoplay(){
                num3++;
                if(num3==parseInt(pad.children().length)){
                    pad.css("left",0);
                    num3=0;
                }
                else{
                    pad.css("left",-oneWidth*num3);
                }
            }
            autoplay();
            padBox.hover(function(){
                clearInterval(padTimer);
                 },function(){
                padtimer = setInterval(autoplay,3000);
            })
            padTimer=setInterval(autoplay,3000)
            var num1=0;
            var phoneTimer=null;
            function auto(){
                num1++;
                if(num1==parseInt(phone.children().length)){
                    phone.css("left",0);
                    num1=0;
                }
                else{
                    phone.css("left",-oneWidth*num1);
                }
            }
            auto();
            phoneBox.hover(function(){
                clearInterval(phoneTimer);
                 },function(){
                phoneTimer = setInterval(auto,3500);
            })            
            phoneTimer=setInterval(auto,3500)
            var num2=0;
            var aceTimer=null;
            function play(){
                num2++;
                if(num2==parseInt(ace.children().length)){
                    ace.css("left",0);
                    num2=0;
                }
                else{
                    ace.css("left",-oneWidth*num2);
                }
            }
            play();
            aceBox.hover(function(){
                clearInterval(aceTimer);
                 },function(){
                aceTimer = setInterval(play,3000);
            })
            aceTimer=setInterval(play,3000);
        //测试切换
        //把第一个设置默认状态
        var topList=$("div.carousel-list");
        topList.children().eq(0).fadeIn().siblings().fadeOut();
        var $diVs=topList.children();
        var $ul=$("ul.main-foot-ul");
            console.log($diVs);
        $ul.on("click","[data-target]",function(e){
            e.preventDefault();
            $btn=$(this);
            if($("ul.main-foot-ul>li").is(".active")){
                $("ul.main-foot-ul>li").removeClass("active");
                $btn.parent().addClass("active");
            } 
        var id=$btn.attr("data-target");
        $(id).stop(true).show(500).siblings().stop(true).hide(500);
    })           
        }
    })
})