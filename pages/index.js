import Head from "next/head"
import {getYoutubeVids} from '../lib/videos';
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Home({vidData}) {

  const cards = vidData.map((items)=>{
    const id = items.id;
    const channelTitle = items.channelTitle;
    const title = items.title;
    const thumbnail = items.thumbnail;
    const channelId = items.channelId;
    const description = items.description;
    const publishedAt = items.publishedAt;
    const viewCount = items.viewCount;
    const likeCount = items.likeCount;
    const commentCount = items.commentCount;
    const channelThumbnail = items.channelThumbnail;

    return (
      <Link href={`/${id}`} key={id} className="">
        <img className="w-full" src={thumbnail}></img>
        <div className="flex gap-3 mx-3">

          <img src = {channelThumbnail} alt={channelTitle} className="rounded-full w-8 h-8" height={8} width={8}></img>

          <div className="w-full">

            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium lg:text-[0.9rem] xl:text-base w-3/4 line-clamp-2 text-ellipsis">{title}</span>
              <button className="min-w-8 min-h-8 flex"><Image  className="min-w-4 min-h-4" src='/images/options.svg' alt='options' width={16} height={16}/></button>
            </div>
            
            <div className="flex text-[0.5rem] lg:text-[0.6rem] xl:text-xs sm:flex-col  text-[#aaaaaa] mt-2">
              {channelTitle}<span className="sm:hidden">&nbsp;&nbsp;&#9900;&nbsp;&nbsp;</span> 
              <div className="lg:mt-1">
                {viewCount} views&nbsp;&nbsp;&#9900;&nbsp;&nbsp;{publishedAt}
              </div>
            </div>
          </div>

        </div>      
      </Link>
    )
  })
  
  return (
    <Layout>

      <Head>
        <title>Youtube</title>
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 sm:max-w-3xl lg:max-w-3xl xl:max-w-5xl m-auto">
        {cards}
      </div>

    </Layout>
  )
}

export async function getStaticProps(){

  const vidData = await getYoutubeVids();
  return {
    props:{
      vidData
    }
  }
}
