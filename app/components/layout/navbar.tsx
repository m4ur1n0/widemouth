import Link from 'next/link'

//  no props just constant

const Navbar = () => {
  return (
    <nav className='w-full flex justify-between items-center px-12 py-3  text-[1.2rem] absolute'>

        <span className='underline'>
            <Link href={"/merch"}>merch</Link>
        </span>

        <span className='underline'>
            <Link href={"/about"}>about</Link>
        </span>

        <span className='underline'>
            <Link href={"/press"}>press</Link>
        </span>

        <div className='w-[30%] px-1 py-1 flex justify-center items-center'>
            <Link href="/">
                <h1 className='font-fell text-[4.2rem] scale-y-130'>
                    WIDEMOUTH
                </h1>
            </Link>
        </div>

        <span className='underline'>
            <Link href={"/music"}>music</Link>
        </span>

        <span className='underline'>
            <Link href={"/shows"}>shows</Link>
        </span>

        <span className='underline'>
            <Link href={"/contact"}>contact</Link>
        </span>


        
    </nav>
  )
}

export default Navbar