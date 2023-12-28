const customer = require('../model/customer');
const Customer = require('../model/customer');

exports.getCustomerInfo = (req, res, next) => {

  const customerid = req.body.customerid;
  console.log(customerid);
  console.log("Customer id is "+ customerid);
  console.log(typeof(customerid));
 


  customer.findOne({ customerid: customerid })
    .then(customer => {
      console.log("before customer compare for null");

      if (!customer) {
        const error = new Error('A customer with this customerid could not be found.');
        error.statusCode = 401;

        throw error;
      }

      console.log("after customer compare for null");

      res.status(200).json({ customer: customer });

    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  /* res.status(200).json({
     employeedata: [{ name: 'Bharath S', lastLogin: '04 Feb 2022' }]
   });*/

  /*
  const customerid = "IJ103";
  const name = req.body.name;
  const lastlogin = req.body.lastlogin;
  const balance = req.body.balance;

  const customer = new Customer({
    customerid: customerid,
    name: name,
    lastlogin: lastlogin,
    balance:balance,
    transaction: [
      {
       date : '01 march 2022',
       desc : 'Rent',
       amount : '$1000'
      },
      {
        date : '05 march 2022',
        desc : 'Grocery',
        amount : '$300'
       }
    ]
  });
  customer
    .save()
    .then(result => {
      res.status(201).json({
        message: 'customer details created successfully!',
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

    */
};


