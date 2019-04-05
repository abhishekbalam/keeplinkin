BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

def encode(num, alphabet=BASE62):
	'''Encode a positive number in Base X
	Arguments:
	- `num`: The number to encode
	- `alphabet`: The alphabet to use for encoding
	'''
	if num == 0:
		return alphabet[0]
	arr = []
	base = len(alphabet)
	while num:
		num, rem = divmod(num, base)
		arr.append(alphabet[rem])
	arr.reverse()
	return ''.join(arr)

def decode(string, alphabet=BASE62):
	'''Decode a Base X encoded string into the number
	Arguments:
	- `string`: The encoded string
	- `alphabet`: The alphabet to use for encoding
	'''
	base = len(alphabet)
	strlen = len(string)
	num = 0
	idx = 0
	for char in string:
		power = (strlen - (idx + 1))
		num += alphabet.index(char) * (base ** power)
		idx += 1
	return num

# def main():
# 	num=10000
# 	print(num)
# 	print(encode(num))
# 	print(type(encode(num)))
# 	print(type(decode(encode(num))))

# if __name__ == '__main__':
# 	main()