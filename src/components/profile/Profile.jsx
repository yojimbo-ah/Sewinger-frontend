import { useParams , useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getUserProfileDetailsQuery } from "../../utils/detailhttp";
import { User, Mail, MessageCircle, UserPlus, Clock, UserCheck, Instagram, Facebook, Github, Package, Users, CircleUser } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import ChatContext from "../../Contexts/ChatCreateContext";


export default function Profile() {
    const params = useParams();
    const userId = params.userId;
    const { token } = useContext(AuthContext);
    const {changePrivateChat} = useContext(ChatContext) ;
    const navigate = useNavigate() ;

    const { data, isSuccess, isError, isPending } = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => {
            return getUserProfileDetailsQuery({ profileId: userId, jwtToken: token });
        }
    })



    console.log(data) ;

    if (isPending) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <p className="text-xl font-semibold text-red-600">Failed to load profile</p>
                        <p className="text-gray-600 mt-2">Please try again later</p>
                    </div>
                </div>
            </div>
        );
    }

    const profile = data.profile;

    const handleSendEmail = () => {
        const email = profile.email
        // Open Gmail with pre-filled email
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}}}`
        window.open(gmailLink, '_blank')
    }

    // Determine button state based on status
    const getActionButton = () => {
        if (profile.status === 'friend') {
            return (
                <button className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 font-semibold rounded-xl border-2 border-green-200 cursor-default">
                    <UserCheck size={20} />
                    <span>Friends</span>
                </button>
            );
        }

        if (profile.status === 'pending') {
            if (profile.sentBy === 'me') {
                return (
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl border-2 border-gray-300 cursor-default">
                        <Clock size={20} />
                        <span>Request Sent</span>
                    </button>
                );
            } else {
                return (
                    <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200">
                        <UserCheck size={20} />
                        <span>Accept Request</span>
                    </button>
                );
            }
        }

        // status === 'normal'
        return (
            <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200">
                <UserPlus size={20} />
                <span>Add Friend</span>
            </button>
        );
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 overflow-y-auto py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-gray-200">
                    {/* Cover Banner */}
                    <div className="h-32 bg-gradient-to-r from-black via-gray-800 to-orange-600"></div>
                    
                    {/* Profile Content */}
                    <div className="px-8 pb-8">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-4">
                            <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                                {profile.bio?.profileImage ? (
                                    <img 
                                        src={profile.bio.profileImage} 
                                        alt={`${profile.name?.firstName} ${profile.name?.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <CircleUser size={80} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Name and Role */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-black">
                                    {profile.name?.firstName} {profile.name?.lastName}
                                </h1>
                                {profile.power && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        profile.power === 'admin' ? 'bg-red-100 text-red-700' :
                                        profile.power === 'seller' ? 'bg-orange-100 text-orange-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {profile.power.charAt(0).toUpperCase() + profile.power.slice(1)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3 mb-6 text-gray-700">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                <Mail onClick={handleSendEmail} size={20} className="text-orange-600" />
                            </div>
                            <span className="font-medium">{profile.email}</span>
                        </div>

                        {/* Social Links */}
                        {profile.bio?.socials && (
                            <div className="flex gap-3 mb-6">
                                {profile.bio.socials.instagram && (
                                    <a 
                                        href={profile.bio.socials.instagram} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition-colors duration-200"
                                    >
                                        <Instagram size={20} className="text-pink-600" />
                                    </a>
                                )}
                                {profile.bio.socials.facebook && (
                                    <a 
                                        href={profile.bio.socials.facebook} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200"
                                    >
                                        <Facebook size={20} className="text-blue-600" />
                                    </a>
                                )}
                                {profile.bio.socials.github && (
                                    <a 
                                        href={profile.bio.socials.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-900 transition-colors duration-200"
                                    >
                                        <Github size={20} className="text-white" />
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {getActionButton()}
                            
                            {profile.status === 'friend' && (
                                <button onClick={() => {
                                    changePrivateChat(userId) ;
                                    navigate(`/chat/private/${userId}`)
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200">
                                    <MessageCircle size={20} />
                                    <span>Message</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                {profile.products && profile.products.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <Package size={24} className="text-orange-500" />
                            <h2 className="text-2xl font-bold text-black">Products</h2>
                            <span className="text-gray-600">({profile.products.length})</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {profile.products.map((product) => (
                                <div onClick={() => {
                                    navigate(`/product/details/${product._id}`)
                                }}
                                key={product._id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all duration-300">
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        {product.images && product.images[0] && (
                                            <img 
                                                src={product.images[0]} 
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-black group-hover:text-orange-600 transition-colors duration-200 line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-lg font-bold text-green-600">${product.price}</span>
                                            <span className="text-sm text-gray-500">{product.availbleItems} available</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Friends Section */}
                {profile.friends && profile.friends.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <Users size={24} className="text-orange-500" />
                            <h2 className="text-2xl font-bold text-black">Friends</h2>
                            <span className="text-gray-600">({profile.friends.length})</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {profile.friends.map((friend) => (
                                <div onClick={() => navigate(`/profile/${friend._id}`)}
                                key={friend._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-orange-300 transition-all duration-300 text-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3 overflow-hidden">
                                        {friend.bio?.profileImage ? (
                                            <img 
                                                src={friend.bio.profileImage} 
                                                alt={`${friend.name?.firstName} ${friend.name?.lastName}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <CircleUser size={40} className="text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="font-semibold text-sm text-black line-clamp-1">
                                        {friend.name?.firstName} {friend.name?.lastName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}