$(function(){
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head")
    $("<link rel='stylesheet' href='css/font-awesome.min.css'>").appendTo("head")
    $.ajax({
        url:"http://localhost:3000/header.html",
        type:"get",
        success:function(res){
            $("#top").replaceWith(res)
            //获取搜索框
            var $btn=$("#foot-search>div.foot-border>input");
            //console.log($btn);
            //获取文本输入框
            var $input=$("#foot-input>div.foot-borde>input");
            //$("#input1").bind("input propertychange",function(event){
            // console.log($("#input1").val())
            //});
            //console.log($input);
            //绑定鼠标搜索事件
            $btn.click(function(){
                var kw=$input.val().trim();
                console.log(kw);
                if(kw!=="")
                location.href=`store.html?keyword=${kw}`;
            })
            //绑定文本框事件
            $input.keyup(function(e){
                if(e.keyCode==13){
                    $btn.click();
                }
            })
            if(location.search.indexOf("keyword=")!=-1){
                var keyword=decodeURI(location.search.split("=")[1]);
                $input.val(keyword);
            }
            //点击登录按钮跳转登录页面
            var $btns=$("li.top-signin").children(":nth-child(2)")
                console.log($btn);
            var span=$("li.cart-list>span");
            var ulCart=$("ul.cart-detail");
            var cartBtn=$("li.cart-list>a")
            $btns.click(function(e){
                e.preventDefault();
                location.href="login.html?back="+location.href;
            })
            $.ajax({
                url:"http://localhost:3000/user/islogin",
                type:"get",
                dataType:"json",
                success:function(result){
                    if(result.ok==0){
                        $("li.top-signin").show().next().hide();
                        span.hide();
                        cartBtn.click(function(e){
                            e.preventDefault();
                            alert("登录才可查看购物车")
                        })
                    }else{
                        var uname=result.uname;
                        var permoney=`￥${result.money.toFixed(2)}`;
                        //console.log(permoney);
                        $("li.top-signin").hide().next().show();
                        $("li.top-signout").children(":nth-child(2)").children(":first-child").html(uname);
                        $("ul.top-rt-ul").children(":first-child").children(":first-child").children(":nth-child(3)").hide().prev().show().html(permoney);
                        $("li.top-signout").show().prev().hide();
                        $.ajax({
                            url:"http://localhost:3000/cart/items",
                            dataType:"json",
                            type:"get",
                            success:function(data){
                                span.show();
                                console.log(data);
                                if(data.length==0){
                                    span.html(0);
                                }else{
                                    var html="";
                                    var count=0;
                                    for(var list of data){
                                        count+=list.count;
                                        html+=`                        <li>
                                            <div class="cart-img">
                                                <a href="cart.html" data-target="list">
                                                    <img src="${list.img_url}" alt="">
                                                </a>
                                            </div>
                                            <div class="cart-list">
                                                <p>${list.pname}</p>
                                                <p>￥${list.new_price.toFixed(2)}</p>
                                                <p>数量:${list.count}</p>
                                            </div>
                                        </li>          
                                            `;
                                            ulCart.html(html);
                                            console.log(ulCart);
                                            span.html(count);
                                    }
                                    //绑定鼠标事件
                                    var num=0;
                                    cartBtn.click(function(e){
                                            num++;
                                            e.preventDefault();
                                            if(num%2==0)
                                            ulCart.css("display","none");
                                            else
                                            ulCart.css("display","block");
                                    })
                                }
                            }
                        })
                    }
                }
            })
            var $exitBtn=$("li.top-signout").children(":nth-child(3)");
            console.log($exitBtn);
            $exitBtn.click(function(){
                $.ajax({
                    url:"http://localhost:3000/user/signout",
                    type:"get",
                    success:function(result){
                        location.reload();
                    }
                })
            })
        }
    })
})