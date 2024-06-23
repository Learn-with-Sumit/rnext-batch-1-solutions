const handleOutsideClick = (e, ref, setterFn) => {
  if (ref.current && !ref.current.contains(e.target)) {
    setterFn(false)
  }
}

export default handleOutsideClick
