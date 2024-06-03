import React, { useState } from 'react'
import axios from 'axios'
import EditCar from './EditCar'

import styles from '../styles/Car.module.css'

export default function Car({ carData, onCarChange, onShowCheckbox, onSelectedCars, onActiveTab, activeTab }) {
  const { make, model, owner, registration, address } = carData
  const [showEdit, setShowEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //deletes car that has been clicked from th db
  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/cars/${carData._id}`)
      onCarChange()
    } catch (error) {
      console.error('Error deleting car:', error)
    }
    setIsLoading(false)
  }

  // adds to state which ids have been checked then passes to update when updating many cars
  const handleCheckboxChange = (event) => {
    onSelectedCars(carData._id, event.target.checked)
  }

  //shows only the edit page that was last clicked
  const handleEdit = () => {
    onActiveTab(`edit${carData._id}`)
    setShowEdit(!showEdit)
  }

  return (
    <main className={styles.container}>
      <div className={styles.info}>
        <div>
          <h2 className={styles.modelMake_heading}>
            <i>{model}</i> {make}
          </h2>
          <p>{registration}</p>
        </div>
        <div className={styles.ownerInfo}>
          <p>
            <b>Owner:</b>
            {` ${owner}`}
          </p>
          <p>
            <b>Address:</b>
            {` ${address}`}
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className="buttonEdit" onClick={handleEdit}>
          Edit
        </button>
        <button className="buttonNegative" disabled={isLoading ? true : false} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div>
        {onShowCheckbox && <input className={styles.checkbox_div} onChange={handleCheckboxChange} type="checkbox" />}
      </div>

      {showEdit && activeTab === `edit${carData._id}` && (
        <EditCar carData={carData} onCarChange={onCarChange} onShowEdit={setShowEdit} />
      )}
    </main>
  )
}
