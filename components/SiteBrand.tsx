import Link from 'next/link'

const siteBrand = {
  name: '대한아동학교작업치료학회',
  logoSrc: null as string | null,
}

export default function SiteBrand() {
  return (
    <Link href="/" className="site-brand" aria-label={`${siteBrand.name} 홈`} data-brand-slot="brand-logo">
      {siteBrand.logoSrc ? <img src={siteBrand.logoSrc} alt={siteBrand.name} /> : siteBrand.name}
    </Link>
  )
}
