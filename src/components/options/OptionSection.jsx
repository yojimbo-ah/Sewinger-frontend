import { ChevronRight } from "lucide-react";

export default function OptionSection({ modalRef, text, icon: Icon }) {
    return (
        <button 
            onClick={() => modalRef.current.open()}
            className="group relative bg-white w-full max-w-2xl mx-auto rounded-xl shadow-lg border-2 border-gray-200 
                overflow-hidden transition-all duration-300 
                hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-200 hover:-translate-y-1"
        >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative flex items-center justify-between px-6 py-4">
                {/* Left side - Icon and Text */}
                <div className="flex items-center space-x-4">
                    {/* Icon container */}
                    {Icon && (
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center 
                            transition-all duration-300 group-hover:bg-orange-100 group-hover:scale-110">
                            <Icon className="w-6 h-6 text-gray-600 transition-colors duration-300 group-hover:text-orange-600" />
                        </div>
                    )}
                    
                    {/* Text */}
                    <span className="text-lg font-semibold text-gray-800 transition-all duration-300 
                        group-hover:text-orange-600">
                        {text}
                    </span>
                </div>
                
                {/* Right side - Arrow */}
                <div className="flex items-center">
                    <ChevronRight className="w-6 h-6 text-gray-400 transition-all duration-300 
                        group-hover:text-orange-600 group-hover:translate-x-2" />
                </div>
            </div>
            
            {/* Bottom accent bar */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 
                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
            </div>
        </button>
    );
}