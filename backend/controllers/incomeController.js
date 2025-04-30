const User = require('../models/User');
const Income = require('../models/Income');

//ADD Income Source
exports.addIncome=async(req,res)=>{
    const userId=req.user.id;
    try{
        const { icon, source, amount, date}=req.body;
        if(!source ||!amount ||!date){
            res.status(400)
            .json({
                message:"All Fields are Required"
            });
        };
        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    }   
    catch(err){
        res.status(500)
        .json({
            message:"Server Error"
        });

    };
}


// Get All Type of Incomes
exports.getAllIncome=async(req,res)=>{
    
}


// Delete the income
exports.deleteIncome=async(req,res)=>{}


// Download the excel of the income 
exports.downloadIncomeExcel=async(req,res)=>{}