import { useCities } from '../contexts/CitiesContext'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'

function CountryList() {
     const { cities } = useCities()
     if (!cities) return <Message message='Select a city from map' />
     if (!cities.length) return <Message message='Select a city from map' />
     const countries = cities.reduce((arr, city) => {
          const countryExist = arr.find(el => el.country === city.country)
          if (!countryExist) {
               return [...arr, { country: city.country, emoji: city.emoji }]
          }
          else return arr
     }, [])
     return (
          <ul className={styles.countryList}>
               {countries.map(countryItem =>
                    <CountryItem country={countryItem} key={countryItem.country} />
               )}
          </ul>
     )
}

export default CountryList
