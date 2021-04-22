import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import { Link } from '@components/link'

export async function getStaticProps({
  params,
}) {
  const urlPath = '/' + (params?.path?.join('/') || '')
  const page = await resolveBuilderContent('page', { urlPath })

  return {
    props: {
      page,
    }
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function Path({
  page,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  const { title, description, image } = page?.data || {}

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title,
          description,
          images: [
            {
              url: image,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
      />
      <BuilderComponent renderLink={Link} model="page" content={page} />
    </>
  )
}
