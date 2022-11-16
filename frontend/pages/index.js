import Image from "next/image";
import Head from 'next/head'
import Hero from './../assets/hero.png'
import Button from './../components/Button'
import classes from '../styles/pages/Home.module.css'
import { useRouter } from 'next/router'
import { isLoggedIn } from "../services/auth";

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Kuizu</title>
        <meta name="description" content="Online Quiz Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.container}>
        <div className={classes.left}>
          <h1>Kuizu</h1>
          <h4>Online Testing Portal</h4>
          { isLoggedIn() ? (
            <Button onClick={() => router.push('/environmentCheck')} label="Environment Check" />
          ) : (
            <Button onClick={() => router.push('/login')} label="Login" />
          )}
        </div>
        <div className={classes.right}>
          <Image src={Hero} />
        </div>
      </div>
    </>
  )
}
