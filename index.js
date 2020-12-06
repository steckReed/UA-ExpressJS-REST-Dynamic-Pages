const express = require('express');
const app = express();

app.use(express.json());

const customers = [
  {id: 1, first_name: "John", last_name: "doe", occupation: "student"},
  {id: 2, first_name: "Jill", last_name: "doe", occupation: "staff"},
  {id: 3, first_name: "Bob", last_name: "doe", occupation: "staff"}
]

app.get('/', (req, res) => {
  res.send ('Hello world');
});

app.get('/customers', (req, res) => {
  res.send(customers);
});

app.get('/customers', (req, res) => {
  if(!req.body.first_name || !req.body.last_name || !req.body.occupation){
    res.status(400).send('Full name and occupation is required');
    return;
  }

  const customer = {
    id: customers.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    occupation: req.body.occupation
  }

  customers.push(customer);
  res.send(customer);
});

app.get('/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if(!customer) res.status(404).send('Error - This customer was not found');
  res.send(customer);
});

const PORT = process.env.PORT || 8675;
app.listen(PORT, () => console.log(`Server running at: http://127.0.0.1:${PORT}/`));