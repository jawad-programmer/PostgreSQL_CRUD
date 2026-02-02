import { getAllInstitutes } from '@/lib/institute.service';
import React from 'react'

const page = async () => {

    const institutes = await getAllInstitutes();

  return (
    <div>
      <h1 className="">Institutes</h1>
      <ul>
        {institutes.map((institute) => (
          <li key={institute.id}>{institute.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default page