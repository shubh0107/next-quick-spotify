import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify.js';

export default function Home() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topTracks1, setTopTracks1] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks({ time_range: 'short_term', }).then(resp => {
        console.log('shubham playliosts:: ', resp)
        setTopTracks1(resp.body.items)
      }).catch(err => console.log(error))
    }

  }, [session])


  if (session) {
    console.log('session: ', session)
    return <div className="flex min-h-screen flex-col items-center justify-center py-2">

      <div className="grid grid-cols-5 lg:grid-cols-10 mb-5">
        {topTracks1.map(track => {
          const { id, name, album } = track;
          const { images } = album;
          return (
            <div
              // layout
              key={id}
              // initial={{ opacity: 1 }}
              // className="z-0 transform ease-in-out transition hover:scale-150 hover:z-20 hover:shadow-lg"
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

            >
              <img src={images[0].url} alt="song-img" />
            </div>
          )
        })}
      </div>


      <h1>User logged in !!</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  } else {
    return <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>User NOT logged in !!</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  }
}
