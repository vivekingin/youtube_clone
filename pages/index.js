import Head from "next/head"
import Navbar from "./components/Navbar"

export default function Home() {
  return (
    <>
    <Head>
      <title>Youtube</title>
    </Head>
    <Navbar isLoggedIn={true} notifications={0}/>
    </>
  )
}
