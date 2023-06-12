import Image from "next/image"
import Link from "next/link";

export default function Navbar({isLoggedIn, notifications}){
    const profileurl = isLoggedIn ? '/images/profile.jpg' : '/images/user.svg';
    return (
        <div className="flex justify-between items-center py-1 lg:py-3 px-3 lg:px-5 sticky top-0 bg-black">
            <div className="flex items-center gap-1">
                <Link href='/'><Image className="" src="/images/yt_logo.svg" alt="YT logo" width={42} height={42}/></Link>
            </div>
            <form className="hidden border-[1px] border-[#303030] rounded-full lg:flex items-center overflow-hidden w-1/2">
                <input type="text" placeholder="Search" className=" w-full bg-inherit text-white p-1 px-3 focus:outline-none placeholder:text-[#303030]"/>
                <button className="hidden px-2"><Image src="/images/x.svg" alt="Clear" width={24} height={24} /></button>
                <button className="p-2 px-5  bg-[#222222]"><Image src="/images/search.svg" alt="Search" width={24} height={24} /></button>
            </form>
            <div className={`flex lg:${isLoggedIn ? 'flex' : 'hidden' } items-center gap-3`}>
                <button className="rounded-full hover:bg-[#272727] p-1 w-10 h-10 flex justify-center items-center lg:hidden"><Image className="" src="/images/tv_cast.svg" alt="TV cast" width={32} height={32}/></button>
                <button className="hidden rounded-full hover:bg-[#272727] p-1 w-10 h-10  justify-center items-center lg:flex"><Image className="" src="/images/create.svg" alt="Create" width={24} height={24}/></button>
                <button className="relative rounded-full hover:bg-[#272727] p-1 w-10 h-10 flex justify-center items-center">
                    <Image className="" src="/images/notification.svg" alt="Notification" width={24} height={24}/>
                    {notifications ? <span className="absolute top-[5px] left-[20px] rounded-full bg-red-700 w-4 h-4 text-xs">{notifications}</span> : <span className="hidden"></span>}
                </button>
                <button className="rounded-full hover:bg-[#272727] p-1 w-8 h-8 flex justify-center items-center lg:hidden"><Image className="" src="/images/search.svg" alt="Search" width={24} height={24}/></button>
                <Image className="rounded-full w-8 h-8" src={profileurl} height={24} width={24} alt = 'profile'/>
            </div>
            {!isLoggedIn && <div className="hidden lg:flex items-center gap-3">
                <button className="rounded-full hover:bg-[#272727] p-1 w-10 h-10 flex justify-center items-center "><Image className="" src="/images/menu.svg" alt="Settings" width={24} height={24}/></button>
                <button className="hover:bg-[#263850] rounded-full flex items-center py-1 px-5 gap-2 border-[#303030] border-[1px]">
                    <Image className="rounded-full w-8 h-8" src={profileurl} height={8} width={8} alt = 'profile'/>
                    <span className="">Sign In</span>
                </button>
            </div>}
        </div>
    )
}