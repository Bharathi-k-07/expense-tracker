const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Expense = require("./models/Expense");
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/expenses',expenseRoutes);
app.use('/api/users', userRoutes);


const testExpense = async () => {
  const expense = new Expense({
    userId: new mongoose.Types.ObjectId(),
    amount: 200,
    type: "expense",
    category: "Food",
    description: "Test entry",
    date: new Date()
  });

  const savedExpense = await expense.save();
console.log("Saved expense ID:", savedExpense);

};

// testExpense();


app.get('/', (req, res)=>
{
    res.send("Expense Tracker API is Running");
    
});

app.listen(PORT, ()=> {
    console.log(`Server is Running in ${PORT}`);
});


