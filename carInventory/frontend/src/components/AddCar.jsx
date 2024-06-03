import React, { useState } from 'react'
import axios from 'axios'

import styles from '../styles/AddCar.module.css'

export default function AddCar({ onCarChange, onActiveTab }) {
  const [car, setCar] = useState({ make: '', model: '', registration: '', owner: '', address: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCar({ ...car, [name]: value })
  }

  // adds new car to db and hides addCAr component only if successfully posted to db
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/cars', car)
      onCarChange()
      setCar({ make: '', model: '', registration: '', owner: '', address: '' })
      //sets active tab to null
      onActiveTab()
    } catch (error) {
      console.error('Error adding car:', error)
    }
    setIsLoading(false)
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="make" placeholder="Make" value={car.make} onChange={handleChange} required />
        <input
          type="number"
          name="model"
          placeholder="Model ~ year built"
          value={car.model}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="registration"
          placeholder="Registration Number"
          value={car.registration}
          onChange={handleChange}
          required
        />
        <input type="text" name="address" placeholder="Address" value={car.address} onChange={handleChange} required />
        <input
          type="text"
          name="owner"
          placeholder="Current Owner"
          value={car.owner}
          onChange={handleChange}
          required
        />
        <div className={styles.buttons}>
          <button className="buttonCancel" type="button" onClick={() => onActiveTab(null)}>
            Cancel
          </button>
          <button className="buttonPositive" disabled={isLoading ? true : false} type="submit">
            Submit
          </button>
        </div>
      </form>
    </main>
  )
}
