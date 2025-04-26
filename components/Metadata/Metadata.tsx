'use client'
export const metatext = {
  title: 'Loophabit',
}

export const metadata = {
  title: metatext.title,
  description: 'Создано в учебных целях',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs14', 'next14', 'pwa', 'next-pwa'],
  themeColor: [{media: '(prefers-color-scheme: dark)', color: '#ffffff'}],
  authors: [
    {name: 'Koderhun'},
    {
      name: 'Koderhun',
      url: 'https://www.github.com/koderhun/',
    },
  ],
  logoTitle: metatext.title,
  picturePath: '/images/',
}

export const Metadata = () => {
  return (
    <>
      <title>{metadata.title}</title>

      <link
        rel="icon"
        href={`${metadata.picturePath}favicon.svg`}
        type="image/svg"
      />
      <link
        rel="shortcut icon"
        href={`${metadata.picturePath}favicon.ico`}
      />

      {/* android */}
      <link
        rel="manifest"
        href={metadata.manifest}
      />

      {/* apple */}
      <meta
        name="application-name"
        content={metadata.title}
      />
      <meta
        name="mobile-web-app-title"
        content={metadata.title}
      />
      <meta
        name="mobile-web-app-capable"
        content="yes"
      />
      <meta
        name="mobile-web-app-status-bar-style"
        content="black"
      />

      <link
        rel="apple-touch-icon"
        href={`${metadata.picturePath}apple-touch-icon-180x180.png`}
        sizes="180x180"
      />
      <link
        rel="mask-icon"
        href={`${metadata.picturePath}maskable-icon-512x512.png`}
        color="#ffffff"
      />

      {/* SEO  */}
      <meta
        name="description"
        content={metadata.description}
      />
      <meta
        name="keywords"
        content={metadata.keywords.join(', ')}
      />
      {metadata.themeColor.map(({media, color}, index) => (
        <meta
          key={index}
          name="theme-color"
          media={media}
          content={color}
        />
      ))}
      {metadata.authors.map(({name, url}, index) => (
        <meta
          key={index}
          name="author"
          content={name}
          {...(url && {href: url})}
        />
      ))}
    </>
  )
}
