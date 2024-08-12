import { createContext, useContext, useEffect, useReducer } from "react"

const CitiesContext = createContext()
const initialState = {
     cities: [],
     currentCity: {},
     isLoading: false,
}
const reducer = (state, action) => {
     switch (action.type) {
          case "getCities": return { ...state, cities: action.payload, isLoading: false }
          case "addCity":
               return { ...state, cities: [...state.cities, action.payload], isLoading: false }
          case "deleteCity":
               return { ...state, cities: state.cities.filter(city => city.id !== action.payload), isLoading: false }
          case "currentCity":
               return { ...state, currentCity: action.payload, isLoading: false }
          case "isLoading":
               return { ...state, isLoading: true }
          default: return state
     }

}
function CitiesProvider({ children }) {
     const [state, dispatch] = useReducer(reducer, initialState)
     async function fetchCities() {
          try {
               dispatch({ type: 'isLoading' })
               const response = await fetch("http://localhost:8000/cities");
               const data = await response.json(); // Assuming the response is JSON
               dispatch({ type: "getCities", payload: data })
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     }
     useEffect(() => {
          fetchCities()
     }, [])

     async function createCity(newCity) {
          try {
               dispatch({ type: 'isLoading' })
               const response = await fetch("http://localhost:8000/cities", {
                    method: 'POST',
                    body: JSON.stringify(newCity),
                    headers: {
                         "Content-Type": "application/json"
                    },
               });
               const data = await response.json();
               dispatch({ type: 'addCity', payload: data })


          } catch (error) {
               console.error('Error fetching data:', error);
          }
     }

     async function deleteCity(id) {
          try {
               dispatch({ type: 'isLoading' })
               const response = await fetch(`http://localhost:8000/cities/${id}`, {
                    method: 'Delete',
               });

               if (response.statusText === 'OK') {
                    dispatch({ type: 'deleteCity', payload: id })
               }

          } catch (error) {
               console.error('Error fetching data:', error);
          }
     }

     async function getCity(id) {
          if (id === state.currentCity.id) return
          try {
               dispatch({ type: 'isLoading' })
               const response = await fetch(`http://localhost:8000/cities/${id}`);
               const data = await response.json(); // Assuming the response is JSON
               dispatch({ type: 'currentCity', payload: data })
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     }
     return (
          <CitiesContext.Provider
               value={{
                    cities:
                         state.cities,
                    isLoading: state.isLoading,
                    currentCity: state.currentCity,
                    createCity,
                    getCity,
                    deleteCity
               }}>
               {children}
          </CitiesContext.Provider>
     )
}

const useCities = () => {
     const context = useContext(CitiesContext)
     if (!context) throw new Error('this hook can not be used outside of the provider')
     return context
}

export { CitiesProvider, useCities };
