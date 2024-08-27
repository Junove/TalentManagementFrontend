import React from 'react'
import { useParams } from 'react-router-dom'


const ViewSingleApplication = () => {
    const { applicationid } = useParams()


  return (
    <div>{applicationid}</div>
  )
}

export default ViewSingleApplication