$(function(){
    //用户名获取焦点和失去焦点
    var userBtn=$("input[name='uname']");
    var uname;//用户名
    var upwd;//用户密码
    var uphone;//用户手机号
    var uemail;//用户邮箱 
    userBtn.focus(function(){
        userBtn.next().html("用户名不能超过6位!").css("color","#e4e7ed");
    })
    userBtn.blur(function(){
        checkUser();
        uname=userBtn.val();
    })
    function checkUser(){
        var reg=/^[a-zA-Z0-9]{3,10}$/;
        if(userBtn.val()==""){
        return userBtn.next().html("用户名不能为空").css("color","#d10024");
        }else if(userBtn.val().length>6){
        return userBtn.next().html("用户名长度大于6位!").css("color","#d10024");
        }else if(reg.test(userBtn.val())==false){
       return  userBtn.next().html("用户名必须是字母或数字!").css("color","#d10024");
        }else{
            var uname=userBtn.val();
            console.log(uname);
            console.log(typeof uname);
            $.ajax({
                url:"http://localhost:3000/register/check",
                type:"post",
                data:{uname},
                dataType:"json",
                success:function(result){
                    console.log(result);
                    if(result.ok==1){
                     return   userBtn.next().html("*用户名占用").css("color","#d10024");
                    }else{
                      return  userBtn.next().html("用户名可以使用").css("color","#00DC27");
                    }
                }
            })
        }
    }
   //注册密码获取焦点和失去焦点
   var userPwd=$("input[name='upwd']");
   userPwd.focus(function(){
    userPwd.next().html("密码不能少于6位!").css("color","#e4e7ed");
    })
    userPwd.blur(function(){
        checkUpwd();
        upwd=userPwd.val();
    })
    function checkUpwd(){
        var reg=/^[a-zA-Z0-9]{6,15}$/;
        if(userPwd.val()==""){
            userPwd.next().html("用户密码不能设为空").css("color","#d10024");
        }else if(userPwd.val().length<6){
             userPwd.next().html("用户密码少于6位").css("color","#d10024");
        }else if(userPwd.val().length>15){
              userPwd.next().html("用户密码不能超过15位").css("color","#d10024");
        }else if(reg.test(userPwd.val())==false){
             userPwd.next().html("用户不能有特殊字符!").css("color","#d10024");
        }else{
            userPwd.next().html("用户密码注册成功!").css("color","#00DC27");
        }
    }
    //确认密码获取焦点
    var checkPwd=$("input[data-upwd='upwd']");
    checkPwd.focus(function(){
        checkPwd.next().html("请再次输入密码!").css("color","#e4e7ed");
    })
    checkPwd.blur(function(){
        if(checkPwd.val()==""){
            checkPwd.next().html("确认密码不能为空").css("color","#d10024");
        }else if(checkPwd.val()===userPwd.val()){
            checkPwd.next().html("密码确认成功!").css("color","#00DC27");
        }else{
            checkPwd.next().html("密码不一致!").css("color","#d10024");
        }
    })
//手机号，邮箱正则验证
//手机号正则验证
    var uPhone=$("input[name='uphone']");
    uPhone.focus(function(){
        uPhone.next().html("请填写真实手机号").css("color","#e4e7ed");
    })
    uPhone.blur(function(){
        checkPhone();
        uphone=uPhone.val();
    })
    function checkPhone(){
        var reg=/^1[3|4|5|7|8][0-9]{9}$/;
        if(uPhone.val()==""){
            uPhone.next().html("手机号不能为空").css("color","#d10024")
            }else if(reg.test(uPhone.val())==false){
            uPhone.next().html("请填写有效的手机号").css("color","#d10024");
        }else{
            uPhone.next().html("手机号注册成功").css("color","#00DC27");
        }
    }
    //邮箱验证
    var $uemail=$("input[name='uemail']");
    $uemail.focus(function(){
        $uemail.next().html("请填写可用邮箱").css("color","#e4e7ed");
    })
    $uemail.blur(function(){
        checkEmail();
        uemail=$uemail.val();
    })
    function checkEmail(){
        var reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if($uemail.val()==""){
            $uemail.next().html("邮箱不能为空").css("color","#d10024")
            }else if(reg.test($uemail.val())==false){
            $uemail.next().html("邮箱格式不正确").css("color","#d10024");
        }else{
            $uemail.next().html("邮箱注册成功").css("color","#00DC27");
        }
    }
    //注册发送请求
    var $gen=$("#gender>input");
    var gender;
    $gen.each(function(){
        if($(this).is(":checked")){
            if($(this).val()==1){
                return  gender='F';
            }else{
                return gender='M';
            }
        }
        console.log(gender);
    })
    console.log(gender);
    //console.log(gender);
    var $btn=$("input[type='button']");
    $btn.click(function(){
        console.log(uname,upwd,uphone,uemail,gender);
        $.ajax({
            url:"http://localhost:3000/register/",
            type:"post",
            data:{uname,upwd,uphone,uemail,gender},
            dataType:"json",
            success:function(result){
                if(result.ok==1){
                    alert("您已经完成注册");
                    location.href="login.html";
                }
            }
        })
    })
})