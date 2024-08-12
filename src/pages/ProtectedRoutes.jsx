import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/FakeAuthContext"
function ProtectedRoutes({ children }) {
     const navigate = useNavigate()
     const { isAuthenticated } = useAuth()
     useEffect(() => {
          if (!isAuthenticated) navigate('/')
     }, [isAuthenticated, navigate])
     return isAuthenticated ? children : null;
}

export default ProtectedRoutes
