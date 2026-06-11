import { Clapperboard } from 'lucide-react';
import Image from "next/image";

const TitlePage = () => {
  return (
    <div className='relative flex justify-center items-center h-[70vh]'>
      <div className='z-10'>
        <div className='flex justify-center items-center bg-red-500 w-10 h-10 rounded-lg'>
          <Clapperboard className='h-7 w-7' />
        </div>
        <h1>Movie Matrix</h1>
        <p>Search the trending movies</p>
      </div>
      <div className='opacity-60 absolute inset-0'>
        <Image
          src="/images/wallpaper.jpg"
          alt="Wallpaper"
          fill
          className="object-cover"
          loading="eager"
        />
      </div>
    </div>
  )
}

export default TitlePage