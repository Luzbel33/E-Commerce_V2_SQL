const path = require('path');
const { getProdsFromDatabase } = require('../services/ProdAccess');
const users = require('../../models').users;
const { validationResult }  = require('express-validator');
const bcrypt = require('bcrypt');

const homeView = async (req, res) => {
    try {
      const prods = await getProdsFromDatabase();
      res.render(path.join(__dirname, '../views/Home.ejs'), { prods });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar los productos');
    }
};
  
const cartView = async (req, res) => {
    try {
      const prods = await getProdsFromDatabase();
      res.render(path.join(__dirname, '../views/Cart.ejs'), { prods: prods.slice(0, 2) });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar los productos en el carrito');
    }
};
  
const Prods = async (req, res) => {
    try {
      const prods = await getProdsFromDatabase();
      res.send(prods);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar los productos');
    }
};



const detailProds = async (req, res) => {
    try {
        const prods = await getProdsFromDatabase();
        const prod = prods.find(prod => prod.id == req.params.id);
        res.send(prod);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el detalle del producto');
    }
};


const addUser = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const pass = bcrypt.hashSync(req.body.password, 10);
    users.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: pass,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        country: req.body.country
    })
    .then(user => {
        if (user) {
            res.redirect('/');
        } else {
            const err = {}
            err.status = 404
            err.messages = [{ msg: "No se pudo insertar el usuario" }]
            res.status(404).json(err);
        }
    })
    .catch(error => {
        const err = {}
        err.status = 404
        err.messages = [{ msg: error }]
        res.status(404).json(err);
    })
}


const deleteUser = (req, res, next) => {
    console.log(req.params);
      return users.destroy({where : { id: parseInt(req.params.id) }})
        .then(rowsDeleted => {
          if(rowsDeleted > 0) {
            console.log('Usuario eliminado exitosamente');
            res.status(200).json({ id: req.params.id })
          } else {
            res.status(400).json({ msg: "Usuario no encontrado" })
          }
        })
        .catch( error => {
          console.log('Mensaje de error', error);
          const err = {}
          err.status = 404
          err.messages = [ { msg: error } ]
          return next(err);
        })
}

const registerView = (req, res) => {
    res.render(path.join(__dirname, '../views/Register.ejs'));
};

const loginView = (req, res) => {
    res.render(path.join(__dirname, '../views/Login.ejs'));
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        
        const { email, password } = req.body;
        const user = await users.findOne({ where: { email } });
  
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.email = email;
        res.redirect('/');
      } else {
        res.send('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al iniciar sesión');
    }
};
  
const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('nuevo');
    res.redirect('/');
};
  
  module.exports = {
    homeView,
    Prods,
    detailProds,
    cartView,
    loginView,
    registerView,
    addUser,
    deleteUser,
    login,
    logout
};
  