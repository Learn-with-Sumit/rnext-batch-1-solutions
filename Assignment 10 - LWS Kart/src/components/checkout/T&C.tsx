import React from 'react'
import TermsAndConditionsBengali from './T&CBengali'
import TermsAndConditionsEnglish from './T&CEnglish'

const TermsAndConditions = ({
  isLocaleBengali,
}: {
  isLocaleBengali: boolean
}) => {
  return (
    <div className='max-w-4xl mx-auto p-6 max-h-96 overflow-y-auto bg-white shadow-lg rounded-lg'>
      {isLocaleBengali ? (
        <TermsAndConditionsBengali />
      ) : (
        <TermsAndConditionsEnglish />
      )}
    </div>
  )
}

export default TermsAndConditions
