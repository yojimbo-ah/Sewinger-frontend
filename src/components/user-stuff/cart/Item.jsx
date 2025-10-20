import { X, Edit3, Save, DollarSign, Package, Tag } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { deleteProductFromCartMutation, queryClient, updateItemCartQuantity } from "../../../utils/http"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useContext, useState } from "react"

export default function Item({ item }) {
    const { token } = useContext(AuthContext);
    const [edit, setEdit] = useState(false);
    const [editValue, setEditValue] = useState(Number(item.quantity));
    const [error, setError] = useState(false);

    const { mutate: deleteMutate, isPending: isPendingDelete } = useMutation({
        mutationFn: () => {
            return deleteProductFromCartMutation({ jwtToken: token, productId: item.productId })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = useMutation({
        mutationFn: () => {
            console.log('am here')
            return updateItemCartQuantity({ jwtToken: token, quantity: editValue, productId: item.productId })
        },
        onSuccess: () => {
            setEdit(false);
            queryClient.invalidateQueries(['cart'])
        }
    })

    function handleUpdateItem() {
        if (item.quantity === editValue) {
            setEdit(false);
        } else {
            updateMutate();
        }
    }

    function handleItemRemoveFromCart() {
        deleteMutate();
    }

    function handleQuantityChange(event) {
        const value = Number(event.target.value);
        setEditValue(value);
        if (!Number.isInteger(value) || value > 20 || value < 1) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const isLoading = isPendingDelete || isPendingUpdate;

    return (
        <div className="group relative bg-white p-6 transition-all duration-300 hover:bg-gray-50">
            {/* Remove Button */}
            <button
                disabled={isLoading}
                onClick={handleItemRemoveFromCart}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 ${
                    isLoading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:scale-110 active:scale-95 border border-red-200'
                }`}
                title="Remove from cart"
            >
                {isPendingDelete ? (
                    <div className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <X size={18} />
                )}
            </button>

            <div className="flex gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                        <img
                            className="w-full h-full object-cover"
                            src={item.images[0]}
                            alt={item.name}
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                    {/* Product Name */}
                    <div>
                        <h2 className="text-xl font-bold text-black group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                            {item.name}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Product ID: #{item.productId.slice(-8)}
                        </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="font-semibold text-gray-700">Price:</span>
                        <span className="font-bold text-lg text-green-600">${item.price}</span>
                    </div>

                    {/* Categories */}
                    {item.categories && item.categories.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <Tag size={16} className="text-gray-500" />
                            <div className="flex flex-wrap gap-1">
                                {item.categories.slice(0, 3).map((category, index) => (
                                    <span 
                                        key={index}
                                        className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Section */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Package size={16} className="text-gray-500" />
                            <span className="font-semibold text-gray-700">Quantity:</span>
                        </div>

                        {!edit ? (
                            <div className="flex items-center space-x-3">
                                <span className="font-bold text-lg text-black">{item.quantity}</span>
                                <button
                                    disabled={isLoading}
                                    onClick={() => setEdit(true)}
                                    className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isLoading
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105 active:scale-95'
                                    }`}
                                >
                                    <Edit3 size={14} />
                                    <span>Edit</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <input
                                    onChange={handleQuantityChange}
                                    value={editValue}
                                    className={`w-20 px-3 py-2 border-2 rounded-lg text-center font-semibold transition-colors duration-200 ${
                                        error
                                            ? 'border-red-300 bg-red-50 text-red-700'
                                            : 'border-gray-300 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                                    }`}
                                    type='number'
                                    min="1"
                                    max="20"
                                />
                                <button
                                    disabled={isLoading || error}
                                    onClick={handleUpdateItem}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isLoading || error
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95 shadow-md'
                                    }`}
                                >
                                    {isPendingUpdate ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save size={14} />
                                            <span>Save</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                            Quantity must be between 1 and 20
                        </div>
                    )}

                    {/* Total Calculation */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-700">Item Total:</span>
                            <div className="text-right">
                                <div className="text-sm text-gray-600">
                                    ${item.price} × {item.quantity}
                                </div>
                                <div className="text-xl font-bold text-green-600">
                                    ${(item.quantity * item.price).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}