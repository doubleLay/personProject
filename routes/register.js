const express=require("express");
const pool=require("../pool.js");
const router=express.Router();
router.post("/check",(req,res)=>{
    var name=req.body.uname;
    var sql="SELECT * FROM elec_user WHERE name=?";
    pool.query(sql,[name],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
        res.writeHead(200,{
                "Content-type":"application/json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            })
            res.write(JSON.stringify({ok:1}));
            res.end();
        }else{
            res.write(JSON.stringify({ok:0}));
            res.end();
        }
    })
})
router.post("/",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var uphone=req.body.uphone;
    var uemail=req.body.uemail;
    var gender=req.body.gender;
    var sql="INSERT INTO elec_user VALUES(null,?,?,?,null,?,?,?)";
    pool.query(sql,[uname,gender,uphone,upwd,uemail,0],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.writeHead(200,{
                "Content-type":"application/json;charset=utf-8",
                "Access-Control-Allow-Origin":"*"
            })
            res.write(JSON.stringify({ok:1}));
            res.end();
        }else{
            res.write(JSON.stringify({ok:0}));
            res.end();
        }
    })
})
module.exports=router;