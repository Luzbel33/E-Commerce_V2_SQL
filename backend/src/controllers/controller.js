// const path = require('path');
// const { validationResult }  = require('express-validator');
const { getProdsFromDatabase } = require('../services/ProdAccess');
const users = require('../../models').users;
const prods = require('../../models').prods;
const purchase = require('../../models').purchases;
const bcrypt = require('bcrypt');

//** Vistas comentadas porque ya no se usan, solo dejo el backend activo, pero dejo la carpeta `views` por si se quiere ver el trabajo/*/
// const homeView = async (req, res) => {
//     try {
//       const prods = await getProdsFromDatabase();
//       res.render(path.join(__dirname, '../views/Home.ejs'), { prods });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error al cargar los productos');
//     }
// };
  
// const cartView = async (req, res) => {
//     try {
//       const prods = await getProdsFromDatabase();
//       res.render(path.join(__dirname, '../views/Cart.ejs'), { prods: prods.slice(0, 2) });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error al cargar los productos en el carrito');
//     }
// };
  
// const registerView = (req, res) => {
//     res.render(path.join(__dirname, '../views/Register.ejs'));
// };

// const loginView = (req, res) => {
//     res.render(path.join(__dirname, '../views/Login.ejs'));
// };

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

const addProduct = async (req, res, next) => {
  const formData = req.body;

  try {
    // Validar que todos los campos necesarios estén presentes
    if (!formData.title || !formData.description || !formData.alt || !formData.img || !formData.price || !formData.category) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
    }

    // Crear el producto en la base de datos
    await prods.create({
      title: formData.title,
      description: formData.description,
      alt: formData.alt,
      img: formData.img,
      price: formData.price,
      category: formData.category,
    });
    console.log('Se grabó correctamente el producto.');
    return res.status(200).json({ mensaje: 'Producto guardado correctamente.' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({ mensaje: 'Error al crear el producto.' });
  }
};

// Función para editar un producto existente
const editProduct = (req, res, next) => {
  const productId = req.params.id;
  console.log(req.body);
  // const { title, description, alt, img, price, category } = req.body;

  return prods.update(
    {
      title: req.body.title ,
      description: req.body.description ,
      alt: req.body.alt,
      img: req.body.img,
      price: req.body.price,
      category: req.body.category,
    },
    {
      where: { id: productId },
    }
  )
    .then((rowsUpdated) => {
      if (rowsUpdated[0] === 1) {
        res.status(200).json({ success: true, message: 'Producto actualizado correctamente.' });
      } else {
        res.status(404).json({ success: false, message: 'Producto no encontrado.' });
      }
    })
    .catch((error) => {
      res.status(400).json({ success: false, error });
    });
};

// Función para eliminar un producto por su ID
const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await prods.destroy({
      where: { id: productId },
    });

    if (deletedProduct) {
      return res.status(200).json({ success: true, message: 'Producto eliminado correctamente.' });
    } else {
      return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return res.status(500).json({ success: false, mensaje: 'Error al eliminar el producto.' });
  }
};

const savePurchase = async (req, res, next) => {
  const purchaseData = req.body;

  try {
    // Get all existing purchases for the user
    const existingPurchases = await purchase.findAll({
      where: { user: purchaseData.user },
    });
  
    // Check each product and update or create the purchase accordingly
    for (const product of purchaseData.products) {
      const existingPurchase = existingPurchases.find((p) => p.title === product.title);
  
      if (existingPurchase) {
        // If a purchase already exists, update the existing record
        await existingPurchase.update({
          quantity: product.quantity,
          price: product.price,
          total: product.total,
        });
      } else {
        // If a purchase doesn't exist, insert a new record
        await purchase.create({
          user: purchaseData.user,
          title: product.title,
          quantity: product.quantity,
          price: product.price,
          total: product.total,
        });
      }
    }

    console.log('Purchase data saved successfully.');
    return res.status(200).json({ message: 'Purchase data saved successfully.' });
  } catch (error) {
    console.error('Error saving purchase data:', error);
    return res.status(500).json({ message: 'Error saving purchase data.' });
  }
};

  module.exports = {
    // homeView,
    Prods,
    detailProds,
    // cartView,
    // loginView,
    // registerView,
    addUser,
    deleteUser,
    login,
    logout,  
    addProduct,
    editProduct,
    deleteProduct,
    savePurchase
};
  