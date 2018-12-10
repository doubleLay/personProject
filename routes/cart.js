const express=require("express");
const pool=require("../pool");
const router=express.Router();
//查询用户是否登录,添加商品到购物车
router.get("/add",(req,res)=>{
    //客户请求参数
    var eid=req.session.eid;
    var count=req.query.count;
    var nid=req.query.nid;
    pool.query("SELECT * FROM elec_cart WHERE eid=? AND nid=?",[eid,nid],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            pool.query("INSERT INTO elec_cart VALUES(null,?,?,?)",[eid,nid,count],(err,result)=>{
                if(err) throw err;
                res.end();
            })
        }else{
            pool.query("UPDATE elec_cart set count=count+? WHERE eid=? AND nid=?",[count,eid,nid],(err,result)=>{
                if(err) throw err;
                res.end();
            })
        }
    })
})
//登录购物车查询当前用户购物车商品列表
router.get("/items",(req,res)=>{
    var eid=req.session.eid;
    var sql="SELECT * FROM elec_cart AS A INNER JOIN elec_product AS B ON A.nid=B.nid WHERE eid=?";
    pool.query(sql,[eid],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    })
})
//移除商品
router.get("/det",(req,res)=>{
    var eid=req.session.eid;
    var nid=req.query.nid;
    var sql="DELETE FROM elec_cart WHERE eid=? AND nid=?";
    pool.query(sql,[eid,nid],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    })
})
module.exports=router;