import os
from flask import Flask, render_template, request, redirect, jsonify
import shortener
import redis
from scout_apm.flask import ScoutApm
import validators
import redisdl

app = Flask(__name__)

ScoutApm(app)

db=redis.from_url(os.environ['REDISCLOUD_URL'])
# db=redis.Redis(host='localhost', port=6379, password='')

@app.route('/')	
def main():
	return render_template('index.html')

@app.route('/checkcustom/<url>')
def checkcustom(url):
	response=db.hexists("custom", url)
	print(type(response))
	if(response):
		return "1"
	else:
		return "0"


@app.route('/shorten/', methods=['POST','GET'])
def shorten():
	if request.method == 'POST':
		data=request.json
		url=data['url']
		type=data['type']
		surl=data['surl']
		short_url = "YoYoMaMa"
		if(type=="default"):
			short_url=shortener.default(url)
		elif(type=="custom"):
			if(surl!=""):
				short_url=shortener.custom(url,surl)
			else:
				return "Enter short url"
		elif(type=="semantic"):
			short_url=shortener.semantic(url)
		else:
			return "Wrong Type"
		# short_url = 'shortened url: %s \n ' % short_url
		# long_url = 'Orginal url: %s \n' % url
		print(url+ '<br>' + short_url);
		return jsonify(
			url=url,
			surl=short_url
		)
	else:
		url=request.args.get("url")
		url=url.replace('"', '')
		valid=validators.url(url);
		if(valid!=True):
			return "Invalid URL!"
		short_url=shortener.default(url)
		print(short_url)
		response='https://keeplink.in/'+short_url
		return response

@app.route('/<url>')	
def resolve(url):
	long_url=shortener.decode(url)
	if(long_url):
		long_url=long_url.replace('"','')
		if ("http://" not in long_url):
			if ("https://" not in long_url):
				long_url="http://"+long_url
		print(long_url)
		return redirect(long_url)
	else:
		return "Wrong Link!"

if __name__ == '__main__':
	app.jinja_env.auto_reload = True
	app.config['TEMPLATES_AUTO_RELOAD'] = True
	app.config['SCOUT_NAME']    = "Keeplinkin"
	app.run(debug=True)