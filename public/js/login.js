$(function(){
    var $btn=$("div.login-button>form").children(":last");
    var $form=$("div.login-button>form");
    console.log($btn)
    $btn.click(function(){
        var $btn=$(this);
        var uname=$btn.siblings().eq(0).val();
        //console.log(uname);
        var upwd=$btn.siblings().eq(1).val();
        //console.log(upwd);
        (async function(){
            var res=await $.ajax({
                url:"http://localhost:3000/user/signin",//请求的url
                type:"post",
                data:{uname,upwd},
                dataType:"json"
            })
            if(res.ok==0)
             alert(res.msg);
             else{
                 alert("登录成功!")
                 if(location.search.startsWith("?back="))
                 var url=location.search.slice(6);
                 else var url="index.html";
                 location.href=url;
             }
        })()
    })
    $form.keyup(function(e){
        if(e.keyCode==13)
        $btn.click();
    })
    //
})