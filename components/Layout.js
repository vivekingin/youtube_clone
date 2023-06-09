import Navbar from "../pages/components/Navbar"
import Sidebar from "../pages/components/Sidebar"

export default function Layout( {children} ){
    return (
        <>
            <Navbar isLoggedIn={true} notifications={0}/>

            <div className="lg:flex lg:justify-between">
                <Sidebar />
                {children}
            </div>
            
        </>
    )
}