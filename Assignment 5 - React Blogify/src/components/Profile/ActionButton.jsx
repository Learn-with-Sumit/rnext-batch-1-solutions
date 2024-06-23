const ActionButton = ({ className, children, cb }) => {
  return (
    <button
      onClick={cb}
      className={`grid place-items-center absolute -right-10 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80 ${className}`}
    >
      {children}
    </button>
  )
}
export default ActionButton
