使用 chrome-mcp-tool 做測試
定義：PORT 為 
定義：REGISTERED_EMAIL 為 

測試001：
Fetch POST http://localhost:${PORT}/api/v1/auth/sendOTP

body是
{
    "email":"${REGISTERED_EMAIL}"
}

驗證：要回傳錯誤，因為 REGISTERED_EMAIL 已經註冊過了