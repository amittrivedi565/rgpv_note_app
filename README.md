# university content application


### Create .env

```
# Env (development,production)
NODE_ENV='development'
HOST='127.0.0.1'
PORT=3000

# DB
DB_HOST='127.0.0.1'
DB_USER_NAME='User'
DB_PORT=3306
DB_PSWD='User@125502'
DB_NAME='rgpv_resources_db'
DB_DIALECT='mysql'

# JWT Token
JWT_SECRET_KEY='I LOVE JWTs'
JWT_TOKEN_EXP_TIME='20m'

# AWS S3 BUCKET CONFIG
AWS_REGION = "region-name"
AWS_ACCESS_KEY = "access_key"
AWS_SECRET_KEY  = "secret_key"
AWS_BUCKET_NAME = "your_bucket_name"

```

# TODO_LIST

- custom errors & response
- client ui/ux