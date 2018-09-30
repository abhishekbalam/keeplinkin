# Custom URLS
DataType: Hash Table
Key='custom'
__originalurl | customurl__
localhost.url | somehing.url


# Sematic use the same table as custom
# semantic URLS
DataType: Hash Table
Key='semantic'
__originalurl | customurl__
localhost.url | somehing.url

# Default URLS
DataType: Sorted Set
Key='links'
__score__|_originalurl__
    0    | abslskskjhs.xyz
    1    | abslskskjhs.xyz
    2    | abslskskjhs.xyz
    3    | abslskskjhs.xyz
    4    | abslskskjhs.xyz

# Clicks 
DataType: Hash
__key___|__clicks__
   0    |    2
"hello/"|    2