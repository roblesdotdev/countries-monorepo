const apiURL = import.meta.env.VITE_APP_API_URL

if (!apiURL) throw new Error('VITE_APP_API_URL must be set')

async function client(
  endpoint,
  { data, headers: customHeaders, ...customConfig } = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  const url = `${apiURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  return fetch(url, config)
    .then(async response => {
      const { data } = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
    .catch(e => {
      return Promise.reject(`Client error: ${e.message}`)
    })
}

export { client }
