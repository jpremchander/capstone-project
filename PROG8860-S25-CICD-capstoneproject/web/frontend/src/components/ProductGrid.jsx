import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { useCart } from './CartContext';

const filters = [
  { id: 'all', name: 'All Robots' },
  { id: 'drones', name: 'Drones' },
  { id: 'rovers', name: 'Rovers' },
  { id: 'arms', name: 'Robotic Arms' },
];

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  // Sample products data
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
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      activeFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.name}
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

      {/* Quick View Modal */}
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