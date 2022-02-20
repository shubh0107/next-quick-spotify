import { signIn, useSession } from 'next-auth/react'
import TopTracksContainer from "../components/TopTracksContainer";


export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <TopTracksContainer session={session} />
  }

  return <div className="flex flex-col min-h-screen">
    <h1>User NOT logged in !!</h1>
    <button onClick={() => signIn()}>Sign in</button>
  </div>
}