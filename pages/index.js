import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>React App</title>

        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>

      <main className="bg-blue-100 flex flex-col justify-center w-screen h-screen items-center">
        <h1 className="text-3xl">
          Next JS React Template
        </h1>
      </main>

      <footer />
    </div>
  )
}
