var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

require("dotenv").config();

var keys = require("./keys.js");

console.log(keys.user, keys.password)

// creat fuction 
var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:keys.user,
	password:keys.password,
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});
// put a selection so when a customer select there is a display and table
var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,15]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		purchasePrompt();
	});
}

function purchasePrompt(){
    //loop through each inquirer promt
    // since we have id for each order item we set it into a variable
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter Item ID you like to purhcase.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many items do you wish to purchase?",
		filter:Number
	},

 ]).then(function(answers){
 	var quantityNeeded = answers.Quantity;
 	var IDrequested = answers.ID;
 	purchaseOrder(IDrequested, quantityNeeded);
 });
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amtNeeded <= res[0].stock_quantity){
		
			var totalCost = res[0].price * amtNeeded;
			console.log("Good news your order is in stock!");
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " Thank you!");

			let query = "UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + " WHERE item_id = " + ID;
			connection.query(query);
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + " to complete your order.");
		};
		displayProducts();
	});
};

displayProducts(); 