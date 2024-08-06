import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"

function App() {
  const [cities, SetCities] = useState();
  async function fetchCities() {
    try {
      const response = await fetch("http://localhost:8000/cities");

      const data = await response.json(); // Assuming the response is JSON
      SetCities(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCities()
  }, [])
  return (


    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route index element={<Homepage />} />
        <Route path="/app" element={<AppLayout />} >
          {/* here Navigate will redirect inedx to cities route  here replace will allow to move backward*/}
          <Route index element={<Navigate replace to='cities' />} />
          <Route path="countries" element={<CountryList cities={cities} />} />
          <Route path="cities" element={<CityList citiesData={cities} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
