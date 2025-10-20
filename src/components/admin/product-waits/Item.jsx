import { useState, useRef } from "react";
import { Package, DollarSign, Tag, User, Calendar, AlertCircle, CheckCircle, XCircle } from "lucide-react";


// this is just to show the modal (dialog modal)

import FormApproveProduct from "./FormApproveProduct";
import FormDenyProduct from "./FormDenyProduct";
import Modal from "../../../UI/MyProducts/Modal";

export default function AdminProductItem({ data, onApprove, onDelete }) {
    const [imageLoadErrors, setImageLoadErrors] = useState({});
    
    const deleteRef = useRef() ;
    const approveRef = useRef() ;

    const isOutOfStock = data.availbleItems <= 0;
    const isInvalid = !data.valid;
    const creatorName = `${data.creatorId.name.firstName} ${data.creatorId.name.lastName}`;
    
    const handleImageError = (index) => {
        setImageLoadErrors(prev => ({ ...prev, [index]: true }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleApprove = () => {
        approveRef.current.open() ;
    };

    const handleDelete = () => {
        deleteRef.current.open() ;
    };

    return (<>
        <Modal ref={deleteRef}>
            <FormDenyProduct ref={deleteRef} productId={data._id} />
        </Modal>
        <Modal ref={approveRef} >
            <FormApproveProduct ref={approveRef} productId={data._id} />
        </Modal>
        <div className={`group relative bg-white rounded-xl shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
            isInvalid ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:border-orange-300'
        }`}>
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                {isInvalid ? (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <XCircle size={12} />
                        <span>Pending Review</span>
                    </div>
                ) : (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <CheckCircle size={12} />
                        <span>Approved</span>
                    </div>
                )}
            </div>
            
            <div className="flex flex-col lg:flex-row">
                {/* Image Grid Section */}
                <div className="lg:w-2/5">
                    <div className="grid grid-cols-2 grid-rows-2 h-64 lg:h-80 gap-1 p-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div 
                                key={index} 
                                className="relative bg-gray-100 rounded-lg overflow-hidden group/image transition-transform duration-300 hover:scale-105"
                            >
                                {data.images && data.images[index] && !imageLoadErrors[index] ? (
                                    <>
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                                            src={data.images[index]}
                                            alt={`${data.name} view ${index + 1}`}
                                            onError={() => handleImageError(index)}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-10 transition-all duration-300"></div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <Package size={20} className="mb-1" />
                                        <span className="text-xs text-center px-1">
                                            Image not available
                                        </span>
                                    </div>
                                )}
                                
                                {/* Image Index */}
                                <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold">
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                    {/* Header */}
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-black mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                            Product name: {data.name}
                        </h2>
                        
                        {/* Creator Info */}
                        <div className="flex items-center space-x-2 mb-3 p-3 bg-gray-50 rounded-lg">
                            <User size={18} className="text-gray-600" />
                            <div>
                                <span className="text-sm font-semibold text-gray-700">Created by: </span>
                                <span className="text-sm text-gray-900 font-medium">{creatorName}</span>
                            </div>
                        </div>
                        
                        {/* Creator ID */}
                        <div className="mb-3">
                            <span className="text-sm text-gray-600">Creator ID: </span>
                            <span className="text-sm font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
                                {data.creatorId.userId}
                            </span>
                        </div>
                        
                        {/* Price & Stock Row */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <DollarSign size={18} className="text-green-600" />
                                <span className="text-xl font-bold text-green-600">
                                    Price: ${data.price}
                                </span>
                            </div>
                            
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${
                                isOutOfStock 
                                    ? 'bg-red-100 text-red-700' 
                                    : 'bg-green-100 text-green-700'
                            }`}>
                                <Package size={14} />
                                <span>
                                    Available items: {data.availbleItems}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    {data.categories && data.categories.length > 0 && (
                        <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <Tag size={16} className="text-gray-500" />
                                <span className="text-sm font-semibold text-gray-700">Categories</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.categories.map((category, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full font-medium hover:bg-orange-200 transition-colors duration-200"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed line-clamp-4 text-sm">
                            {data.description}
                        </p>
                    </div>

                    {/* Product Details */}
                    <div className="mb-6 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar size={14} />
                                <span>Created: {formatDate(data.createdAt)}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                data.type === 'custom' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'bg-blue-100 text-blue-700'
                            }`}>
                                {data.type}
                            </span>
                        </div>
                        
                        {data.updatedAt !== data.createdAt && (
                            <div className="flex items-center space-x-2 text-gray-500">
                                <Calendar size={14} />
                                <span>Updated: {formatDate(data.updatedAt)}</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Delete
                        </button>
                        
                        <button
                            onClick={handleApprove}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                            Approve
                        </button>
                    </div>
                </div>
            </div>

            {/* Hover Accent Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    </>);
}