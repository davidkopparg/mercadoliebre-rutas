const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {

		res.render("products",{products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let codigo=req.params.id;
		let resultado=products.find(busca=>busca.id==codigo);
		let precioDescuento=0;
		
		if (resultado.discount!=0){
		precioDescuento=resultado.price-resultado.price*resultado.discount/100;
		}else{
		precioDescuento=resultado.price;	
		}
		
		res.render("detail",{resultado,precioDescuento});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.send(req.body);
	
	
	},

	// Update - Form to edit
	edit: (req, res) => {
		let codigo=req.params.id;
		let resultado=products.find(busca=>busca.id==codigo);

		res.render("product-edit-form",{resultado});
	},
	// Update - Method to update
	update: (req, res) => {
		

		res.send("producto modificado!!!");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.send("deleteadooooo!!!!");
	}
};

module.exports = controller;