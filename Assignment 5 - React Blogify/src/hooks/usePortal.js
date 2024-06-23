import { useEffect, useState } from 'react'

const usePortal = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // disable the scroll bar when user opens modal
    if (showModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'visible'
  })

  const handleShowModal = (bool) => {
    setShowModal(bool)
  }

  return { showModal, handleShowModal }
}
export default usePortal
