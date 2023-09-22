import React, { useCallback } from 'react'

const CategoryInput = ({
    onClick,
    selected,
    label,

}) => {

  const selectCategory = useCallback(()=>{
    if(onClick) onClick(label)
  },[onClick])
  return (
    <div 
    onClick={selectCategory}
    className={`
    flex 
    items-center 
    justify-center
    px-3
    ${onClick && 'py-2'}
    border-2
    transition
    cursor-pointer
    rounded-full
    gap-2
    hover:text-neutral-800
   \
    ${selected ? 'border-teal-600' : 'border-neutral-300'}
    ${selected ? 'text-teal-600' : 'text-neutral-500'}
    
    `}>
        {/* <Icon size={18} /> */}
        <div className={`text-[10px] 
            ${selected ? 'font-bold' : 'font-medium'}
            `}>
            {label}
        </div>
    </div>
  )
}

export default CategoryInput