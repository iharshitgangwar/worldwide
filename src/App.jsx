import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"

// import Product from "./pages/Product"
// import Pricing from "./pages/Pricing"
// import Homepage from "./pages/Homepage"
// import AppLayout from "./pages/AppLayout"
// import Login from "./pages/Login"

const Homepage = lazy(() => import('./pages/Homepage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const Login = lazy(() => import('./pages/Login'))
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"

import ProtectedRoutes from "./pages/ProtectedRoutes"
import SpinnerFullPage from "./components/SpinnerFullPage"


function App() {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route index element={<Homepage />} />
              <Route path="/app" element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>} >
                {/* here Navigate will redirect inedx to cities route  here replace 
          will allow to move backward*/}
                <Route index element={<Navigate replace to='cities' />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </Suspense>
  )
}

export default App
