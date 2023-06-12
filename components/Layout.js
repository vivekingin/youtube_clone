import Navbar from "../pages/components/Navbar"
import Sidebar from "../pages/components/Sidebar"
import Head from "next/head"

export default function Layout( {children, vidPage} ){
    return (
        <>
        <Head>
            <link rel="icon" href="/images/yt_logo.svg" type="image/icon type"/>
        </Head>
            <Navbar isLoggedIn={true} notifications={0}/>

            <div className="lg:flex lg:justify-between">
                {!vidPage && <Sidebar />}
                {children}
            </div>
            
        </>
    )
}