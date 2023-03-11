Fuil Stack Countries Monorepo with PNPM workspaces.

### Requirements

- Node `>=18`
- Git `>=2.39.2`
- PNPM `>=7.29.1`

### Worspaces

- apps/api: backend service
- apps/client: frontend client

### Development

Clone this repo.

```
git clone https://github.com/roblesdotdev/countries-monorepo \
&& cd countries-monorepo
```

Install dependencies

```
pnpm install
```

Create environment file

```
mv apps/api/.env.sample apps/api/.env \
&& mv apps/client/.env.sample apps/client/.env
```

Run the full monorepo with:

```
pnpm start
```

### Env Variables

**API**

- `APP_PORT`: server port. Default "3001".
- `DB_DIALECT`: database dialect("sqlite", "postgres"). Default "sqlite".
- `DB_URL`: database URL. Default "./db.sqlite".
- `DB_SYNC`: sync database flag(1, 0). Default 1.

### Docs

- [API](https://github.com/roblesdotdev/countries-monorepo/blob/main/docs/api.http)
