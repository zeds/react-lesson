# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# danang-alley.com
DATABASE_URL="mysql://root:!cCG1tMZ0L:9@localhost:3306/nestjs_jwt?schema=public"

# localhost
# DATABASE_URL="mysql://root:gomi3939@localhost:3306/nestjs_jwt?schema=public"

JWT_SECRET = 'secretKey'
JWT_EXPIRES_IN = '1h'
SERVER_URL = 'https://danang-alley.com'

BASE_URL='http://localhost:3443'
APP_PORT='3443'
DATABASE_HOST='localhost'
DATABASE_PORT='3306'
DATABASE_USERNAME='root'
DATABASE_PASSWORD='!cCG1tMZ0L:9'
JWT_SECRET_KEY='75C873FFB792D87F6B109E09DF609F83AACDA0EEB0FBFD4D587347C791E5192C'
JWT_REFRESH_KEY='E53DE277E53CA1F253DC51DC2E7D0FEE6332C502E2DA938D5E0F48D5DC8F5CFB'
ENCRYPT_SECRET_KEY='6efc98d3061e86bf132f6231bce685b03c54ddc38c5802222f52901c95a8e554'
ENCRYPT_IV='346be68b2e11e28f763eef4fd4c6f7b5'
API_TOKEN = '1939b7aaaf01ef29bc0f61beab0ffcc8cc8b09c904acf116bfe73f8b6be9315a7fc0e228e94f1a3fab422b6d4850dc3c0a6faa07fdd8d6805bcc3c946089dc1f23c7648259a4cbe12576e42a1fe6a514b1956d1cf663c410ee61df47a459e9f9e9bc9842b266b7b2ce96b203827ad8ea0e2dd50fd536f5f1fc863e3e3e81fc2f'
STRAPI_URL = 'https://lusty.asia:1443'

