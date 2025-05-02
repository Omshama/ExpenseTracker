const User = require('../models/User');
const Expense = require('../models/Expense');
const xlsx=require('xlsx');
//ADD Expense Source


exports.addExpense = async (req, res) => {
    console.log("addExpense function is called");  // <-- This should log if the function is triggered
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        // Validate required fields
        if (!category || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Convert amount to a number and date to a Date object
        const parsedAmount = parseFloat(amount);
        const parsedDate = new Date(date);

        if (isNaN(parsedAmount)) {
            return res.status(400).json({
                message: "Amount should be a valid number"
            });
        }

        // Create new expense object
        const newExpense = new Expense({
            userId,
            category,
            icon,
            amount: parsedAmount, // Use parsed amount
            date: parsedDate, // Use parsed date
        });

        // Save the new expense
        await newExpense.save();
        console.log("Expense added successfully:", newExpense);  // <-- This should log if expense is saved
        res.status(200).json(newExpense);
    } catch (err) {
        console.error("Error while adding expense:", err);  // <-- This should log errors if any
        res.status(500).json({
            message: "Server Error"
        });
    }
};



// Get All Type of Incomes
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    // console.log("User ID:", userId);
  
    try {
      const expense = await Expense.find({ userId }).sort({ date: -1 });
    //   console.log("Fetched income:", income);
      res.json(expense);
    } catch (err) {
    //   console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };



// Delete the income
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const expense = await Expense.findById(req.params.id);
  
      if (!expense) {
        return res.status(404).json({ message: "Income not found" });
      }
  
      if (expense.userId.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      await Expense.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Income Deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  


// Download the excel of the income 

// Download the excel of the expense 
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
      const expenses = await Expense.find({ userId }).sort({ date: -1 });
  
      const data = expenses.map((item) => ({
        Category: item.category,
        Amount: item.amount,
        Date: item.date,
      }));
  
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, "Expenses");
      xlsx.writeFile(wb, "expense_details.xlsx");
  
      res.download("expense_details.xlsx");
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
  
