import { getProviders, signIn } from "next-auth/react";


export default function Login({ providers }: any) {
  return <div className="login">
    <img
      className="login_spot_logo"
      src="https://links.papareact.com/9xl"
      alt=""
    />
    {Object.values(providers).map((provider: any) => (
      <>
        <button
          className="login_loginButton"
          onClick={() => signIn(provider.id, { callbackUrl: "/" })}
        >
          Login with {provider.name}
        </button>
      </>
    ))}
  </div>

}

export async function getServerSideProps() {
  const providers = await getProviders();
  console.log('shubham provers: ', providers)

  return {
    props: {
      providers
    }
  }
}