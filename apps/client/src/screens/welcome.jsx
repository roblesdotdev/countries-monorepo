import { ButtonLink } from '@/components/lib'

export default function WelcomeScreen() {
  return (
    <div className="hero">
      <div className="hero-header">
        <h1 style={{ '--text': "'Countries'" }} className="title">
          <span aria-hidden={true} style={{ '--i': 0 }} />
          <span aria-hidden={true} style={{ '--i': 1 }} />
        </h1>
        <p className="fg-muted">
          Here you will find detailed information about various countries around
          the world.
        </p>
      </div>
      <div className="hero-cta">
        <ButtonLink to="/dash">Explore</ButtonLink>
      </div>
    </div>
  )
}
