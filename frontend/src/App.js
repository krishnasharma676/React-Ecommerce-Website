import './App.css';
import './components/css/inputs.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Signup } from './Signup';
import { PrivateComponent } from './components/PrivateComponent';
import { Login } from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  const location = useLocation();
  const auth = localStorage.getItem('user');

  // Check if the current route is login
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {!isLoginPage && auth && <Header />}
      <div className="content">
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList/>} />
            <Route path='/add' element={<AddProduct/>} />
            <Route path='/update/:Id' element={<UpdateProduct/>} />
            <Route path='/logout' element={<h1>Logout</h1>} />
            <Route path='/profile' element={<h1>Profile</h1>} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
      {/* {!isLoginPage && <Footer />} */}
    </div>
  );
}

// Wrap the App component with BrowserRouter
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
