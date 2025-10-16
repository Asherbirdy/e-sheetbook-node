FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /app

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# 從 .env 文件中讀取 PORT 變數並設置為環境變數
RUN export $(grep PORT .env | xargs) && echo "PORT=$PORT" >> /etc/environment

# 使用環境變數來設置 EXPOSE
EXPOSE $PORT

# 使用 ts-node 直接運行 TypeScript 文件
CMD ["sh", "-c", "source .env && ts-node ./app.ts"]
