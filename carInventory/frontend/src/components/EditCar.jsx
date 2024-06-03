import React, { useState, useEffect } from 'react'
import styles from '../styles/EditCar.module.css'
import axios from 'axios'

export default function EditCar({ carData, onCarChange, onShowEdit }) {
  const [car, setCar] = useState({ make: '', model: '', registration: '', owner: '', address: '' })

  useEffect(() => {
    if (carData) {
      setCar(carData)
    }
  }, [carData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCar({ ...car, [name]: value })
  }

  //edits old car to new data
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/cars/${carData._id}`, car)
      onCarChange()
      onShowEdit(false)
    } catch (error) {
      console.error('Error updating car:', error)
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" name="make" value={car.make} onChange={handleChange} required />
      <input className={styles.input} type="number" name="model" value={car.model} onChange={handleChange} required />
      <input
        className={styles.input}
        type="text"
        name="registration"
        value={car.registration}
        onChange={handleChange}
        required
      />
      <input className={styles.input} type="text" name="owner" value={car.owner} onChange={handleChange} required />
      <input className={styles.input} type="text" name="address" value={car.address} onChange={handleChange} required />
      <button className="buttonPositive" type="submit">
        Submit
      </button>
    </form>
  )
}
