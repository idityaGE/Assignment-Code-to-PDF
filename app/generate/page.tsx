import React from 'react'
import Input_Data from '@/components/Input-data'

const page = () => {
  return (
    <div className='w-full p-4 md:p-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Input_Data />
      </div>
    </div>
  )
}

export default page