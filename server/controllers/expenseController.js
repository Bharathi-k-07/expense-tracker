const Expense = require('../models/Expense');

const createExpense = async (req, res) => {
    try {

        console.log("Body:", req.body);
        const {userId, amount, type, category, description, date} = req.body;

        const expense = new Expense(
            {
                userId,
                amount,
                type,
                category,
                description,
                date
            }
        );

        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);

    }
    catch (error)
    {
        res.status(500).json({message: error.message});
    }
};


const getExpense = async (req, res)=> 
{
    try
    {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    }
    catch(error)
    {
        res.status(500).json({message : error.message});

    }
};

module.exports = {createExpense, getExpense};