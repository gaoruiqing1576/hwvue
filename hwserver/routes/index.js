const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  var output={
    recommend:[],
    carousel:[],
    product:[]
  };
  var sql1=`SELECT * FROM HW_recommend_product`;
  pool.query(sql1,[],(err,result)=>{
    if(err)  console.log(err);
    output.recommend=result;   
  })
  var sql2=`SELECT * FROM HW_index_carousel`;
  pool.query(sql2,[],(err,result)=>{
    if(err)  console.log(err);
    output.carousel=result;   
  })
  var sql3=`SELECT * FROM HW_index_product`;
  pool.query(sql3,[],(err,result)=>{
    if(err) console.log(err);
    output.product=result;
    res.send(output);   
  })     
 
})

module.exports=router;