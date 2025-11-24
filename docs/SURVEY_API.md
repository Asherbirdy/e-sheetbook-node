# Survey API 使用說明

## 資料結構

### SurveyOption Model
選項有兩種類型：
- `boolean`: 是/否選項（例如：不訂餐）
- `quantity`: 數量選項（例如：雞腿便當、排骨便當）

### Survey Model
問卷包含：
- `name`: 問卷名稱
- `options`: 選項陣列（引用 SurveyOption）
- `expiresAt`: 過期時間
- `userId`: 創建者 ID

## API 端點

### 創建問卷
**Endpoint:** `POST /api/v1/survey/create`

**Request Body:**
```json
{
  "name": "午餐訂餐調查",
  "expiresAt": "2025-11-25T12:00:00Z",
  "options": [
    {
      "name": "不訂餐",
      "type": "boolean"
    },
    {
      "name": "雞腿便當",
      "type": "quantity"
    },
    {
      "name": "排骨便當",
      "type": "quantity"
    }
  ]
}
```

**Response:**
```json
{
  "survey": {
    "_id": "...",
    "name": "午餐訂餐調查",
    "expiresAt": "2025-11-25T12:00:00.000Z",
    "userId": "...",
    "options": ["optionId1", "optionId2", "optionId3"],
    "createdAt": "...",
    "updatedAt": "..."
  },
  "options": [
    {
      "_id": "optionId1",
      "name": "不訂餐",
      "type": "boolean",
      "surveyId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "optionId2",
      "name": "雞腿便當",
      "type": "quantity",
      "surveyId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "optionId3",
      "name": "排骨便當",
      "type": "quantity",
      "surveyId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### 獲取問卷選項
**Endpoint:** `GET /api/v1/survey-option/:surveyId`

**URL Parameters:**
- `surveyId`: 問卷 ID

**Response:**
```json
{
  "count": 3,
  "options": [
    {
      "_id": "optionId1",
      "name": "不訂餐",
      "type": "boolean",
      "surveyId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "optionId2",
      "name": "雞腿便當",
      "type": "quantity",
      "surveyId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "optionId3",
      "name": "排骨便當",
      "type": "quantity",
      "surveyId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

**Error Response (404):**
```json
{
  "msg": "No options found for this survey"
}
```

**Error Response (400):**
```json
{
  "msg": "Please provide surveyId"
}
```

## 注意事項
- 所有 API 都需要先登入（使用 `authenticateUser` middleware）
- 創建問卷時至少需要提供一個選項
- `expiresAt` 必須是有效的日期格式
- 選項會按照創建時間排序（由舊到新）
