使用 chrome-mcp-tool 做測試
定義：PORT 為 
定義：REGISTER_EMAIL 為 
定義：UNREGISTER_EMAIL 為 

測試001：測試已註冊的 email
Fetch POST http://localhost:${PORT}/api/v1/auth/sendOTP

body是
{
    "email":"${REGISTER_EMAIL}"
}

驗證：要回傳錯誤，因為 REGISTER_EMAIL 已經註冊過了

測試002：測試未註冊的 email 和 一分內寄不能送第二次
Fetch POST http://localhost:${PORT}/api/v1/auth/sendOTP

body是
{
    "email":"${UNREGISTER_EMAIL}"
}
    
驗證：先寄送一次，然後一分內寄送第二次，測試不能重複寄送 OTP API