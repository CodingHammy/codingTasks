import { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './App.module.css'

import Cars from './components/Cars'

import AddCar from './components/AddCar'
import EditManyInfo from './components/EditManyInfo'
import EditMany from './components/EditMany'

function App() {
  //saves cars throughout applicaton
  const [cars, setCars] = useState([])
  // cars in correct order
  const [filteredCars, setFilteredCars] = useState([])
  // when fetching cars show loading paragraph
  const [isLoading, setIsLoading] = useState(true)

  //saves which cars are to bee shown if clicking dropdown menu
  const [filterActive, setFilterActive] = useState(false)

  // saves id of checkbox slected cars
  const [selectedCarIds, setSelectedCarIds] = useState([])
  //using above found cars using id are saved her
  const [selectedCars, setSelectedCars] = useState([])

  // set to show checkboxs in cars
  const [showCheckbox, setShowCheckbox] = useState(false)
  // keeps state for which tab is active
  const [activeTab, setActiveTab] = useState(null)
  //set for rerun of useeffect
  const [toggle, setToggle] = useState(false)

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/cars')
      // Sort the cars by createAt in ascending order (oldest last)
      let orderedCars = res.data.filter((car) => car.createAt)
      orderedCars.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
      setCars(orderedCars)
    } catch (error) {
      console.error('cannot fetch data', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  //used for filtering cars that are older than 5
  useEffect(() => {
    if (filterActive) {
      const fiveYearsAgo = new Date().getFullYear() - 5
      //assuming all cars built in 2019 are built at the start of the year
      const filtered = cars.filter((car) => new Date(car.model).getFullYear() < fiveYearsAgo)
      setFilteredCars(filtered)
    } else {
      setFilteredCars(cars)
    }
  }, [cars, filterActive])

  const handleCarChange = () => {
    fetchData()
  }

  //selects car id from selected checkbox inside of car component, if no cars then returns old cars
  const handleCarSelection = (carId, isSelected) => {
    setSelectedCarIds((prevSelectedCarIds) => {
      if (isSelected) {
        return [...prevSelectedCarIds, carId]
      } else {
        return prevSelectedCarIds.filter((id) => id !== carId)
      }
    })
  }

  // shows editmany component, waits for atleast two cars to be selected and then takes the slectedcarids and finds the whole car to then fill the maps inputs inside of editmany form
  const handleConfirm = () => {
    setActiveTab('editMany')
    if (selectedCarIds.length < 2) {
      return alert('less than one car')
    }
    // setShowEditMany(true)

    const carIds = selectedCarIds
    const selectedEditedCars = filteredCars.filter((car) => carIds.includes(car._id))

    setSelectedCars(selectedEditedCars)
  }

  const updateManyDB = async (cars) => {
    try {
      // Iterate over each car update object in the array
      await Promise.all(
        cars.map(async (car) => {
          // Create a shallow copy of the car object as i was having problems using the state in this place
          const carUpdate = { ...car }
          await axios.put(`/api/cars/${car._id}/many`, carUpdate)
        })
      )
    } catch (error) {
      console.error('Error updating cars:', error)
    } finally {
      handleCarChange()
    }
  }

  // finds cars from the cars state by searched its id, that was given when clicking the checkboxes and confirming the cars to edit
  const confirmEditMany = (updatedCars) => {
    setCars((prevCars) => prevCars.map((car) => updatedCars.find((updatedCar) => updatedCar._id === car._id) || car))
    setActiveTab(null)
    //used to run usestate for updating many function
    setToggle(true)
  }

  useEffect(() => {
    if (toggle) {
      updateManyDB(cars)
      setToggle(false)
    }
  }, [toggle])

  // 5 codes below handles which componets are shown and which are hidden so only one adding or editing components is shown at one time
  const handleActiveCarTab = (activeEditCar) => {
    setActiveTab(activeEditCar)
  }

  const handleActiveTab = () => {
    setActiveTab(null)
  }

  const handleAddCar = () => {
    setActiveTab('addCar')
  }

  const handleEditMany = () => {
    setShowCheckbox(true)
    setActiveTab('editManyInfo')
  }

  useEffect(() => {
    if (activeTab !== 'editManyInfo') {
      setShowCheckbox(false)
    }
  }, [activeTab])

  return (
    <div className={`App ${styles.container}`}>
      <nav className={styles.nav}>
        <h2 className={styles.header}>Car Inventory</h2>
        <select onChange={(e) => setFilterActive(e.target.value === 'all' ? false : true)}>
          <option value="all">Show all cars</option>
          <option value="5+ years">Show cars older than 5 years</option>
        </select>
        <div className={styles.buttons}>
          <button className="buttonEdit" onClick={handleEditMany}>
            Edit Many
          </button>
          <button className="buttonPositive" onClick={handleAddCar}>
            Add Car
          </button>
        </div>
      </nav>
      {activeTab === 'editMany' && <EditMany carsData={selectedCars} onSubmit={confirmEditMany} />}
      {showCheckbox && activeTab === 'editManyInfo' && (
        <EditManyInfo onShowCheckbox={setShowCheckbox} onConfirm={handleConfirm} />
      )}
      {activeTab === 'addCar' && <AddCar onCarChange={handleCarChange} onActiveTab={handleActiveTab} />}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Cars
          onActiveTab={handleActiveCarTab}
          activeTab={activeTab}
          carsData={filteredCars}
          onCarChange={handleCarChange}
          onShowCheckbox={showCheckbox}
          onSelectedCars={handleCarSelection}
        />
      )}
    </div>
  )
}

export default App
