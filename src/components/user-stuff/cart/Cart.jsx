import { useMutation, useQuery } from "@tanstack/react-query"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useContext, useState } from "react"
import { getCartQuery, deleteCartMutation, createOrderMutation, queryClient } from "../../../utils/http";
import { Trash, PackagePlus, X, ShoppingCart, DollarSign } from "lucide-react";

import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu";
import Item from "./Item";

export default function Cart() {
    const { token } = useContext(AuthContext);
    const [cartEmpty, setCartEmpty] = useState(false);

    const { data } = useQuery({
        queryKey: ['cart'],
        queryFn: () => {
            return getCartQuery({ jwtToken: token })
        }
    })

    const { mutate: deleteMutate, isPending: isPendingDelete } = useMutation({
        mutationFn: () => {
            return deleteCartMutation({ jwtToken: token })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    })

    function handleDeleteCart() {
        deleteMutate();
    }

    const { mutate: createMutate, isPending: isPendingCreate } = useMutation({
        mutationFn: () => {
            return createOrderMutation({ jwtToken: token });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    function handleCreateOrder() {
        createMutate();
    }

    console.log(data) ;
    const isLoading = isPendingCreate || isPendingDelete;

    if (data && data.cart.items.length === 0) {
        return (
            <EmptyMenu icon={<ShoppingCart size={64} className="mx-auto text-gray-400" />} 
            header="Your Cart is Empty" paragraph="Add some amazing sewing patterns to get started!" />
        );
    }

    return (
        <div className="flex justify-center w-full p-6">
            {data && (
                <div className="w-full max-w-4xl">
                    {/* Enhanced Cart Header */}
                    <div className="bg-white rounded-t-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-50 to-white p-6">
                            <div className="flex items-center justify-between">
                                {/* Total Price Section */}
                                <div className="flex items-center space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        <DollarSign size={24} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Price</p>
                                        <p className="text-3xl font-bold text-black">
                                            ${(data.cart.totalPrice).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center space-x-3">
                                    {/* Delete Cart Button */}
                                    <button
                                        disabled={isLoading}
                                        onClick={handleDeleteCart}
                                        className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                                            isLoading
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:scale-110 active:scale-95 border border-red-200'
                                        }`}
                                        title="Clear Cart"
                                    >
                                        {isPendingDelete ? (
                                            <div className="w-5 h-5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Trash size={20} />
                                        )}
                                    </button>

                                    {/* Create Order Button */}
                                    <button
                                        disabled={isLoading}
                                        onClick={handleCreateOrder}
                                        className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                            isLoading
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        {isPendingCreate ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <PackagePlus size={20} className="mr-2" />
                                                <span>Create Order</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Cart Items Count */}
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <ShoppingCart size={16} />
                                    <span>{data.cart.items.length} item{data.cart.items.length !== 1 ? 's' : ''} in cart</span>
                                </div>
                                <div className="text-gray-500">
                                    {isLoading && <span>Processing your request...</span>}
                                </div>
                            </div>
                        </div>

                        {/* Hover Accent Line */}
                        <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                    </div>

                    {/* Cart Items */}
                    {data && (
                        <div className="bg-white rounded-b-xl shadow-lg border-l border-r border-b border-gray-200 divide-y divide-gray-100">
                            {data.cart.items.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="transform transition-all duration-200 hover:bg-gray-50"
                                >
                                    <Item item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}