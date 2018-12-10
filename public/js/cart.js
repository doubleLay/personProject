$(function(){
    $.ajax({
        url:"http://localhost:3000/cart/items",
        type:"get",
        dataType:"json",
        success:function(result){
            console.log(result);
            var html="";
            var ulCart=$("ul.cart-list");
            for( var list of result){
                html+=
                `
                <li>
                    <div class="cart-select">
                        <input type="checkbox" name="check">
                    </div>
                    <div class="cart-product">
                        <div class="cart-image">
                            <a href="#" data-id=${list.nid}>
                                <img src="${list.img_url}" alt="">
                            </a>
                        </div>
                        <div class="cart-text">
                            <a href="#">${list.pname}</a>
                            <span>${list.details}</span>
                        </div>
                    </div>
                    <div class="cart-price">
                        <p>￥${list.new_price.toFixed(2)}</p>
                        <del>￥${list.old_price.toFixed(2)}</del>
                    </div>
                    <div class="cart-count">
                        <button>-</button>
                        <span>${list.count}</span>
                        <button>+</button>
                    </div>
                    <div class="cart-total">
                        <p>￥${(list.new_price*list.count).toFixed(2)}</p>
                    </div>
                    <div class="cart-delete">
                        <a href="#" data-nid=${list.nid}>删除</a>
                    </div>
                </li>
                `
                ulCart.html(html);
            }
            var add=$("div.cart-count").children(":last-child");
            var odd=add.siblings("button");
            add.click(function(){
                var $btn=$(this);
                var span=$btn.prev();
                var total=$btn.parent().next().children(":first-child");
                var price=parseInt($btn.parent().prev().children(":first-child").html().slice(1));
                var num=parseInt(span.html());
                num++;
                span.html(num);
                total.html(`￥${(price*parseInt(span.html())).toFixed(2)}`);
            })
            odd.click(function(){
                var $btn=$(this);
                var span=$btn.next();
                var total=$btn.parent().next().children(":first-child");
                var price=parseInt($btn.parent().prev().children(":first-child").html().slice(1));
                var num=parseInt(span.html());
                if(num>1){
                    num--;
                    span.html(num);
                    total.html(`￥${(price*parseInt(span.html())).toFixed(2)}`);
                }
            })
            //勾选框和数据更新
            var allSelect=$("#cartCheck");
            var checkSelect=$("input[name='check']");
            //商品数量及总价
            var countTotal=$("div.subtitle-text").children(":nth-child(2)");
            var priceTotal=$("div.subtitle-text").children(":nth-child(4)");
            //全选
            allSelect.click(function(){
               if($(this).is(":checked")){
                   checkSelect.prop("checked",true);
               }else{
                   checkSelect.prop("checked",false);
               }
               allPrice();
               checkNum();
            })
            //单选
            checkSelect.change(function(){
                if($("input[name='check']").not(":checked").length<=0){
                    allSelect.prop("checked",true);
                }else{
                    allSelect.prop("checked",false);
                }
                allPrice();
                checkNum();
            })
            function checkNum(){
                var num=0;
                checkSelect.each(function(){
                    if(this.checked==true){
                        num+=parseInt($(this).parent().parent().children(":nth-child(4)").children(":nth-child(2)").html());
                    }
                })
                countTotal.html(num);
            }
            function allPrice(){
                var sum=0;
                checkSelect.each(function(){
                    if(this.checked==true){
                        sum+=parseInt($(this).parent().parent().children(":nth-child(5)").children(":first-child").html().slice(1));
                        console.log(sum);
                    }
                })
                priceTotal.html(`￥${sum.toFixed(2)}`);
            }
            //删除操作
            var $cartDel=$("div.cart-delete");
            console.log($cartDel);
            $cartDel.on("click","[data-nid]",function(e){
                e.preventDefault();
                var $btn=$(this);
                var nid=$btn.attr("data-nid");
                if(confirm("是否删除商品")){
                    $.ajax({
                        url:"http://localhost:3000/cart/det",
                        type:"get",
                        dataType:"json",
                        data:{nid},
                        success:function(result){
                            console.log(result);
                                alert("商品删除成功");
                                location.reload();
                            }
                    })
                }
            })
        }
    })
})