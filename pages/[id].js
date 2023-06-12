import Layout from '@/components/Layout';
import {getYoutubeVidsID, getYoutubeVidsById} from '../lib/videos';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { format } from "numerable";
import {timeDifferenceCalculator} from 'time-difference-calculator';
import { Cards } from '.';
import { getYoutubeVids } from '../lib/videos';

export default function Page({data, channelThumbnail, vidData}){
    console.log(data);
    const [isDescExpanded, setIsDescExpanded] = useState(false);
    const handleDescriptionView = () =>{
        setIsDescExpanded(!isDescExpanded);
    }

    return (
        <Layout vidPage={true}>
            <Head>
                <title>{data[0].snippet.title}</title>
            </Head>

            <div className='md:flex gap-3 md:max-w-screen-md lg:min-w-[80%] m-auto'>

                <div className='md:max-w-lg lg:min-w-[70%]'>
                    <iframe className='w-full aspect-video ' src={`https://www.youtube.com/embed/${data[0].id}`}></iframe>

                    <div className='m-1 flex flex-col gap-3 p-3'>
                        <div>{data[0].snippet.title}</div>

                        <div className='text-xs text-[#aaaaaa]'>
                            <span>{format(data[0].statistics.viewCount, '0.0 a')} views</span>
                            <span>&nbsp;&nbsp;&#9900;&nbsp;&nbsp;</span>
                            <span>{timeDifferenceCalculator(data[0].snippet.publishedAt)}</span>
                        </div>

                        <div className='flex justify-between flex-wrap gap-3'>

                            <div className='flex justify-between w-full '>

                                <div className='flex items-center gap-3'>
                                    <img src={channelThumbnail} width={64} className='rounded-full w-8 h-8' alt={data[0].snippet.channelTitle}></img>
                                    <div className='text-sm'>{data[0].snippet.channelTitle}</div>
                                </div>

                                <button className='text-sm py-1 px-3 bg-white text-black rounded-3xl'>Subscribe</button>

                            </div>

                            <div className='flex gap-2 items-center overflow-scroll text-[0.6rem] text-semibold'>

                                <div className='flex  items-center gap-1 py-1 px-1  bg-[#404040] rounded-xl min-w-[6rem]'>
                                    <button className='px-1 flex gap-1 items-center border-r-2 border-[#aaaaaa]'>
                                        <Image src='/images/video_page_icons/like.svg' alt='Like button' width={16} height={16}/>
                                        <span>{format(data[0].statistics.likeCount, '0.0 a')}&nbsp;</span>
                                    </button>
                                    <button className='px-1 flex gap-1 items-center '>
                                        <Image src='/images/video_page_icons/dislike.svg' alt='Dislike Button' width={16} height={16}/>
                                    </button>
                                </div>
                                <button className='flex gap-1 items-center justify-center py-1 px-2  bg-[#404040] rounded-xl min-w-[5rem]'>
                                    <Image src='/images/video_page_icons/share.svg' alt='Share Button' width={16} height={16}/>
                                    <span>Share</span>
                                </button>
                                <button className='flex gap-1 items-center justify-center py-1 px-2  bg-[#404040] rounded-xl min-w-[5rem]'>
                                    <Image src='/images/video_page_icons/remix.svg' alt='Share Button' width={16} height={16}/>
                                    <span>Remix</span>
                                </button>
                                <button className='flex gap-1 items-center justify-center py-1 px-2  bg-[#404040] rounded-xl min-w-[5rem]'>
                                    <Image src='/images/video_page_icons/download.svg' alt='Share Button' width={16} height={16}/>
                                    <span>Download</span>
                                </button>
                                <button className='flex gap-1 items-center justify-center py-1 px-2  bg-[#404040] rounded-xl min-w-[5rem]'>
                                    <Image src='/images/video_page_icons/clip.svg' alt='Share Button' width={16} height={16}/>
                                    <span>Clip</span>
                                </button>
                                <button className='flex gap-1 items-center justify-center py-1 px-2  bg-[#404040] rounded-xl min-w-[5rem]'>
                                    <Image src='/images/video_page_icons/save.svg' alt='Share Button' width={16} height={16}/>
                                    <span>Save</span>
                                </button>

                            </div>

                        </div>

                        <div className='bg-[#404040] rounded p-3'>
                            <span className={`${isDescExpanded ? 'block' : 'line-clamp-1'} text-sm`}>{data[0].snippet.description}</span>
                            {!isDescExpanded && <button onClick={handleDescriptionView} className='text-xs text-[#aaaaaa]'>Show more</button>}
                            {isDescExpanded && <button onClick={handleDescriptionView} className='text-xs text-[#aaaaaa]'>Show less</button>}
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1">
                    {Cards(vidData,"md:flex gap-1","w-full md:w-32","hidden")}
                </div>

            </div>
            
        </Layout>
    )
}

export async function getStaticPaths(){
    const paths = await getYoutubeVidsID();

    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}){
    let data = await getYoutubeVidsById(params.id);
    let vidData = await getYoutubeVids();

    data = data.items

    const channelData = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data[0].snippet.channelId}&key=AIzaSyAMR-A72aWRPvsqXIipeUAXYo91s_SgjsI`);
    const channelDataJson = await channelData.json();
    const channelThumbnail = channelDataJson.items[0].snippet.thumbnails.default.url;

    return {
        props:{
            data,
            channelThumbnail,
            vidData
        }
    }
}