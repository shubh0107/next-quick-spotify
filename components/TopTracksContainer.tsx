import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import CurrentTrack from "./CurrentTrack";
import TopTracks from "./TopTracks";

export default function TopTracksContainer(props: any) {
  const { session } = props;
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
        if (results1?.body?.items) setTopTracksShortTerm(results1.body.items);
        if (results2?.body?.items) setTopTracksMediumTerm(results2.body.items);
        if (results3?.body?.items) setTopTracksLongTerm(results3.body.items);
      })

    }

  }, [session])


  if (session) {
    return <div className="flex justify-between w-full min-h-screen p-10 bg-black gap-x-20">
      <div className="flex flex-col w-2/3 h-full gap-y-10">
        <TopTracks tracks={topTracksShortTerm} setCurrentTrack={setCurrentTrack} />
        <TopTracks tracks={topTracksMediumTerm} setCurrentTrack={setCurrentTrack} />
        <TopTracks tracks={topTracksLongTerm} setCurrentTrack={setCurrentTrack} />
        <h1>User logged in !!</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      <div className='w-1/3'>
        <CurrentTrack currentTrack={currentTrack} />
      </div>
    </div>
  }

  return null
}