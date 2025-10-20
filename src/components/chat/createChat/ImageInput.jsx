
import { Camera , Plus , X } from "lucide-react"
import { forwardRef } from "react";


const ImageInput = forwardRef(({profileImage ,handleImageUpload , imageNull }, ref) => {

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };


    return   <div className="space-y-6">
          <h2 className="text-lg font-semibold  mb-4">Profile Image Upload</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-orange-500/30 p-1">
                {profileImage ? (
                  <img
                    src={profileImage.src}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <Camera className="text-gray-500" size={32} />
                  </div>
                )}
              </div>
              
              <button
                onClick={() => ref.current?.click()}
                className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all duration-200"
              >
                <Plus size={20} />
              </button>
              
              {profileImage && (
                <button
                  onClick={imageNull}
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <input
              ref={ref}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="hidden"
            />
            
            <button
              onClick={() => ref.current?.click()}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium"
            >
              Choose Profile Photo
            </button>
            
            {profileImage && (
              <div className="text-center text-sm text-gray-400">
                <p>{profileImage.name}</p>
                <p>{formatFileSize(profileImage.size)}</p>
              </div>
            )}
          </div>
        </div>
})

export default ImageInput ;