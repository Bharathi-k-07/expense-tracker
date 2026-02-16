
const express = require('express');

const Router = require('express');


const { createExpense, getExpense } = require("../controllers/expenseController");

const router = Router();

router.post('/', createExpense);
router.get('/', getExpense);

module.exports = router;

