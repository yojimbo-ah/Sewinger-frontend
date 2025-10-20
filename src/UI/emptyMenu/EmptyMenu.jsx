

export default function EmptyMenu ({icon , header , paragraph}) {


    return <div className="flex w-full h-full justify-center items-center p-8">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-12 text-center max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
                    <div className="mb-6">
                        {icon}
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-4">{header ? header : 'Your dont have any orders' }</h2>
                    <p className="text-gray-600">{paragraph ? paragraph :  'Add some amazing sewing patterns to get started!'} </p>
                </div>
            </div>
}