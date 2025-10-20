import { useState } from "react"
import { UserCircle, Instagram, Github, Facebook } from "lucide-react"
import { useNavigate , useParams } from "react-router-dom"

export default function ProductDetailsBoughtItem ({ data }) {
    const params = useParams() ;
    const productId = params.productId ;
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate() ;

    return (
        <div 
            className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            
            {/* Profile Section Container */}
            <div onClick={() =>{
                navigate(`/myProducts/posted/${data._id}/${productId}`) ;
            }}
            className="flex items-start gap-4">
                
                {/* Profile Image */}
                <div className={`flex-shrink-0 transition-all duration-300 transform ${isHovered ? 'scale-105' : 'scale-100'}`}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-orange-500 bg-orange-50 flex items-center justify-center shadow-sm">
                        
                        {data?.bio?.profileImage ? (
                            <img 
                                src={data.bio.profileImage} 
                                alt={`${data?.name?.firstName || "User"}'s profile`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <UserCircle className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500" />
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="flex-grow min-w-0">
                    
                    {/* Name */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                        {data?.name?.firstName} {data?.name?.lastName}
                    </h3>
                    
                    {/* Seller Badge */}
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Seller</p>
                    
                    {/* Social Links Label and Icons */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-600 mb-2">Follow:</p>
                        
                        <div className="flex gap-2">
                            
                            {data?.bio?.instagram && (
                                <a 
                                    href={data.bio.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-orange-50 hover:bg-orange-500 border border-orange-300 hover:border-orange-500 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group/icon"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-4 h-4 text-orange-500 group-hover/icon:text-white transition-colors duration-300" />
                                </a>
                            )}

                            {data?.bio?.github && (
                                <a 
                                    href={data.bio.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-orange-50 hover:bg-orange-500 border border-orange-300 hover:border-orange-500 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group/icon"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-4 h-4 text-orange-500 group-hover/icon:text-white transition-colors duration-300" />
                                </a>
                            )}

                            {data?.bio?.facebook && (
                                <a 
                                    href={data.bio.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-orange-50 hover:bg-orange-500 border border-orange-300 hover:border-orange-500 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group/icon"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-4 h-4 text-orange-500 group-hover/icon:text-white transition-colors duration-300" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}