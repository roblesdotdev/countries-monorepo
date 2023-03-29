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
