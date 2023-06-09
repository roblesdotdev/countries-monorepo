export function FallbackCountries() {
  return (
    <ul className="cards">
      {Array.from({ length: 9 }, (_, idx) => idx + 1).map(key => (
        <li key={key} className="card pulse">
          <div
            className="w-full aspect-video mb-2"
            style={{
              height: '220px',
              background: 'rgba(255, 255, 255, 0.04)',
            }}
          />
          <h1
            className="h-5 mb-2 bg-2st"
            style={{
              width: '75%',
              borderRadius: '16px',
            }}
          ></h1>
          <h2
            className="h-4 bg-2st"
            style={{ width: '50%', borderRadius: '16px' }}
          ></h2>
        </li>
      ))}
    </ul>
  )
}

export function FallbackError({ error }) {
  return (
    <div className="flex items-center justify-center max-w">
      <div className="w-full bg-2st p-8">
        <p>{error}</p>
      </div>
    </div>
  )
}

export function FallbackDetail() {
  return (
    <div className="pulse fallback-detail">
      <div className="w-full">
        <div
          className="bg-2st w-full h-8 aspect-video"
          style={{ height: '220px' }}
        />
        <div className="h-6 bg-2st mt-4" style={{ width: '75%' }} />
        <div className="h-6 bg-2st mt-4" style={{ width: '50%' }} />
      </div>
      <div className="w-full">
        <div className="h-6 bg-2st mt-4" style={{ width: '75%' }} />
        <div className="h-6 bg-2st mt-4" style={{ width: '60%' }} />
        <div className="h-6 bg-2st mt-4" style={{ width: '50%' }} />
      </div>
    </div>
  )
}
