/**
 * Application Layer DI Container
 * Clean Architecture - Application Layer
 */
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  AddProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  ResetProductsUseCase
} from './usecases/product/ProductUseCases.js';

import {
  GetCurrentUserUseCase,
  LoginUseCase,
  SignupUseCase,
  LogoutUseCase
} from './usecases/auth/AuthUseCases.js';

import {
  GetCartUseCase,
  AddToCartUseCase,
  UpdateCartQtyUseCase,
  RemoveCartItemUseCase,
  ClearCartUseCase,
  GetCartSummaryUseCase
} from './usecases/cart/CartUseCases.js';

import {
  GetOrdersUseCase,
  CreateOrderUseCase,
  UpdateOrderStatusUseCase,
  LookupGuestOrderUseCase
} from './usecases/order/OrderUseCases.js';

import {
  GetWishlistUseCase,
  ToggleWishUseCase,
  CheckWishUseCase
} from './usecases/wish/WishUseCases.js';

import {
  GetRecentUseCase,
  AddRecentUseCase,
  RemoveRecentUseCase,
  ClearRecentUseCase
} from './usecases/recent/RecentUseCases.js';

// Pre-instantiated container for convenient direct usage
export const useCases = {
  // Product
  getProducts: new GetProductsUseCase(),
  getProductById: new GetProductByIdUseCase(),
  addProduct: new AddProductUseCase(),
  updateProduct: new UpdateProductUseCase(),
  deleteProduct: new DeleteProductUseCase(),
  resetProducts: new ResetProductsUseCase(),

  // Auth
  getCurrentUser: new GetCurrentUserUseCase(),
  login: new LoginUseCase(),
  signup: new SignupUseCase(),
  logout: new LogoutUseCase(),

  // Cart
  getCart: new GetCartUseCase(),
  addToCart: new AddToCartUseCase(),
  updateCartQty: new UpdateCartQtyUseCase(),
  removeCartItem: new RemoveCartItemUseCase(),
  clearCart: new ClearCartUseCase(),
  getCartSummary: new GetCartSummaryUseCase(),

  // Order
  getOrders: new GetOrdersUseCase(),
  createOrder: new CreateOrderUseCase(),
  updateOrderStatus: new UpdateOrderStatusUseCase(),
  lookupGuestOrder: new LookupGuestOrderUseCase(),

  // Wish
  getWishlist: new GetWishlistUseCase(),
  toggleWish: new ToggleWishUseCase(),
  checkWish: new CheckWishUseCase(),

  // Recent
  getRecent: new GetRecentUseCase(),
  addRecent: new AddRecentUseCase(),
  removeRecent: new RemoveRecentUseCase(),
  clearRecent: new ClearRecentUseCase()
};

export {
  GetProductsUseCase,
  GetProductByIdUseCase,
  AddProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  ResetProductsUseCase,
  GetCurrentUserUseCase,
  LoginUseCase,
  SignupUseCase,
  LogoutUseCase,
  GetCartUseCase,
  AddToCartUseCase,
  UpdateCartQtyUseCase,
  RemoveCartItemUseCase,
  ClearCartUseCase,
  GetCartSummaryUseCase,
  GetOrdersUseCase,
  CreateOrderUseCase,
  UpdateOrderStatusUseCase,
  LookupGuestOrderUseCase,
  GetWishlistUseCase,
  ToggleWishUseCase,
  CheckWishUseCase,
  GetRecentUseCase,
  AddRecentUseCase,
  RemoveRecentUseCase,
  ClearRecentUseCase
};
