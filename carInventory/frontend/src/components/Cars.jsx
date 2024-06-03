import React from 'react'
import styles from '../styles/Cars.module.css'
import Car from './Car'

export default function Cars({ carsData, onCarChange, onShowCheckbox, onSelectedCars, onActiveTab, activeTab }) {
  return (
    <main className={styles.container}>
      {carsData.map((item) => (
        <Car
          key={item._id}
          carData={item}
          onCarChange={onCarChange}
          onShowCheckbox={onShowCheckbox}
          onSelectedCars={onSelectedCars}
          onActiveTab={onActiveTab}
          activeTab={activeTab}
        />
      ))}
    </main>
  )
}
