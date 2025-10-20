import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Custom from './components/Custom'
import Friends from './components/chat/friends/Friends'
import Patterns from './components/patterns/Patterns'
import Shop from './components/Shop'
import Header from './UI/Header'
import SignUp from './components/account/SignUp'
import Login from './components/account/Login'
import FrontPage from './components/FrontPage'
import Forgot from './components/account/Forgot'
import ForgotVer from './components/account/ForgotVer'
import SignUpVer from './components/account/SignupVer'
import Cart from './components/user-stuff/cart/Cart'
import Orders from './components/user-stuff/orders/Orders'
import ProtectedRoute from './middlewares/loggedIn'
import AdminMid from './middlewares/AdminMid'
import SellerMid from './middlewares/SellerMid'
import MyProductsPosted from './components/user-stuff/myProducts/MyProductsPosted'
import MyProductsPending from './components/user-stuff/myProducts/MyProductsPending'
import Products from './components/user-stuff/myProducts/MyProducts'
import ProductDetails from './components/product-details/productDetails'
import SellerWaitsVer from './components/admin/seller-waits/SellerWaitsVer'
import ProductWaitsVer from './components/admin/product-waits/ProductWaitsVer'
import Options from './components/options/Options'
import Chat from './components/chat/Chat.jsx' ;
import PublicChat from './components/chat/publicChat/PublicChat'
import PublicChatSection from './components/chat/publicChat/PublicChatSection.jsx'
import ChatSection from './components/chat/ChatSection.jsx'
import Profile from './components/profile/Profile.jsx'

import ProductDetailsBought from './components/user-stuff/myProducts/productBoughtDetails/ProductDetailsBought.jsx'
import ProductDetailsBoughtPage from './components/user-stuff/myProducts/productBoughtDetails/productDetailsBoughtPage.jsx'


import NoChatSelectedPublic from './components/chat/UI/NoChatSelectedPublic.jsx'
import NoChatSelectedPrivate from './components/chat/UI/NoChatSelectedPrivate.jsx'
// Providers for context (for now just 2)
import {AuthProvider} from './Contexts/UserContext'
import { ChatProvider } from './Contexts/ChatContext.jsx'

import { QueryClientProvider } from '@tanstack/react-query'

// query client 
import { queryClient } from './utils/http'


// modifications are still happening on the app routing system 
// so everything might change over nigth (just joke (maybe))
// 

const router = createBrowserRouter([
  {path : '/' , element : <Header /> , children : [
    {index : true , element : <FrontPage /> } ,
    {path : 'shop' , element : <Shop />  } ,
    {path : 'custom' , element : <Custom /> } ,
    {path : '/friends' , element : <ProtectedRoute>
      <Friends />
    </ProtectedRoute> } ,
    {path : 'profile/:userId' , element : <Profile /> } ,
    {path : 'chat' , children : [
      {path : 'private' , element : <Chat />  , children : [
        {index : true , element : <NoChatSelectedPrivate /> } ,
        {path : ':friendId' , element : <ChatSection /> }
      ] } ,
      {path : 'public' , element : <PublicChat />  , children : [
        {index : true , element : <NoChatSelectedPublic /> } ,
        {path : ':chatId' , element : <PublicChatSection /> }
      ]}
    ]} ,
    {path : 'admin' , children : [
      {path : 'productVer' , element : <ProtectedRoute>
        <AdminMid><ProductWaitsVer /></AdminMid>
      </ProtectedRoute>  } ,
      {path : 'sellerVer' , element : <ProtectedRoute>
        <AdminMid><SellerWaitsVer /></AdminMid>
      </ProtectedRoute> } 
    ]} ,
    {path : 'patterns' , element : <Patterns />  } ,
    {path : 'options' , element : <ProtectedRoute>
      <Options />
    </ProtectedRoute> } ,
    {path : 'cart' , element :<ProtectedRoute  ><Cart /></ProtectedRoute> } ,
    {path : 'orders' , element :<ProtectedRoute ><Orders /></ProtectedRoute> } ,
    {path : 'product/details/:productId' , element : <ProductDetails /> } ,
    {path : 'myProducts' , element : <Products /> , children : [
      {path : 'pending' , element : <ProtectedRoute >
          <SellerMid><MyProductsPending /></SellerMid>
        </ProtectedRoute> } ,
      {path : 'posted' , element : <ProtectedRoute >
          <SellerMid><MyProductsPosted /></SellerMid>
        </ProtectedRoute>} ,
      {path : 'posted/:productId' , element : <ProtectedRoute>
        <ProductDetailsBought />
      </ProtectedRoute>} ,
      {path : 'posted/:buyerId/:productId' , element : <ProtectedRoute>
        <ProductDetailsBoughtPage />
      </ProtectedRoute>}
    ]} ,
    {path : '/account' , children : [
      {path : 'signup' , element : <SignUp /> } ,
      {path : 'signup/:token' , element : <SignUpVer /> } ,
      {path : 'login' , element : <Login /> } ,
      {path : 'forgot' , element : <Forgot /> } ,
      {path : 'forgot/:token' , element : <ForgotVer /> }
    ]} 
  ]},
])


function App() {
  return <QueryClientProvider client={queryClient} >
      <ChatProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChatProvider>
    </QueryClientProvider>
}

export default App