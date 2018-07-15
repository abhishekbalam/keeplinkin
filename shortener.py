import os
import redis
import b62
import funnywords as fw

# Command to directly manipulate redis db from cli:
# redis-cli -h redis-18904.c16.us-east-1-2.ec2.cloud.redislabs.com -p 18904 -a WGUPyxmAPpyP3pq3A9YWyLyEcU2Tsyus

# For Remote DB
db=redis.from_url(os.environ['REDISCLOUD_URL'])

# For Local DB
# db=redis.Redis(host='localhost', port=6379, password='')
# db=redis.from_url('redis://rediscloud:knJIvxJ0zwckXkNTogSsXQKNZ2k9QrvK@redis-11031.c52.us-east-1-4.ec2.cloud.redislabs.com:11031')


def default(l_url):
	score=(db.zcard("default")+1)
	
	if(score<10000):
		score=score+10000

	s_url=b62.encode(score)
	
	db.zadd("default",l_url,score)

	return s_url

def custom(l_url, c_url):
	status=db.hexists("custom",c_url)

	if(status==0):
		status=db.hsetnx("custom", c_url, l_url)
	
	return c_url
	
def semantic(l_url):

	c_url=fw.gen_word(2,4)

	status=db.hexists("custom",c_url)

	if(status==0):
		status=db.hsetnx("custom", c_url, l_url)
	else:
		semantic(l_url)
			
	return c_url

def decode(s_url):
	status=db.hexists("custom",s_url)
	
	if(status==1):
		l_url=db.hget("custom", s_url)
	else:
		try:
			key=b62.decode(s_url)
			l_url=db.zrangebyscore("default",key,key)
			l_url=''.join(l_url)
		except:
			l_url=False

	return l_url