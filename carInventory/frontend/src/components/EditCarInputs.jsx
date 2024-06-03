import React from 'react'
import styles from '../styles/EditCarInputs.module.css'

export default function EditCarInputs({ car, onInputChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    onInputChange(car._id, name, value)
  }

  return (
    <>
      <label htmlFor="make">
        <p>Make</p>
        <input className={styles.input} type="text" name="make" value={car.make} onChange={handleChange} required />
      </label>
      <label htmlFor="model">
        <p>Model ~ Year Built</p>
        <input className={styles.input} type="number" name="model" value={car.model} onChange={handleChange} required />
      </label>
      <label htmlFor="registration">
        <p>Registration Number</p>
        <input
          className={styles.input}
          type="text"
          name="registration"
          value={car.registration}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="owner">
        <p>Owner</p>
        <input className={styles.input} type="text" name="owner" value={car.owner} onChange={handleChange} required />
      </label>
      <label htmlFor="address">
        <p>Owners Address</p>
        <input
          className={styles.input}
          type="text"
          name="address"
          value={car.address}
          onChange={handleChange}
          required
        />
      </label>
    </>
  )
}
