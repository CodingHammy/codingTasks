import React from 'react'
import styles from '../styles/EditManyInfo.module.css'

export default function EditManyInfo({ onShowCheckbox, onConfirm }) {
  //closes this component and opens form component with all selected cars, ready to edit
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <main className={styles.container}>
      <p className={styles.text}>Check two or more boxes to edit serveral cars</p>
      <div className={styles.buttons}>
        <button className="buttonCancel" onClick={() => onShowCheckbox(false)}>
          Cancel
        </button>
        <button className="buttonPositive" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </main>
  )
}
