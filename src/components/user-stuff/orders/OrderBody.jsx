import { Package, DollarSign, Hash, ShoppingBag } from 'lucide-react';

export default function OrderBody({ item }) {
    return (
        <div className="group bg-white rounded-lg border border-gray-200 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-orange-300 hover:-translate-y-1">
            {/* Product ID */}
            <div className="flex items-center space-x-2 mb-3">
                <Hash size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500">Product ID:</span>
                <span className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {item.itemId.slice(-12)}
                </span>
            </div>

            {/* Product Name */}
            <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag size={20} className="text-orange-500 flex-shrink-0" />
                <h2 className="text-xl font-bold text-black group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {item.name}
                </h2>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-4"></div>

            {/* Product Details */}
            <div className="space-y-3">
                {/* Price When Bought */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                        <DollarSign size={16} className="text-gray-500" />
                        <span className="text-sm font-medium">Price when bought:</span>
                    </div>
                    <span className="text-lg font-bold text-black">
                        ${item.priceWhenBought}
                    </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                        <Package size={16} className="text-gray-500" />
                        <span className="text-sm font-medium">Quantity:</span>
                    </div>
                    <span className="text-lg font-bold text-black">
                        {item.quantity}
                    </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-3"></div>

                {/* Total */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Item Total:</span>
                        <div className="text-right">
                            <div className="text-xs text-gray-600 mb-1">
                                ${item.priceWhenBought} × {item.quantity}
                            </div>
                            <div className="text-2xl font-bold text-green-600">
                                ${(item.quantity * item.priceWhenBought).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Accent Line */}
            <div className="mt-4 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    );
}