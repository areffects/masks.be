import base64
import hmac
from hashlib import sha1

access_key = 'AKIAQ25U2BXWUMXHEC2O'.encode("UTF-8")
secret_key = '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'.encode("UTF-8")

string_to_sign = 'GET\n\n\nTue, 27 Mar 2007 19:36:42 +0000\nhttps://users-avatars-bucket.s3.us-east-2.amazonaws.com/cat.jpg'.encode(
    "UTF-8")
signature = base64.encodestring(
    hmac.new(
        secret_key, string_to_sign, sha1
    ).digest()
).strip()


print(f"AWS {access_key.decode()}:{signature.decode()}")
