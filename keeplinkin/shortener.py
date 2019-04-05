import os
import redis
from . import b62
from . import funnywords as fw

db=redis.Redis(host=os.environ['REDIS_HOST'], port=6379)

def default(l_url):
	score=(db.zcard('default')+1)
	if(score<10000):
		score=score+10000
	s_url=b62.encode(score)
	# db.zadd('default',l_url,score)
	db.execute_command('ZADD', 'default', 'NX', score, l_url)
	return s_url

def custom(l_url, c_url):
	status=db.hexists('custom',c_url)
	if(status==0):
		status=db.hsetnx('custom', c_url, l_url)
	return c_url
	
def semantic(l_url):
	c_url=fw.gen_word(2,4)
	status=db.hexists('custom',c_url)
	if(status==0):
		status=db.hsetnx('custom', c_url, l_url)
	else:
		semantic(l_url)
	return c_url

def decode(s_url):
	status=db.hexists('custom',s_url)
	if(status==1):
		l_url=db.hget('custom', s_url)
		l_url=l_url.decode('utf-8')
	else:
		try:
			key=b62.decode(s_url)
			l_url=db.zrangebyscore('default',key,key)
			l_url=l_url[0].decode('utf-8')
		except Exception as e:
			# print('Error in urldecode:'+str(e))
			l_url=False
	return l_url