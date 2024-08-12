// ""

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const { lat, lng } = useUrlPosition()
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoLoading, setGeoLoading] = useState(false)
  const [errorGeo, SetErrorGeo] = useState(false)
  const navigate = useNavigate()
  const { createCity } = useCities()

  const fetchCityData = async () => {
    try {
      setGeoLoading(true)
      const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
      const data = await response.json()
      if (!data.countryName) {
        SetErrorGeo(true)
      }
      else {
        SetErrorGeo(false)
      }
      setCityName(data.city || data.locality)
      setCountry(data.countryName)
      setEmoji(convertToEmoji(data.countryCode))
    } catch (err) {
      console.error(err)
    } finally {
      setGeoLoading(false)
    }
  }
  useEffect(() => {
    fetchCityData()
  }, [lat, lng])

  if (geoLoading) return <Spinner />
  if (errorGeo) {
    return <Message message="Seem Not a City" />
  }
  const handleAddCity = async (e) => {
    e.preventDefault()
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      },
    }
    await createCity(newCity)
    navigate('/app')
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">{cityName}</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary' onClick={handleAddCity} >Add</Button>
        <ButtonBack >&larr; Back</ButtonBack>
      </div>
    </form>
  );
}

export default Form;
