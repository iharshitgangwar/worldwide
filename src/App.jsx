import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { CitiesProvider } from "./contexts/CitiesContext"
import Map from "./components/Map"

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route index element={<Homepage />} />
          <Route path="/app" element={<AppLayout />} >
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
  )
}

export default App
