# Important REDIS commands

## General

- `KEYS *`
	- Lists all keys in the db

## Strings

- `SET <key> <value>`
	- 
- `GET <key>`
	- returns value

## Ordered Sets

- `ZCARD`
	- Finds the length of Ordered Set

## Hashes

- `HSET`
	- To create and add key if it doesnt exist. If value exists , it is overriden
- `HSETNX`
	- To create and add key if it doesnt exist. If value exists , no operation done

OLD:
db=redis.from_url('redis://rediscloud:knJIvxJ0zwckXkNTogSsXQKNZ2k9QrvK@redis-11031.c52.us-east-1-4.ec2.cloud.redislabs.com:11031')
