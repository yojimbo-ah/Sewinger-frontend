import { useContext } from "react"
import { AuthContext } from "../../../../Contexts/AuthContext"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { UserCircle, Mail, User, ShoppingBag, DollarSign } from "lucide-react";
import { getUserWhoBoughtMyProductSingleQuery } from "../../../../utils/sellerhttp";
import { useNavigate } from "react-router-dom";

export default function ProductDetailsBoughtPage() {
    const params = useParams()
    const { buyerId, productId } = params ;
    const { token } = useContext(AuthContext) ;
    const navigate = useNavigate() ;

    console.log('productId :' + productId)
    console.log('userId :' + buyerId)

    const { data, isPending, isError } = useQuery({
        queryKey: ['product', 'seller', 'page', productId],
        queryFn: () => {
            return getUserWhoBoughtMyProductSingleQuery({ jwtToken: token, productId: productId, userId: buyerId })
        }
    })
    const handleSendEmail = () => {
        const email = data.buyerDetails.email
        const subject = `Follow-up on your purchase`
        const body = `Hello ${data.buyerDetails.name.firstName},\n\nI hope you're satisfied with your purchase of ${data.orderUser.quantity} item(s) for $${data.orderUser.priceWhenBought}.\n\nPlease let me know if you have any questions!\n\nBest regards`

        // Open Gmail with pre-filled email
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(gmailLink, '_blank')
    }

    console.log(data)

    if (isPending) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading buyer details...</p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center">
                    <p className="text-red-600 font-semibold text-lg">Error loading buyer details</p>
                </div>
            </div>
        )
    }

    console.log(data)

    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center p-4 md:p-0">
            {/* Main Card Container */}
            <div className="w-full max-w-2xl animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-orange-300">
                    
                    {/* Header Section with gradient */}
                    <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-2 right-4 text-white text-6xl">🛍️</div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 md:px-8 py-8">
                        
                        {/* Profile Section */}
                        <div onClick={() => {
                            navigate(`/profile/${data.buyerDetails._id}`)
                        }}
                        className="flex flex-col md:flex-row items-center gap-6 mb-10">
                            {/* Profile Image Container */}
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 shadow-xl ring-4 ring-orange-200 overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:ring-orange-400 group-hover:shadow-2xl group-hover:scale-105">
                                    {data.buyerDetails.bio.profileImage ? (
                                        <img 
                                            src={data.buyerDetails.bio.profileImage} 
                                            alt="profile image" 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <UserCircle size={80} className="text-orange-400 group-hover:text-orange-600 transition-colors duration-300" />
                                    )}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                                    {data.buyerDetails.name.firstName} {data.buyerDetails.name.lastName}
                                </h2>
                                <p className="text-gray-500 text-sm font-medium">Buyer Profile</p>
                            </div>
                        </div>

                        <hr className="border-gray-200 mb-8" />

                        {/* Buyer Details Section */}

                        <div className="space-y-4 mb-10">
                            {/* Email */}
                            <div onClick={handleSendEmail}
                            className="group p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-all duration-300 border border-gray-200 hover:border-orange-300 cursor-pointer hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300">
                                        <Mail className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</p>
                                        <p className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                                            {data.buyerDetails.email}
                                        </p>
                                    </div>
                                </div>
                            </div>  

                            {/* Full Name */}
                            <div onClick={() => {
                                navigate(`/profile/${data.buyerDetails._id}`) ;
                            }} 
                            className="group p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-all duration-300 border border-gray-200 hover:border-orange-300 cursor-pointer hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300">
                                        <User className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</p>
                                        <p className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                                            {data.buyerDetails.name.firstName} {data.buyerDetails.name.lastName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200 mb-8" />

                        {/* Order Details Section */}
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-orange-600" />
                            Order Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Quantity Card */}
                            <div className="group p-6 rounded-xl bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Quantity Purchased</p>
                                    <ShoppingBag className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                                </div>
                                <p className="text-4xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                                    {data.orderUser.quantity}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">item{data.orderUser.quantity > 1 ? 's' : ''}</p>
                            </div>

                            {/* Price Card */}
                            <div className="group p-6 rounded-xl bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Price</p>
                                    <DollarSign className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                                </div>
                                <p className="text-4xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                                    ${data.orderUser.priceWhenBought}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">payment received</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Accent Bar */}
                    <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"></div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="fixed -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
            <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
        </div>
    )
}