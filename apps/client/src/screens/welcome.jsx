import { ButtonLink, Title } from '@/components/lib'

export default function WelcomeScreen() {
  return (
    <div className="hero">
      <div className="hero-header">
        <Title text="Countries" />
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
