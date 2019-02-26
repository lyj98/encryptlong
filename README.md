# encryptlong

原版官方网站
======================
http://travistidwell.com/jsencrypt

介绍
======================
基于jsencrypt扩展长文本分段加解密功能

npm安装：

```bash
npm i encryptlong -S
```

浏览器使用：

```html
<script src="./bin/jsencrypt.js"></script>
```

基本使用
======================

这里只扩展了长文本的分段加解密，其它api请查看官网 http://travistidwell.com/jsencrypt

- `encryptLong()` 长文本加密
- `decryptLong()` 长文本解密

```js
var startTime = new Date();
//公钥
var PUBLIC_KEY = `MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgENHfFo4sznC10D7ijFooLnJvVav
gWBgPyW0qfK/2wJRb1bSlWNnAVPm6KmP1++xU6LaA7u/PN6y5cBEVEL6zJBml9xJ
mdAM7CiBWnToGaluDFpbqEb0rQfiK9xeJE1PgP73DrONBOXFjjMkEWWxGJpKpXPO
NiI2H2nN+VOF/OZjAgMBAAE=`;
//私钥
var PRIVATE_KEY = `MIICWwIBAAKBgENHfFo4sznC10D7ijFooLnJvVavgWBgPyW0qfK/2wJRb1bSlWNn
AVPm6KmP1++xU6LaA7u/PN6y5cBEVEL6zJBml9xJmdAM7CiBWnToGaluDFpbqEb0
rQfiK9xeJE1PgP73DrONBOXFjjMkEWWxGJpKpXPONiI2H2nN+VOF/OZjAgMBAAEC
gYAJhUIpmkByegnv3iiOGVo1MEEk1S0fsD7/XPN3sIKTb2asCJyvNlJPxytBY2OR
PayyLNu+Y69/bB1q+cBawhbUaytu495pYvq5vPaifuYtxu+tWXJKfmyOXFZv+NqF
81bTjzCJ/nJE7PtKp4UK+YLRJCXLBwm+oD8MeUcsL6kJkQJBAIPo/aTj4MLlx5p5
ttpQ3d40J0FgVDacIzrT1q3gNEbSRC6ZzE7auTjikla0gW71uGKmN3TxgBqb6jfx
0asIe88CQQCCkeJATnCol+MleT374NjkN7OmvYsKuJgACo6DiKThPhSNDM2nfprD
+6J9wtjs5pPCmGfijKJF+klOtdBkuG0tAkB1AO4zGxobZhulrr59aWtTFGmZeKta
ASbSoGJ0ukFEbG+j8jGh5CqVBYuOMu/4DyatAgiAx1G8yH15gBpdHdpLAkEAgYy/
gPCTJSQ20tqeHoj0ilOeI4WTLJsE7Z2L04RDm9zdxSl774FVi7jje4ZVd5A78WsI
QCcrZuUz0S3iS90VLQJAMkom/AjLEvru4wGSsvfCcGBtQM2BDzToaHTfAGoxZ/GM
J9PLlyYGgACPHpLJEMCIbl2o6Mh1Fj6XwfFg1WV7XA==`;
//使用公钥加密
var encrypt = new JSEncrypt();
encrypt.setPublicKey(
    '-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----'
);
// 一段长文本json
var data = {
    token: '892ga42959d21d8957fa8b5c5d672dde',
    uid: 75952368,
    timestamp: +new Date(),
    udid: 'fdakjlfkdas',
    udid1: 'fdakjlfkdas',
    udid2: 'fdakjlfkdas',
    udid3: 'fdakjlfkdas',
    udid4: 'fdakjlfkdas',
    udid5: 'fdakjlfkdas'
};
data = JSON.stringify(data);
var encrypted = encrypt.encryptLong(data);
var endTime = new Date();
console.log('加密后数据:%o', encrypted);
console.log('加密时间' + (endTime - startTime) + 'ms');
//使用私钥解密
var decrypt = new JSEncrypt();
//decrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----');
decrypt.setPrivateKey(
    '-----BEGIN RSA PRIVATE KEY-----' + PRIVATE_KEY + '-----END RSA PRIVATE KEY-----'
);
var uncrypted = decrypt.decryptLong(encrypted);
console.log('解密后数据:%o', uncrypted);
```

其它使用
=======================
这个库应该与openssl一起使用

- 在终端（基于Unix的操作系统）

```bash
openssl genrsa -out rsa_1024_priv.pem 1024
```

- 会生成一个私钥，您可以通过执行以下操作查看

```bash
cat rsa_1024_priv.pem
```

- 然后，您可以将其复制到index.html内的私钥处
- 接下来，您可以通过执行以下命令来获取公钥

```bash
openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
```

- 查看公钥

```bash
cat rsa_1024_pub.pem
```

- 将其复制到index.html中的Public键中
- 现在，您可以通过在代码中执行以下操作来转换加密解密文本转换

```html
<!doctype html>
<html>
  <head>
    <title>JavaScript RSA Encryption</title>
    <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
    <script src="bin/jsencrypt.min.js"></script>
    <script type="text/javascript">

      // Call this code when the page is done loading.
      $(function() {

        // Run a quick encryption/decryption when they click.
        $('#testme').click(function() {

          // Encrypt with the public key...
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey($('#pubkey').val());
          var encrypted = encrypt.encrypt($('#input').val());

          // Decrypt with the private key...
          var decrypt = new JSEncrypt();
          decrypt.setPrivateKey($('#privkey').val());
          var uncrypted = decrypt.decrypt(encrypted);

          // Now a simple check to see if the round-trip worked.
          if (uncrypted == $('#input').val()) {
            alert('It works!!!');
          }
          else {
            alert('Something went wrong....');
          }
        });
      });
    </script>
  </head>
  <body>
    <label for="privkey">Private Key</label><br/>
    <textarea id="privkey" rows="15" cols="65">-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
-----END RSA PRIVATE KEY-----</textarea><br/>
    <label for="pubkey">Public Key</label><br/>
    <textarea id="pubkey" rows="15" cols="65">-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB
-----END PUBLIC KEY-----</textarea><br/>
    <label for="input">Text to encrypt:</label><br/>
    <textarea id="input" name="input" type="text" rows=4 cols=70>This is a test!</textarea><br/>
    <input id="testme" type="button" value="Test Me!!!" /><br/>
  </body>
</html>
```

- 查看更好的示例 http://www.travistidwell.com/jsencrypt/example.html

- 签名和验证

```js
// Sign with the private key...
var sign = new JSEncrypt();
sign.setPrivateKey($('#privkey').val());
var signature = sign.sign($('#input').val(), CryptoJS.SHA256, "sha256");

// Verify with the public key...
var verify = new JSEncrypt();
verify.setPublicKey($('#pubkey').val());
var verified = verify.verify($('#input').val(), signature, CryptoJS.SHA256);

// Now a simple check to see if the round-trip worked.
if (verified) {
  alert('It works!!!');
}
else {
  alert('Something went wrong....');
}
```

- 您必须提供哈希函数。在本例中，我们使用的是[CryptoJS]([CryptoJS](https://github.com/brix/crypto-js) )库
- 此外，除非使用自定义散列函数，否则应该为`sign`方法提供散列类型。可能的值有：`md2`, `md5`, `sha1`, `sha224`, `sha256`, `sha384`, `sha512`, `ripemd160`.

其它信息
========================

Base64格式的1024位RSA私钥
-----------------------------------------

```txt
-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDHikastc8+I81zCg/qWW8dMr8mqvXQ3qbPAmu0RjxoZVI47tvs
kYlFAXOf0sPrhO2nUuooJngnHV0639iTTEYG1vckNaW2R6U5QTdQ5Rq5u+uV3pMk
7w7Vs4n3urQ6jnqt2rTXbC1DNa/PFeAZatbf7ffBBy0IGO0zc128IshYcwIDAQAB
AoGBALTNl2JxTvq4SDW/3VH0fZkQXWH1MM10oeMbB2qO5beWb11FGaOO77nGKfWc
bYgfp5Ogrql4yhBvLAXnxH8bcqqwORtFhlyV68U1y4R+8WxDNh0aevxH8hRS/1X5
031DJm1JlU0E+vStiktN0tC3ebH5hE+1OxbIHSZ+WOWLYX7JAkEA5uigRgKp8ScG
auUijvdOLZIhHWq7y5Wz+nOHUuDw8P7wOTKU34QJAoWEe771p9Pf/GTA/kr0BQnP
QvWUDxGzJwJBAN05C6krwPeryFKrKtjOGJIniIoY72wRnoNcdEEs3HDRhf48YWFo
riRbZylzzzNFy/gmzT6XJQTfktGqq+FZD9UCQGIJaGrxHJgfmpDuAhMzGsUsYtTr
iRox0D1Iqa7dhE693t5aBG010OF6MLqdZA1CXrn5SRtuVVaCSLZEL/2J5UcCQQDA
d3MXucNnN4NPuS/L9HMYJWD7lPoosaORcgyK77bSSNgk+u9WSjbH1uYIAIPSffUZ
bti+jc1dUg5wb+aeZlgJAkEAurrpmpqj5vg087ZngKfFGR5rozDiTsK5DceTV97K
a3Y+Nzl+XWTxDBWk4YPh2ZlKv402hZEfWBYxUDn5ZkH/bw==
-----END RSA PRIVATE KEY-----
```
