import { format } from "numerable";
import {timeDifferenceCalculator} from 'time-difference-calculator';

export async function getYoutubeVidsFromApi(){
    const url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&key=AIzaSyAMR-A72aWRPvsqXIipeUAXYo91s_SgjsI'
    
    const res = await fetch(url);

    return res.json();

  }

  export async function getYoutubeVids(){

    let data = await getYoutubeVidsFromApi();
    data = data.items;

    let neededData = [];

    for (let i=0; i<data.length;i++){
      const id = data[i].id;
      const channelTitle = data[i].snippet.channelTitle;
      const title = data[i].snippet.title;
      const thumbnail = data[i].snippet.thumbnails.standard.url;
      const publishedAt = data[i].snippet.publishedAt;
      let viewCount = data[i].statistics.viewCount;
      const channelId = data[i].snippet.channelId;

      const channelData = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyAMR-A72aWRPvsqXIipeUAXYo91s_SgjsI`);
      const channelDataJson = await channelData.json();
      const channelThumbnail = channelDataJson.items[0].snippet.thumbnails.default.url;

      viewCount =  format(viewCount, '0.0 a');
      const timeDifference = timeDifferenceCalculator(publishedAt)
      neededData=[...neededData,
        {
          'id':id,
          'channelTitle':channelTitle,
          'title':title,
          'thumbnail':thumbnail,
          'publishedAt': timeDifference,
          'viewCount':viewCount,
          'channelId':channelId,
          'channelThumbnail':channelThumbnail
        }
      ]
    }

    return neededData;

  }

  export async function getYoutubeVidsID(){
    const vids = await getYoutubeVidsFromApi();
    const res = vids.items;
    return res.map((items)=>{
        return {
            params: {
                id: items.id,
            }
        }
    })
}

  export async function getYoutubeVidsById(id){
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyAMR-A72aWRPvsqXIipeUAXYo91s_SgjsI`
    
    const res = await fetch(url);

    return res.json();
  }
