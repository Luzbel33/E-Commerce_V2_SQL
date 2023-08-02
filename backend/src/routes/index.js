const usersController = require('../controllers/controller');
const { check } = require('express-validator')

module.exports = function(app) {

    app.get('/', usersController.homeView);
    app.get('/detailProduct', usersController.Prods);
    app.get('/detailProduct/:id', usersController.detailProds);
    app.get('/cart', usersController.cartView);
    app.get('/login', usersController.loginView);
    app.get('/logout', usersController.logout);
    app.get('/register', usersController.registerView);
    app.post('/addProduct', usersController.addProduct)
    app.post('/editProduct/:id', usersController.editProduct);
    app.post('/deleteProduct/:id', usersController.deleteProduct);
    app.post('/addUser',
    [
    check ('name')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

    check ('username')
        .isLength({ min: 3 }).withMessage('El usuario debe tener al menos 3 caracteres'),

    check ('email')
        .isEmail().withMessage('Correo invalido')

    ],
     usersController.addUser)

    app.post('/login1', 
    [
        check ('email')
            .isEmail().withMessage('Correo invalido'),
    ],usersController.login)

    app.use((req, res) => {
        res.status(404).send("ERROR: Pagina no encontrada");
        });
};