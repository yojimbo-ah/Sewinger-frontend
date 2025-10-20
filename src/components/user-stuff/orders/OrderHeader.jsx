import { Trash, FileText, Calendar, DollarSign, Package } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { deleteOrderMutation, queryClient, getPDF } from '../../../utils/http'
import { AuthContext } from '../../../Contexts/AuthContext'
import { useContext } from 'react'

export default function OrderHeader({ order }) {
    const { token } = useContext(AuthContext);

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return deleteOrderMutation({ jwtToken: token, orderId: order._id })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
        }
    })

    function handleOrderDelete() {
        console.log('hello am here')
        mutate()
    }

    function handleOrderInvoice() {
        getPDF({ jwtToken: token, orderId: order._id })
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-t-xl w-full shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-gray-50 to-white p-6">
                <div className="flex items-center justify-between">
                    {/* Order Info Section */}
                    <div className="flex-1 space-y-3">
                        {/* Order ID */}
                        <div className="flex items-center space-x-2">
                            <Package size={16} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-600">Order ID:</span>
                            <span className="text-sm font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
                                #{order._id.slice(-12)}
                            </span>
                        </div>

                        {/* Total Price */}
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <DollarSign size={20} className="text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Price</p>
                                <p className="text-2xl font-bold text-black">
                                    ${order.order.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Order Date */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar size={14} />
                            <span>Ordered on {formatDate(order.createdAt)}</span>
                        </div>

                        {/* Items Count */}
                        <div className="flex items-center space-x-2 text-sm">
                            <Package size={14} className="text-gray-500" />
                            <span className="text-gray-700">
                                {order.order.items.length} item{order.order.items.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                        {/* Download Invoice Button */}
                        <button
                            onClick={handleOrderInvoice}
                            disabled={isPending}
                            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isPending
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 hover:scale-105 active:scale-95 border border-blue-200'
                            }`}
                            title="Download Invoice"
                        >
                            <FileText size={20} />
                            <span className="hidden md:inline">Invoice</span>
                        </button>

                        {/* Delete Order Button */}
                        <button
                            onClick={handleOrderDelete}
                            disabled={isPending}
                            className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                                isPending
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:scale-110 active:scale-95 border border-red-200'
                            }`}
                            title="Delete Order"
                        >
                            {isPending ? (
                                <div className="w-5 h-5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Trash size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        </div>
    );
}