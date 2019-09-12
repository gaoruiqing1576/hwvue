const express=require("express");
const router=express.Router();
const query=require("./query");

router.get("/",(req,res)=>{
    var kw=req.query;
    var output={
        count:0,
        pageSize:8,
        pageCount:0,
        pno:kw.pno||0,
        data:[]
    };
    var arr=[];
    i=0;
    j=0;
    for(var key in kw){
        //判断对象中属性的个数
        j++;
    }
    if(j>1){
        //当kw的属性大于1时,代表客户选择了条件
        if(kw.model!=null){
            arr[i]=`subtitle like '%${kw.model}%'`;
            i++;
        }
        if(kw.processor!=null){
            arr[i]=`processor like '%${kw.processor}%'`;
            i++;
        }
        if(kw.screen!=null){
            var screens=kw.screen.split("-")
            var min=parseFloat(screens[0]);
            var max=parseFloat(screens[1]);
            if(isNaN(max)==false&&isNaN(min)==false){
                arr[i]=`screen between ${min} and ${max}`;
            }else if(isNaN(max)==true){
                arr[i]=`screen>=${min}`;
            }else if(isNaN(min)==true){
                arr[i]=`screen<=${max}`;
            }
            i++;
        }
        if(kw.price!=null){
            var prices=kw.price.split("-")
            var min=parseInt(prices[0]);
            var max=parseInt(prices[1]);
            if(isNaN(max)==false&&isNaN(min)==false){
                arr[i]=`price between ${min} and ${max}`;
            }else if(isNaN(max)==true){
                arr[i]=`price>=${min}`;
            }else if(isNaN(min)==true){
                arr[i]=`price<=${max}`;
            }
            i++;
        }
        if(kw.battery!=null){
            arr[i]=`battery like '%${kw.battery}%'`;
            i++;
        }
        if(kw.memory!=null){
            arr[i]=`spec like '%${kw.memory}%'`;
            i++;
        }
        if(kw.pixel!=null){
            arr[i]=`rcamera like '%${kw.pixel}%'`;
            i++;
        }
        var str=arr.join(" and ")
        var sql=`SELECT *,(select md from HW_phone_pic where phone_id=pid limit 1) as md FROM HW_phone WHERE ${str}`;
        // var sql=`SELECT * FROM HW_phone WHERE battery like '%3400mAh%'`
        //先查询按钮条件查询到商品,再根据数据查询对应pid所对应的的商品的图片
        query(sql,[]).then(result=>{
            output.count=result.length;
            output.pageCount=
            Math.ceil(output.count/output.pageSize);
            sql+=` limit ?,?`;
            return query(sql,[output.pageSize*output.pno,output.pageSize]);
        }).then(result=>{
            output.data=result;
            res.send(output);
        })
    }else{
        //客户没有选择属性,查询去全部数据
    var sql="SELECT *,(select md from HW_phone_pic where phone_id=pid limit 1) as md FROM HW_phone";
        query(sql,[]).then(result=>{
            output.count=result.length;
            output.pageCount=
                Math.ceil(output.count/output.pageSize);
            sql+=` limit ?,?`;
            return query(sql,[output.pageSize*output.pno,output.pageSize]);
        }).then(result=>{
            output.data=result;
            res.send(output);
        })
    }
    
})

router.get("/recommend",(req,res)=>{
    var pno=req.query.pno;
    console.log(pno)
    var output={
        count:0,
        pageSize:3,
        pageCount:0,
        pno:pno||0,
        data:[]
    };
    var sql="SELECT * FROM HW_recommend_product";
    query(sql,[]).then(result=>{
        output.count=result.length;
        output.pageCount=
            Math.ceil(output.count/output.pageSize);
        sql+=` limit ?,?`;
        return query(sql,[output.pageSize*output.pno,output.pageSize]);
    }).then(result=>{
        output.data=result;
        res.send(output);
    })
})
module.exports=router;