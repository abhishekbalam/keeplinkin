export FLASK_APP=keeplinkin
export FLASK_ENV=dev
export APP_TOKEN=

export SITE_URL=http://localhost:5000
export SECRET_KEY=

## Development Server
# flask run

## Production Server
gunicorn -w 4 --bind 0.0.0.0:5000 keeplinkin:app