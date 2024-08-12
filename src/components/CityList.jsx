import { useCities } from '../contexts/CitiesContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'

function CityList() {
     const { cities } = useCities()
     if (!cities) return <Message message="Add your city by clicking on a city on the map" />
     if (!cities.length) return <Message message="Add your city by clicking on a city on the map" />
     return (
          <ul className={styles.cityList}>
               {cities?.map(city =>
                    (<CityItem city={city} key={city.id} />)
               )}
          </ul>
     )
}
export default CityList
