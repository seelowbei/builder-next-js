import { Button } from 'antd'
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

      <main className="bg-gray-500 flex flex-col justify-center w-screen h-screen items-center">
        <h1 className="title">
          Next JS React Template
        </h1>

        <Button type="primary">Test</Button>
      </main>

      <footer />

      <style jsx>{`
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
      `}
      </style>

      <style
        global
        jsx
      >{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  )
}
