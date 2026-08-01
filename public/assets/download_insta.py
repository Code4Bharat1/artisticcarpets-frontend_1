import urllib.request
import re

url = 'https://www.instagram.com/p/DBN_6Y_P7z1/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
    if match:
        img_url = match.group(1).replace('&amp;', '&')
        print('Found image URL:', img_url)
        urllib.request.urlretrieve(img_url, 'c:/Users/LENOVO/Desktop/nexcore/artisticCarpetsUpdate/-artisticcarpets-frontend_1/public/assets/insta0.jpg')
        print('Saved to insta0.jpg')
    else:
        print('og:image not found')
except Exception as e:
    print('Error:', e)

