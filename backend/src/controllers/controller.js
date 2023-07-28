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
        console.log(prod);
        res.send(prod);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el detalle del producto');
    }
};

const addUser = (req, res, next) => {
  const pass = bcrypt.hashSync(req.body.password, 10);

  return  users.findOne({where: {email: req.body.email,}
                        })
  .then( user => {
                  if( user ) {
                    return res.status(409).json({Mensaje:'ERROR, ya existe en la base de datos.'});
                  } else {
                          return users.create({ name: req.body.name,
                                                username: req.body.username,
                                                email: req.body.email,
                                                password: pass,
                                                phone: req.body.phone,
                                                birthdate: req.body.birthdate,
                                                country: req.body.country
                                              }
                                            ).then( result=> {
                                                              console.log("Se grabo correctame el usuario")
                                                              return res.status(200).json({Mensaje:'Se grabo correctamente el usuario.'});
                                                              }
                                                  )
                                             .catch( error => {return res.status(404).json({Mensaje:'Error al grabar.' + error})
                                                              }
                                                    )
                          }
                        }
  )
        .catch( error => {return res.status(404).json({Mensaje:'Error al grabar.' + error})
                         }
              )
}

// const addUser = (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     const pass = bcrypt.hashSync(req.body.password, 10);
//     users.create({
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//         password: pass,
//         phone: req.body.phone,
//         birthdate: req.body.birthdate,
//         country: req.body.country
//     })
//     .then(user => {
//         if (user) {
//             res.redirect('/');
//         } else {
//             const err = {}
//             err.status = 404
//             err.messages = [{ msg: "No se pudo insertar el usuario" }]
//             res.status(404).json(err);
//         }
//     })
//     .catch(error => {
//         const err = {}
//         err.status = 404
//         err.messages = [{ msg: error }]
//         res.status(404).json(err);
//     })
// }

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

const login = (req, res,next) => {
  return  users.findOne({
                          where: {
                                  email: req.body.email,
                                  }
                        })
  .then( user => {
              if( user )
              {
                if(user && bcrypt.compareSync(req.body.password, user.password))
                {
                 const userJson =JSON.stringify(user);
                 console.log(userJson)
                 res.send(userJson)
                }
                else
                {
                 return res.status(401).json({Mensaje:'ERROR, el usuario o la contraseña no es correcta'})
                }
              }
              else
              {
                console.log("ERROR, usuario no encontrado")
                return res.status(404).json({Mensaje:'ERROR, el usuario o la contraseña no es correcta'})
              }
              }
)
.catch( error => {
    return res.status(404).json({Mensaje:'ERROR ' + error })
  }
)
}
  
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
  