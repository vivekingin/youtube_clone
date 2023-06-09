import {getYoutubeVidsID, getYoutubeVidsById} from '../lib/videos';


export default function Page({data}){
    console.log(data);
    return (
        <>
            This page is yet to be built! Stay tuned!
        </>
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
    const data = await getYoutubeVidsById(params.id);

    return {
        props:{
            data
        }
    }
}