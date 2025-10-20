import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProductDetails, buyProductMutation, queryClient } from "../../utils/http";
import { useState, useContext, useMemo } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ShoppingCart, User, Package, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function ProductDetails() {
    const { token } = useContext(AuthContext);
    const { productId } = useParams();
    const [mainImage, setMainImage] = useState(0);
    const navigate = useNavigate() ;

    const { data, isError, error, isSuccess, isPending } = useQuery({
        queryKey: ['products', 'details', productId],
        queryFn: () => fetchProductDetails({ productId }),
        enabled: !!productId // Only run if productId exists
    });

    const { mutate, isPending: isPendingMutate } = useMutation({
        mutationFn: () => buyProductMutation({ 
            jwtToken: token, 
            productId, 
            quantity: 1 
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(['products', 'details', productId]);
        }
    });
    console.log(data) ;

    // Memoize to prevent unnecessary re-renders
    const productImages = useMemo(() => data?.product?.images || [], [data]);
    const isOutOfStock = useMemo(() => data?.product?.availbleItems <= 0, [data]);

    const changeImage = (index) => {
        setMainImage(index);
    };

    const handleBuy = () => {
        if (!isOutOfStock && !isPendingMutate) {
            mutate();
        }
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-500 text-lg">Error loading product</p>
                    <p className="text-gray-600 mt-2">{error?.message}</p>
                </div>
            </div>
        );
    }

    if (!data?.product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Product not found</p>
            </div>
        );
    }

    const product = data.product;
    const creator = data.creator ;

    return (
        <div className="px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden shadow-lg group">
                        {productImages.length > 0 && (
                            <img
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                src={productImages[mainImage]}
                                alt={product.name}
                            />
                        )}
                    </div>

                    {/* Thumbnail Images */}
                    {productImages.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeImage(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                                        mainImage === index 
                                            ? 'border-orange-500 shadow-md' 
                                            : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info Section */}
                <div className="space-y-6">
                    {/* Product Name & Description */}
                    <div className="space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-bold text-black">
                            {product.name}
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Categories */}
                    {product.categories && product.categories.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Tag size={18} />
                                <span className="font-medium">Categories</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.categories.map((category, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors duration-200"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Creator Info */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <User size={18} />
                            <span className="font-medium">Created by</span>
                        </div>
                        <p onClick={() => {
                            navigate(`/profile/${creator._id}`)
                        }} className="text-gray-700 hover:text-orange-400 transition-colors duration-200">{creator.name.lastName} {creator.name.firstName}</p>
                    </div>

                    {/* Stock Info */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Package size={18} />
                            <span className="font-medium">Availability</span>
                        </div>
                        <p className={`font-medium ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                            {isOutOfStock ? 'Out of Stock' : `${product.availbleItems} items available`}
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                        <button
                            disabled={isPendingMutate || isOutOfStock}
                            onClick={handleBuy}
                            className={`w-full lg:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform ${
                                isPendingMutate || isOutOfStock
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 hover:shadow-lg active:scale-95'
                            }`}
                        >
                            {isPendingMutate ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Adding to Cart...</span>
                                </>
                            ) : isOutOfStock ? (
                                <>
                                    <Package size={20} />
                                    <span>Out of Stock</span>
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={20} />
                                    <span>Add to Cart</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium">Product ID:</span>
                                <span className="ml-1">#{productId}</span>
                            </div>
                            <div>
                                <span className="font-medium">Category:</span>
                                <span className="ml-1">{product.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}