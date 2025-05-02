const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Corrected route for adding expense
router.post("/add", addExpense);

// Corrected route for getting all expenses
router.get("/get", protect, getAllExpense);

// Corrected route for deleting expense by ID
router.delete("/:id", protect, deleteExpense);

// Corrected route for downloading the Excel file
router.get("/downloadExcel", protect, downloadExpenseExcel);

module.exports = router;
