$(function(){
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head")
    $("<link rel='stylesheet' href='css/font-awesome.min.css'>").appendTo("head")
    $.ajax({
        url:"http://localhost:3000/footer.html",
        type:"get",
        success:function(result){
            $("#footer").replaceWith(result);
        }
    })
})