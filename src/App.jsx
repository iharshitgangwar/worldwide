import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"

function App() {

  return (


    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/app" element={<AppLayout />} >
          <Route index element={<AppLayout />} />
          <Route path="countries" element={<p>hi</p>} />
          <Route path="cities" element={<AppLayout />} />
          <Route path="form" element={<AppLayout />} />

        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
