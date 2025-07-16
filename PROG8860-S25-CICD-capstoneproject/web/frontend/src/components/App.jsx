import { useEffect, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRocket, FiBookOpen, FiX, FiShoppingCart, FiUser, FiMoon, FiSun, FiFilter, FiSearch } from 'react-icons/fi';
import { FaCartPlus, FaEye } from 'react-icons/fa';

// 1. Create Cart Context
const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

// 2. Create Cart Drawer Component
function CartDrawer() {
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

// 3. Update Navbar Component
function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-2 shadow-sm' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            🤖
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NorthernAI
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {['Home', 'Products', 'About', 'Lab'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FiUser size={20} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {['Home', 'Products', 'About', 'Lab'].map((item) => (
              <a 
                key={item}
                href="#"
                className="py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex gap-4 pt-2">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2"
              >
                {darkMode ? <FiSun /> : <FiMoon />} Theme
              </button>
              <button className="flex items-center gap-2">
                <FiUser /> Account
              </button>
              <button 
                onClick={() => {
                  setIsCartOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2"
              >
                <FiShoppingCart /> Cart ({cartCount})
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// 4. Enhanced Product Components
function ProductCard({ product, onQuickView, onAddToCart }) {
  return (
    <motion.div 
      className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-60 overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button 
            onClick={onQuickView}
            className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaEye /> Quick View
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            onClick={onAddToCart}
          >
            <FaCartPlus size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Autonomous Delivery Drone', price: 2499, category: 'drones', image: '/images/drone.png' },
    { id: 2, name: 'AI-Powered Mars Rover', price: 3499, category: 'rovers', image: '/images/rover.png' },
    { id: 3, name: 'Industrial Robotic Arm', price: 5999, category: 'arms', image: '/images/arm.png' },
    { id: 4, name: 'Surveillance Drone', price: 1899, category: 'drones', image: '/images/drone2.png' },
    { id: 5, name: 'Lunar Exploration Rover', price: 4299, category: 'rovers', image: '/images/rover2.png' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesFilter = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cutting-Edge Robotics
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search robots..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'drones', 'rovers', 'arms'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={() => setQuickViewProduct(product)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products match your search</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setQuickViewProduct(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold">{quickViewProduct.name}</h3>
                    <button 
                      onClick={() => setQuickViewProduct(null)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <img 
                        src={quickViewProduct.image} 
                        alt={quickViewProduct.name}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-2">Description</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Advanced {quickViewProduct.name.toLowerCase()} with NorthernAI technology. 
                          Perfect for industrial and research applications.
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-2">Specifications</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-gray-500">Category:</span>
                            <span>{quickViewProduct.category}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">Battery Life:</span>
                            <span>8-12 hours</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">AI Version:</span>
                            <span>NorthernAI v3.2</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">${quickViewProduct.price}</span>
                        <button 
                          onClick={() => {
                            addToCart(quickViewProduct);
                            setQuickViewProduct(null);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// 5. Main App Component
export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  return (
    <CartProvider>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <RobotCursor />
        <Hero />
        <ProductGrid />
        
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  🤖
                </div>
                <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  RoboShop
                </h1>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Experience the future of robotics with our NorthernAI-powered interface. 
                  The demo content below shows seamless integration with your existing components.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FiRocket className="inline" />
                    Get Started
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FiBookOpen className="inline" />
                    Documentation
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CartDrawer />
      </div>
    </CartProvider>
  );
}