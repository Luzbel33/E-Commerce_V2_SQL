import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  // Otros campos del estado global que desees
  setUser: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
  registerUser: (userData) => {
    // Utilizar el email como identificador
    const userEmail = userData.email;
    const userWithEmail = { ...userData, id: userEmail };
    set({ user: userWithEmail });
    localStorage.setItem('user', JSON.stringify(userWithEmail));
  }
}));

export const useCartStore = create((set) => ({
  products: localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : [],

  saveCartToLocalStorage: (products) => {
    localStorage.setItem('cartProducts', JSON.stringify(products));
  },

  initCart: () => {
    const user = useUserStore.getState().user;
    if (user) {
      const userEmail = user.email;
      const cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`));
      if (cart) {
        set({ products: cart });
      } else {
        // Si el carrito no existe, lo inicializamos como un array vacío
        set({ products: [] });
      }
    }
  },

  clearCart: () => {
    const userIdentification = useUserStore.getState().userIdentification; // Obtenemos la identificación del usuario desde el estado global de useUserStore
    localStorage.removeItem(`cart_${userIdentification}`);
    set({ products: [] });
  },

  addToCart: (product) => {
    set((state) => {
      const user = useUserStore.getState().user; // Obtenemos el usuario desde el estado global useUserStore
      const userEmail = user ? user.email : null; // Obtenemos el email del usuario si está autenticado
      const updatedCartData = state.products;
      let foundProduct = updatedCartData.find((item) => item.product === product.title && item.identification === userEmail);
      if (foundProduct) {
        foundProduct.quantity += 1;
      } else {
        foundProduct = {
          title: product.title,
          description: product.description,
          img: product.img, // Agregamos la información de la imagen
          quantity: 1,
          price: product.price,
          identification: userEmail, // Usamos userEmail como identificador
        };
        updatedCartData.push(foundProduct);
      }

      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCartData));
      return { products: updatedCartData };
    });
  },


  removeFromCart: (index) => {
    set((state) => {
      const user = useUserStore.getState().user; // Obtenemos el usuario desde el estado global useUserStore
      const userEmail = user ? user.email : null; // Obtenemos el email del usuario si está autenticado
      const updatedProducts = state.products.filter((_, i) => i !== index);
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },
  increaseQuantity: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().userIdentification; // Obtenemos la identificación del usuario desde el estado global de useUserStore
      const updatedProducts = [...state.products];
      updatedProducts[index].quantity += 1;
      localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },

  decreaseQuantity: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().userIdentification; // Obtenemos la identificación del usuario desde el estado global de useUserStore
      const updatedProducts = [...state.products];
      if (updatedProducts[index].quantity > 1) {
        updatedProducts[index].quantity -= 1;
        localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      }
      return { products: updatedProducts };
    });
  },

  savePurchase: (userData, products, total) => {
    const purchaseData = {
      user: userData.email, // Guardamos el email del usuario
      products: products.map((product) => ({
        title: product.title,
        quantity: product.quantity,
        price: product.price,
      })),
      total,
    };
    // Guardamos la información de la compra en el local storage
    const userPurchasesKey = `purchases_${userData.email}`; // Creamos una clave única para cada usuario basada en su email
    const purchases = localStorage.getItem(userPurchasesKey) ? JSON.parse(localStorage.getItem(userPurchasesKey)) : [];
    purchases.push(purchaseData);
    localStorage.setItem(userPurchasesKey, JSON.stringify(purchases));

    // Limpiamos el carrito después de guardar la compra
    useCartStore.setState({ products: [] });
  },
}));

