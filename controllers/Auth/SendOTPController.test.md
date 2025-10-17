使用 chrome-mcp-tool
Fetch api POST
http://localhost:1210/api/v1/auth/login

定義：name 為 .env.test 中的 REGISTERED_NAME
定義：password 為 .env.test 中的 REGISTERED_PASSWORD

body是
{
    "name":"${REGISTERED_NAME}",
    "password":"${REGISTERED_PASSWORD}"
}

看他回傳什麼