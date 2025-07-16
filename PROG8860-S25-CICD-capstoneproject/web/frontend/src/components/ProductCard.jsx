import { motion } from 'framer-motion';
import { FaCartPlus, FaEye } from 'react-icons/fa';

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
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
};

export default ProductCard;