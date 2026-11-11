import Link from 'next/link'

const siteBrand = {
  name: '대한아동·학교작업치료학회',
  englishName: 'Korean Society for Occupational Therapy in Child and School',
  logoSrc: null as string | null,
}

export default function SiteBrand() {
  return (
    <Link href="/" className="site-brand" aria-label={`${siteBrand.name} 홈`} data-brand-slot="brand-logo">
      {siteBrand.logoSrc ? (
        <img src={siteBrand.logoSrc} alt={siteBrand.name} />
      ) : (
        <span className="site-brand__type">
          <strong>{siteBrand.name}</strong>
          <span>{siteBrand.englishName}</span>
        </span>
      )}
    </Link>
  )
}
