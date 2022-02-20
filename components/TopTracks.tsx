function TopTracks(props: any) {
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

export default TopTracks;