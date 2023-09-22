import React from 'react'

const Heading = ({title, subtitle, small}) => {
  return (
    <div className='py-2'>
        <div className={` ${small ? 'text-normal font-medium' : 'text-3xl font-bold'}  tracking-tighter`}>
            {title}
        </div>
        <div className={` ${small ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
            {subtitle}
        </div>
    </div>
  )
}

export default Heading