import React from 'react'
import { addInstitute } from '@/app/actions/institute.actions';
const page = () => {
  return (
      <form action={addInstitute} >
        <input type="text"  name="name" placeholder="Institute Name" required />
        <input type="text"  name="location" placeholder="Location" required />
        <button type="submit">Add Institute</button>
      </form>

  )
}

export default page