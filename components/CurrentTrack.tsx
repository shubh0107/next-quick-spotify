import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef } from "react";
import useSpotify from '../hooks/useSpotify';



export default function CurrentTrack(props: any) {
  const { currentTrack } = props;
  const currentAudio: any = useRef(null);

  const { data: session } = useSession()
  const accessToken = session?.user.accessToken;
  const CancelToken = axios.CancelToken;
  const source = useMemo(() => CancelToken.source(), []);

  const spotifyApi = useSpotify();



  // useEffect(() => {
  //   if (currentTrack) {
  //     let { id, preview_url } = currentTrack;

  //     if (preview_url) {
  //       currentAudio.current = new Audio(preview_url);
  //       currentAudio.current.play();
  //     } else {
  //       console.log('shubham NO PREVIEW URL');
  //       // spotifyApi.getTracks({
  //       //   id:
  //       // })
  //     }
  //   }

  //   return () => {
  //     if (currentAudio.current) currentAudio.current.pause()
  //   }
  // }, [currentTrack])


  // useEffect(() => {
  //   let { id, preview_url } = currentTrack;

  //   function playAudio(url: string) {
  //     if (url) {
  //       currentAudio.current = new Audio(url);
  //       // currentAudio.current.play();
  //     } else {
  //       axios.get(`https://api.spotify.com/v1/tracks/${id}?market=from_token`, {
  //         headers: { 'Authorization': `Bearer ${accessToken}` },
  //         cancelToken: source.token
  //       }).then(({ data }) => {
  //         console.log('playng audio: ', data);
  //         if (data.preview_url) {
  //           playAudio(data.preview_url);
  //         }
  //       }).catch(err => {
  //         if (axios.isCancel(err)) {
  //           console.log('Request canceled', err.message);
  //         } else {
  //           console.log('error: ', err);
  //         }
  //       })
  //     }

  //   }

  //   if (currentAudio.current) {
  //     // currentAudio.current.pause();
  //   }

  //   playAudio(preview_url);

  //   return () => {
  //     source.cancel('New track received.');

  //     if (currentAudio.current) {
  //       // currentAudio.current.pause();
  //     }
  //   }
  // }, [currentTrack, accessToken, source]);


  if (currentTrack) {
    const { id, name, album, artists } = currentTrack;
    const { images } = album;
    const artistName = artists.reduce(((completeName: string, artist: any, index: Number) => {
      if (index === artists.length - 1 && artists.length > 1) {
        completeName += ' & ';
      } else {
        completeName += index !== 0 ? ', ' : '';
      }
      return completeName += ` ${artist.name}`
    }), '');
    return (
      <div
        // className="sticky float-right top-1/4 lg:top-32 md:m-2 lg:m-10 lg:my-0"
        className="sticky top-10 aspect-square"
      // initial={{ x: 500, opacity: 0 }}
      // animate={{ x: 0, opacity: 1 }}
      // exit={{ opacity: 0 }}
      // key={`current-track-main-div-${id}`}
      // layoutId={`selected-track-parent-${id}`}

      >
        <div className="z-10 w-full"
          key={`small-preview-${id}`}
        // layoutId={`selected-track-image-${id}`}
        // animate={{ opacity: selectedTrack ? 0 : 1 }}
        >
          <img className="max-h-[530px] max-w-[530px]" src={images[0].url} alt={name} />
        </div>
        <div className="mt-2 overflow-hidden text-white">
          <div
          // initial={{ height: 0, y: -60 }}
          // animate={{
          //   height: 'auto',
          //   y: 0,
          //   transition: {
          //     delay: 0.3,
          //     duration: 0.2,
          //   }
          // }}
          >
            <h2
              className="inline-flex text-2xl leading-tight"
            // layoutId={`selected-track-name-${id}`}
            >
              {name}
            </h2>
            <br />
            <h3
              className="inline-flex text-sm italic"
            // layoutId={`selected-track-artist-name-${id}`}
            // transition={{
            //   delay: 0.6
            // }}
            >
              {artistName}
            </h3>
          </div>
        </div>
      </div>
    )
  }

  return <div className="flex items-center justify-center w-[530px] h-[530px] text-white text-center">
    <p className="text-2xl text-white">Hover over an album art <br /> to know more !</p>
  </div>;
}