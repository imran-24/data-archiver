import React from 'react'



const MenuItem = ({
    onclick, title
}) => {
  return (
    <div 
    onClick={onclick}
    className='px-4 py-2 cursor-pointer rounded-xl transition text-xs font-bold '>
        {title}
    </div>
  )
}

export default MenuItem