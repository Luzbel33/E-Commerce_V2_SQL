import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  // Otros campos del estado global que desees
  setUser: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
}));

export const useCartStore = create((set) => ({
  products: localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : [],

  saveCartToLocalStorage: (products) => {
    localStorage.setItem('cartProducts', JSON.stringify(products));
  },

  initCart: () => {
    const userIdentification = useUserStore.getState().user.email; // Retrieve the user email from the useUserStore state
    const cart = JSON.parse(localStorage.getItem(`cart_${userIdentification}`));
    if (cart) {
      set({ products: cart });
    } else {
      set({ products: [] });
    }
  },

  clearCart: () => {
    const userIdentification = useUserStore.getState().user.email; // Retrieve the user email from the useUserStore state
    localStorage.removeItem(`cart_${userIdentification}`);
    set({ products: [] });
  },

  addToCart: (product) => {
    set((state) => {
      const userIdentification = useUserStore.getState().user.email; // Retrieve the user email from the useUserStore state
      const updatedCartData = state.products;
      let foundProduct = updatedCartData.find((item) => item.product === product.title && item.identification === userIdentification);
      if (foundProduct) {
        foundProduct.quantity += 1;
      } else {
        foundProduct = {
          product: product.title,
          quantity: 1,
          price: product.price,
          identification: userIdentification,
        };
        updatedCartData.push(foundProduct);
      }

      localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedCartData));
      return { products: updatedCartData };
    });
  },

  removeFromCart: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().user.email; // Retrieve the user email from the useUserStore state
      const updatedProducts = state.products.filter((_, i) => i !== index);
      localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },

  increaseQuantity: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().user.email; // Retrieve the user email from the useUserStore state
      const updatedProducts = [...state.products];
      updatedProducts[index].quantity += 1;
      localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },

  decreaseQuantity: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().user.email; // Retrieve the user email from the useUserStore state
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
