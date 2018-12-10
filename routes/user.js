const express=require("express");
const pool=require("../pool");
const router=express.Router();
router.post("/signin",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var sql="SELECT * FROM elec_user WHERE name=? AND password=?"
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            console.log(result)
            var user=result[0]
            res.writeHead(200);
            req.session.eid=user.eid;
            res.write(JSON.stringify({
                ok:1
            }))
        }else{
            res.write(JSON.stringify({
                ok:0,
                msg:"用户名或密码错误!"
            }))
        }
        res.end();
    })
});
router.get("/islogin",(req,res)=>{
    res.writeHead(200);
    if(req.session.eid===undefined){
        res.write(JSON.stringify({ok:0}))
        res.end()
    }else {
        var eid=req.session.eid;
        var sql="select * from elec_user where eid=?";
        pool.query(sql,[eid],(err,result)=>{
          if(err) console.log(err);
          var user=result[0];
          res.write(JSON.stringify({ok:1,uname:user.name,money:user.money}))
          res.end()
      })
    }
});
router.get("/signout",(req,res)=>{
    req.session.eid=undefined;
    res.end();
});
module.exports=router;