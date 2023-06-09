import Link from 'next/link';
import SidebarData from '../../lib/assests';
import Image from 'next/image';

export default function Sidebar(){
    const data = SidebarData.map((items)=>{
        return (
                <Link href ='/' key={items.name} className='flex items-center gap-1 bg-[#272727] lg:bg-inherit lg:hover:bg-[#272727] min-w-fit rounded py-1 px-3 text-xs lg:text-base lg:gap-5 lg:py-3'>
                    <Image className='w-4 h-4 lg:w-5 lg:h-5' src={items.url} width={24} height={24} alt={items.name}/>
                    <span >{items.name}</span>
                </Link>
        );
    })
    return(
        <div className='flex lg:flex-col lg:w-48 lg:h-[90vh] gap-2 overflow-scroll py-3 px-3 lg:sticky lg:top-20'>
            {data}
        </div>
    )
}