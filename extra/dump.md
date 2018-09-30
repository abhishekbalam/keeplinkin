# @app.route('/shorten/<url>/')
# @app.route('/shorten/<url>/<type>')
# @app.route('/shorten/<url>/<type>/<surl>')
# def shorten(url, type="default", surl=""):
# 	short_url = "YoYoMaMa"

# 	if(type=="default"):
# 		short_url=shortener.default(url)
# 	elif(type=="custom"):
# 		if(surl!=""):
# 			short_url=shortener.custom(url,surl)
# 		else:
# 			return "Enter short url"
# 	elif(type=="semantic"):
# 		short_url=shortener.semantic(url)
# 	else:
# 		return "Wrong Type"

# 	short_url = 'shortened url: %s \n ' % short_url
# 	long_url = 'Orginal url: %s \n' % url
# 	return (long_url+ '<br>' + short_url)
