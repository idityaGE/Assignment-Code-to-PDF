import React from 'react'
import Input_Data from '@/components/Input-data'
import Preview_data from '@/components/Preview-data'

const page = () => {
  return (
    <div className='w-full p-4 md:p-8'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='md:col-span-1'>
          <Input_Data />
        </div>
        <div className='md:col-span-2'>
          <Preview_data />
        </div>
      </div>
    </div>
  )
}

export default page