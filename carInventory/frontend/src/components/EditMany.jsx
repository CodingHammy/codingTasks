import React, { useState } from 'react'
import EditCarInputs from './EditCarInputs'

import styles from '../styles/EditMany.module.css'

export default function EditMany({ carsData, onSubmit }) {
  const [updatedCars, setUpdatedCars] = useState(carsData)

  //renders all cars inputs and fills input with current data for car maping inside of the jsx
  const handleInputChange = (id, name, value) => {
    setUpdatedCars((prevUpdatedCars) =>
      prevUpdatedCars.map((car) => (car._id === id ? { ...car, [name]: value } : car))
    )
  }

  //finds cars that match cars that have been selected using the checkbox inside car component then sends info to app.jsx to next stage
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(updatedCars)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {updatedCars.map((item) => (
        <div key={item._id} className={styles.carAllInputs_container}>
          <EditCarInputs car={item} onInputChange={handleInputChange} />
        </div>
      ))}
      <div className={styles.buttons}>
        <button className="buttonCancel" type="button" onClick={() => onSubmit(carsData)}>
          Cancel
        </button>
        <button className="buttonPositive" type="submit">
          Confirm
        </button>
      </div>
    </form>
  )
}
