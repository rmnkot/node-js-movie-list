# node-js-movie-list

Application for creating your own lists of movies and series, based on using a third party service http://www.omdbapi.com.

## Create `.env` file with:

- `API_KEY` for `omdbapi`
- `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, for `database`
- `JWT_SECRET_KEY`

## Run:

- migration `db:migrate` to populate tables
- seed db `db:seed:all` to populate initial admin user
