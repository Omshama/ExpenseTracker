const User = require('../models/User');
const Income = require('../models/Income');
const xlsx=require('xlsx');
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
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    // console.log("User ID:", userId);
  
    try {
      const income = await Income.find({ userId }).sort({ date: -1 });
    //   console.log("Fetched income:", income);
      res.json(income);
    } catch (err) {
    //   console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };



// Delete the income
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const income = await Income.findById(req.params.id);
  
      if (!income) {
        return res.status(404).json({ message: "Income not found" });
      }
  
      if (income.userId.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      await Income.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Income Deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  


// Download the excel of the income 

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");

    res.download("income_details.xlsx");
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
