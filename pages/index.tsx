import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify.js';

export default function Home() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topTracksShortTerm, setTopTracksShortTerm] = useState([])
  const [topTracksMediumTerm, setTopTracksMediumTerm] = useState([])
  const [topTracksLongTerm, setTopTracksLongTerm] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      const tracks1 = spotifyApi.getMyTopTracks({ time_range: 'short_term', limit: 50, offset: 0 })
      const tracks2 = spotifyApi.getMyTopTracks({ time_range: 'medium_term', limit: 50, offset: 0 })
      const tracks3 = spotifyApi.getMyTopTracks({ time_range: 'long_term', limit: 50, offset: 0 })

      Promise.all([tracks1, tracks2, tracks3]).then(result => {
        const [results1, results2, results3] = result;
        if (results1?.body?.items) setTopTracksShortTerm(results1?.body?.items);
        if (results2?.body?.items) setTopTracksMediumTerm(results2?.body?.items);
        if (results3?.body?.items) setTopTracksLongTerm(results3?.body?.items);
      })

    }

  }, [session])


  if (session) {
    console.log('session: ', session)
    return <div className="flex w-full min-h-screen bg-black">
      <div className="flex flex-col w-1/2 h-full p-20 gap-y-10">
        <TopTracks tracks={topTracksShortTerm} setCurrentTrack={setCurrentTrack} />
        <TopTracks tracks={topTracksMediumTerm} setCurrentTrack={setCurrentTrack} />
        <TopTracks tracks={topTracksLongTerm} setCurrentTrack={setCurrentTrack} />
        <h1>User logged in !!</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      <div>
        <CurrentTrack currentTrack={currentTrack} />
      </div>
    </div>
  } else {
    return <div className="flex flex-col min-h-screen">
      <h1>User NOT logged in !!</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  }
}


const TopTracks = (props: any) => {
  const { tracks, setCurrentTrack } = props;

  if (tracks && tracks.length > 0) {
    return <div className="grid grid-cols-10">
      {tracks.map((track: any) => {
        const { id, name, album } = track;
        const { images } = album;
        return (
          <div
            // layout
            key={id}
            // initial={{ opacity: 1 }}
            // className="z-0 transition ease-in-out transform hover:scale-150 hover:z-20 hover:shadow-lg"
            className="z-0 cursor-pointer"
            // style={{ opacity: currentTrack ? 1 : 0 }}
            // onMouseEnter={e => playAudio(track)}
            // onMouseLeave={e => stopAudio(track)}
            // whileHover={{ scale: 1.5, zIndex: 2 }}
            // onClick={() => setSelectedTrack(track)}
            // onClick={() => dispatch({
            //   type: SPOTIFY_ACTIONS.setSelectedTrack,
            //   payload: track
            // })}


            onMouseOver={e => setCurrentTrack(track)}

          >
            <img src={images[0].url} alt="song-img" />
          </div>
        )
      })}
    </div>
  }

  return null
}



const CurrentTrack = props => {
  const { currentTrack } = props;


  if (currentTrack) {
    const { id, name, album, artists } = currentTrack;
    const { images } = album;
    const artistName = artists.reduce(((completeName, artist, index) => {
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
        className="sticky mt-8 top-36"
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
          <img src={images[0].url} alt={name} />
        </div>
        <div className="mt-2 overflow-hidden">
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

  return null;
}