module.exports = function (api, SQLrequest) {

    const productsQuery = async (CategoryID, SupplierID) => {
        let query
        if (CategoryID) {
            query = `SELECT * FROM Products WHERE CategoryID='${CategoryID}'`
        } else if  (SupplierID) {
            query = `SELECT * FROM Products WHERE SupplierID='${SupplierID}'`
        } else {
            query = "SELECT * FROM Products"
        }
        const products = await SQLrequest(query)
        for (const product of products) {
            if (!CategoryID) {
                const category = await SQLrequest(`SELECT CategoryID as id, * FROM Categories WHERE CategoryID='${product.categoryID}'`)
                if (!SupplierID) {
                    product.category = category[0]
                    delete product.categoryID
                    delete product.category.categoryID  
                } else {
                    product.categoryName = category[0].categoryName
                    delete product.supplierID
                    delete product.quantityPerUnit
                    delete product.unitPrice
                    delete product.unitsInStock
                    delete product.unitsOnOrder
                    delete product.reorderLevel
                    delete product.discontinued
                }
            } else {
                if (!SupplierID) {
                    delete product.categoryID
                }
            }
            if (!SupplierID) {
                const supplier = await SQLrequest(`SELECT CompanyName, ContactName, ContactTitle, SupplierID as id FROM Suppliers WHERE SupplierID='${product.supplierID}'`)
                if (supplier.length !== 0) { 
                    supplier[0].address = (await SQLrequest(`SELECT City, Country, Phone, PostalCode, Region, Address as Street FROM Suppliers WHERE SupplierID='${product.supplierID}'`))[0]
                    product.supplier = supplier[0]
                    delete product.supplierID
                }

            }
        }
        return products
    }

    api.get('/products', async (req, res) => {
        try {
            
            const products = await productsQuery()
            const query = req.query
            query.currentPage = isNaN(query.currentPage) ? 1 : Number(query.currentPage)
            query.perPage = isNaN(query.perPage) ? products.length : Number(query.perPage) 
            res.status(200).json({
                currentPage: query.currentPage,
                perPage: query.perPage,
                total: products.length,
                items: products.sort((a, b) => {
                    const sort = query.sortOrder === 'des' ? b.id - a.id : a.id - b.id
                    return sort
                }).slice((query.currentPage - 1) * query.perPage, query.currentPage * query.perPage)
            })
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    })

    api.get('/products/search', async (req, res) => {
        try {
            const query = req.query
            const products = await productsQuery()
            const search = products.filter(product => {
                return query.productName ?
                new RegExp(query.productName, 'i').test(product.productName) :
                false || query.categoryName ?
                new RegExp(query.categoryName, 'i').test(product.category.categoryName) :
                false || query.companyName ? 
                new RegExp(query.companyName, 'i').test(product.supplier.companyName) :
                false
            })
            res.status(200).json(search)
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    })

    api.get('/products/:id', async (req, res) => {
        try {
            const products = await productsQuery()
            const id = req.params.id
            const product = products.find(product => product.id === Number(id))
            if (product !== undefined) { 
                res.status(200).json({item: product})
            } else {
                throw new Error (`Product with the id ${id} was not found`)
            }
        } catch (e) {
            res.status(404).json({error: e.message})
        }
    })

    api.post('/products', async (req, res) => {
        try {
            const product = req.body;
            [
                [product.categoryID, 'CategoryID'],
                [product.discontinued, 'Discontinued'],
                [product.productName, 'Product Name'],
                [product.quantityPerUnit, 'Quantity Per Unit'],
                [product.reorderLevel, 'Reoder Level'],
                [product.supplierID, 'SupplierID'],
                [product.unitPrice, 'Unit Price'],
                [product.unitsInStock, 'Units In Stock'],
                [product.unitsOnOrder, 'Units On Order']
            ].forEach(element => {
                if (element[0] === undefined) {
                    throw new Error(`The field '${element[1]}' is missing`)
                }
            });

            const create = await SQLrequest(`
            INSERT INTO Products (ProductID, CategoryID, Discontinued, ProductName, QuantityPerUnit, ReorderLevel, SupplierID, UnitPrice, UnitsInStock, UnitsOnOrder)
            VALUES ((SELECT TOP 1 ProductID FROM Products ORDER BY ProductID + 0 DESC) + 1, ${product.categoryID}, '${product.discontinued}', '${escape(product.productName)}', '${escape(product.quantityPerUnit)}', ${product.reorderLevel}, ${product.supplierID}, ${product.unitPrice}, ${product.unitsInStock}, ${product.unitsOnOrder})
            SELECT TOP 1 * FROM Products ORDER BY ProductID + 0 DESC
            `)
            res.status(200).json(create[0])

        } catch (e) {
            res.status(500).json({error: e.message})
        }

    })

    api.post('/products/:id', async (req, res) => {
        try {
            const id = req.params.id
            const product = req.body
            const update = await SQLrequest(`
            UPDATE Products SET CategoryID='${product.categoryID}', Discontinued='${product.discontinued}', ProductName='${product.productName.replace("'", "´" )}', QuantityPerUnit='${product.quantityPerUnit}', ReorderLevel='${product.reorderLevel}', SupplierID='${product.supplierID}', UnitPrice='${product.unitPrice}', UnitsInStock='${product.unitsInStock}', UnitsOnOrder='${product.unitsOnOrder}' 
            WHERE ProductID='${id}'
            SELECT * FROM Products WHERE ProductID='${id}'
            `)
            if (update.length !== 0) { 
                res.status(200).json(update[0])
            } else {
                throw new Error (`Product with the id ${id} was not found`)
            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }

    })

    api.get('/categories/:id/products', async (req, res) => {
        try {
            const id = req.params.id
            const category = await SQLrequest(`SELECT * FROM Categories WHERE categoryID='${id}'`)
            if (category.length === 0) { 
                throw new Error (`Category with the id ${id} was not found`)
            }
            category[0].id = category[0].categoryID
            delete category[0].categoryID
            category[0].products = await productsQuery(id, null)
            res.status(200).json(category[0])
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    })

    api.get('/suppliers/:id', async (req, res) => {
        try {
            const id = req.params.id
            const supplier = await SQLrequest(`SELECT CompanyName, ContactName, ContactTitle, SupplierID as id FROM Suppliers WHERE SupplierID='${id}'`)
            if (supplier.length === 0) { 
                throw new Error (`Supplier with the id ${id} was not found`)
            }
            supplier[0].address = (await SQLrequest(`SELECT City, Country, Phone, PostalCode, Region, Address as Street FROM Suppliers WHERE SupplierID='${id}'`))[0]
            res.status(200).json(supplier[0])
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    })

    api.get('/suppliers/:id/products', async (req, res) => {
        try {
            const id = req.params.id
            const supplier = await SQLrequest(`SELECT CompanyName, ContactName, ContactTitle, SupplierID as id FROM Suppliers WHERE SupplierID='${id}'`)
            if (supplier.length === 0) { 
                throw new Error (`Supplier with the id ${id} was not found`)
            }
            supplier[0].address = (await SQLrequest(`SELECT City, Country, Phone, PostalCode, Region, Address as Street FROM Suppliers WHERE SupplierID='${id}'`))[0]
            supplier[0].products = await productsQuery(null, id)
            res.status(200).json(supplier[0])
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    })

    api.delete('/suppliers/:id', async (req, res) => {
        try {
            const id = req.params.id
            const supplier = await SQLrequest(`SELECT * FROM Suppliers WHERE SupplierID='${id}'`)
            if (supplier.length !== 0) { 
                await SQLrequest(`DELETE FROM Suppliers WHERE SupplierID='${id}'`)
                res.status(200).json({message: `Supplier with id ${id} successfuly deleted`})
            } else {
                throw new Error (`Supplier with the id ${id} was not found`)
            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    })

    return api
}