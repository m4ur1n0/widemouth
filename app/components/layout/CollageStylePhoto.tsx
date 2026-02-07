import Image from 'next/image';
import React from 'react'

type Props = {
    className?: string;
    src: string;
    width?: number;
    height?: number;
}

const CollageStylePhoto = ({className = '', src, width = 400, height = 400}: Props) => {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
        <div className="relative">
            <Image
                src={src}
                alt={"Collage Photo"}
                width={width}
                height={height}
                loading='lazy'
                className='object-cover'
                draggable={false}
            />
            <div className='absolute inset-0 bg-zinc-50/65'/>
        </div>
    </div>
  )
}

export default CollageStylePhoto