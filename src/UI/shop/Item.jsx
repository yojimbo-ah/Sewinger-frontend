import { NavLink } from "react-router-dom";
import { Eye, ShoppingCart, Tag } from "lucide-react";

export default function Item({ data }) {
    const isOutOfStock = data.availbleItems <= 0;
    
    return (
        <div className="group w-full shadow-lg border border-gray-200 sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)] 2xl:w-[calc(16.666%-1rem)] bg-white rounded-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out">
            <div className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                    <img 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={data.images[0]} 
                        alt={data.name}
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <NavLink 
                                to={`/product/details/${data._id}`}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
                            >
                                <Eye size={16} />
                                <span>Quick View</span>
                            </NavLink>
                        </div>
                    </div>

                    {/* Stock Badge */}
                    {isOutOfStock && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                            Out of Stock
                        </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md">
                        <span className="text-sm font-bold">${data.price}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-4 bg-white">
                    {/* Product Name */}
                    <h2 className="text-[clamp(1rem,2vw,1.25rem)] font-semibold leading-tight text-black mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                        {data.name}
                    </h2>

                    {/* Categories */}
                    {data.categories && data.categories.length > 0 && (
                        <div className="flex items-center space-x-1 mb-2">
                            <Tag size={12} className="text-gray-400" />
                            <div className="flex flex-wrap gap-1">
                                {data.categories.slice(0, 2).map((category, index) => (
                                    <span 
                                        key={index}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                    >
                                        {category}
                                    </span>
                                ))}
                                {data.categories.length > 2 && (
                                    <span className="text-xs text-gray-400">+{data.categories.length - 2}</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3 flex-1">
                        {data.description}
                    </p>

                    {/* Stock Info */}
                    <div className="mb-3">
                        <p className={`text-xs font-medium ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                            {isOutOfStock ? 'Out of Stock' : `${data.availbleItems} available`}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                        <NavLink 
                            to={`/product/details/${data._id}`}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                        >
                            <Eye size={14} />
                            <span>Details</span>
                        </NavLink>
                        
                        <button
                            disabled={isOutOfStock}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                                isOutOfStock 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105 active:scale-95'
                            }`}
                        >
                            <ShoppingCart size={14} />
                            <span>{isOutOfStock ? 'Unavailable' : 'Add to Cart'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Border Animation */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    );
}