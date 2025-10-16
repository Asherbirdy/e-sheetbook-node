本機開發：
複製環境變數
```
cp .env.sample .env
```
Docker(抓.env)
```
docker compose build
docker compose up
```
pnpm(抓.env.dev 和 .env.prod)
```
pnpm i
pnpm dev
```

Docker部署：
git clone 拉下來
```
正式：
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up

測試：
docker compose -f docker-compose.test.yml build
docker compose -f docker-compose.test.yml up
```
pnpm 部署：
```
pnpm build
```

pm2 部署：(抓去.env.prod)
```
npm install pm2 -g
pnpm build
pnpm deploy:prod
```
###### 將dist檔案副上，並在平台上設定.env
------------

Install MongoDB Community Edition
`https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-community-with-docker/```

本地安裝mongoDB:
`docker pull mongodb/mongodb-community-server:latest`
`docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest`

JWT加密金鑰網址：
可以參考這網站的 Encryption key 256:https://acte.ltd/utils/randomkeygen
