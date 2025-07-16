import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart } from 'react-icons/fi';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen,
    cartCount 
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FiShoppingCart /> Cart ({cartCount})
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map(item => (
                      <li key={item.id} className="py-4">
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 border rounded"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 border rounded"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}