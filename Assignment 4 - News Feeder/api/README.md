# Project: News API

## End-point: Top Headlines

### GET /v2/top-headlines

This endpoint retrieves the top headlines based on the specified category. If no category is provided, the general news will be returned.

#### Request Parameters

- `category` (optional, string) - The category for which the top headlines are to be retrieved. Available categories include general, business, entertainment, health, science, sports, and technology.

#### Response

The response will be in JSON format with the following structure:

```json
{
  "status": "",
  "totalResults": 0,
  "articles": [
    {
      "source": {
        "id": "",
        "name": ""
      },
      "author": "",
      "title": "",
      "description": null,
      "url": "",
      "urlToImage": null,
      "publishedAt": "",
      "content": null
    }
  ]
}
```

### Method: GET

> ```
> http://localhost:8000/v2/top-headlines?category=general
> ```

### Query Params

| Param    | value   |
| -------- | ------- |
| category | general |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Search News

This endpoint makes an HTTP GET request to search for the query "Develop". The response is in JSON format and includes a status code of 200. The response structure is as follows:

- `totalResults` (number): The total number of results for the search query.
- `result` (array): An array containing the search results, where each result object includes the following properties:
  - `source` (object): Information about the source of the result, including `id` and `name`.
  - `author` (string): The author of the result.
  - `title` (string): The title of the result.
  - `description` (string): The description of the result.
  - `url` (string): The URL of the result.
  - `urlToImage` (string): The URL to the image associated with the result.
  - `publishedAt` (string): The date and time when the result was published.
  - `content` (string): The content of the result.

### Method: GET

> ```
> http://localhost:8000/v2/search?q=Develop
> ```

### Query Params

| Param | value   |
| ----- | ------- |
| q     | Develop |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---
