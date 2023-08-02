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

  initCart: (userId) => {
    // Verifica si el carrito del usuario existe en el localStorage
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`));
    if (cart) {
      set({ products: cart });
    } else {
      // Si el carrito no existe, lo inicializamos como un array vacío
      set({ products: [] });
    }
  },

  clearCart: (userId) => {
    localStorage.removeItem(`cart_${userId}`);
    set({ products: [] });
  },

  addToCart: (product) => {
    set((state) => {
      const updatedProducts = [
        ...state.products,
        {
          ...product,
          quantity: 1,
        },
      ];
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },

  removeFromCart: (index) => {
    set((state) => {
      const updatedProducts = state.products.filter((_, i) => i !== index);
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },

  increaseQuantity: (index) => {
    set((state) => {
      const updatedProducts = [...state.products];
      updatedProducts[index].quantity += 1;
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },

  decreaseQuantity: (index) => {
    set((state) => {
      const updatedProducts = [...state.products];
      if (updatedProducts[index].quantity > 1) {
        updatedProducts[index].quantity -= 1;
        localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      }
      return { products: updatedProducts };
    });
  },
}));
