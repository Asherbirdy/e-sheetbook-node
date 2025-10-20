使用 chrome-mcp-tool 做測試

使用 chrome-mcp-tool 做測試
定義：PORT 為 

優先：先傳一封 OTP 到 UNREGISTER_EMAIL
Fetch POST http://localhost:${PORT}/api/v1/auth/sendOTP

body是
{
    "email":"${UNREGISTER_EMAIL}"
}

定義：REGISTER_EMAIL 為 
定義：UNREGISTER_EMAIL 為 
定義：UNREGISTER_OTP 為 

測試001：測試已註冊的 email
Fetch POST http://localhost:${PORT}/api/v1/auth/register

body是
{
    "email":"${REGISTER_EMAIL}",
    "name":"test",
    "password":"password",
    "OTP":"test"
}

驗證：要回傳錯誤，因為 REGISTER_EMAIL 已經註冊過了

測試002：測試未註冊的 email，輸入錯誤的 
Fetch POST http://localhost:${PORT}/api/v1/auth/register

body是
{
    "email":"${UNREGISTER_EMAIL}",
    "name":"test_user",
    "password":"password",
    "OTP":"wrong_otp"
}

驗證：要回傳錯誤，因為 OTP 不正確

測試003：用剛剛註冊的帳號，用正確的 OTP 來註冊
Fetch POST http://localhost:${PORT}/api/v1/auth/register

body是
{
    "email":"${UNREGISTER_EMAIL}",
    "name":"test_user",
    "password":"password",
    "OTP":"${UNREGISTER_OTP}"
}

驗證：要回傳成功，因為 OTP 正確