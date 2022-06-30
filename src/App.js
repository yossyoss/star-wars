import "./App.css"
import { Routes, Route } from "react-router-dom"

import Actors from "./components/Actors/Actors.js"
import Header from "./components/Header/Header.js"
import DetailsActor from "./components/DetailsActor/DetailsActor.js"
import Modal from "./components/Modal/Modal"

import { useState } from "react"

function App() {
  const [editModal, setEditModal] = useState(false)
  const [addNewModal, setAddNewModal] = useState(false)
  const [formSubmited, setOnFormSubmited] = useState(false)
  const [editFormData, setEditForm] = useState("")

  const onEditClicked = (data) => {
    setEditForm(data)
  }
  return (
    <div className='App'>
      {editModal && (
        <Modal
          editFormData={editFormData}
          setOnFormSubmited={setOnFormSubmited}
          title={"Edit film"}
          closeModal={setEditModal}
          isEdit={editModal}
        />
      )}
      {addNewModal && (
        <Modal
          setOnFormSubmited={setOnFormSubmited}
          title={"Add new film"}
          closeModal={setAddNewModal}
          isEdit={editModal}
        />
      )}
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Actors />}>
            <Route
              path=':actorId'
              element={
                <DetailsActor
                  setOnFormSubmited={setOnFormSubmited}
                  formSubmited={formSubmited}
                  openEditModal={setEditModal}
                  openAddNewModal={setAddNewModal}
                  onEditClicked={onEditClicked}
                />
              }
            />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
