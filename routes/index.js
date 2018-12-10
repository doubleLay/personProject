const express=require("express");
const pool=require("../pool.js");
const router=express.Router();
router.get("/getIndex",(req,res)=>{
    var sql="SELECT * FROM elec_indexproduct";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
       // console.log(result);
        res.writeHead(200,{
            "Content-type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    })
})
module.exports=router;