const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
    var pid=req.query.pid;
    var output={
      product:{},
      specs:[]
    }
    if(pid!==undefined){
      var sql1=`select * from HW_phone where pid=?`;
      pool.query(sql1,[pid],(err,result)=>{
        if(err) console.log(err);
        output.product=result[0];
        var phone_spec_id=output.product["phone_spec_id"];
        var sql2=`select spec,pid from HW_phone where phone_spec_id=?`;
        pool.query(sql2,[phone_spec_id],(err,result)=>{
          if(err) console.log(err);
          output.specs=result;
          res.send(output);
        })
      })
    }else{
      res.send(output);
    }
  })
  
  module.exports=router;