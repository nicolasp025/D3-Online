# API Documentation

## Endpoints

### POST /debug

Starts the experiment.

**Body**

| Name     | Type   | Required | Description              |
| -------- | ------ | -------- | ------------------------ |
| `userId` | string | Yes      | User identifier          |
| `url1`   | string | Yes      | First url of experiment  |
| `url2`   | string | Yes      | Second url of experiment |

**Response Codes**

| Code  | Description                               |
| ----- | ----------------------------------------- |
| `200` | Experiment Started                        |
| `423` | Unauthorized — experiment already running |
| `500` | Internal Server Error                     |

**Response**

```json
{
  "metadata": {
    "language": string
  },
  "flowDivergences": [
    {
      "id": number,
      "displayName": string,
      "originalPosition": {
        "start": number,
        "stop": number | null
      },
      "modifiedPosition": {
        "start": number,
        "stop": number | null
      }
    }
  ],
  "stateDivergences": [
    {
      "id": number,
      "displayName": string,
      "originalPosition": number,
      "modifiedPosition": number
    }
  ],
  "v1": {
    "id": number,
    "frames": [
      {
        "id": number,
        "displayName": string,
        "sourceCode": string
      }
    ]
  },
  "v2": {
    "id": number,
    "frames": [
      {
        "id": number,
        "displayName": string,
        "sourceCode": string
      }
    ]
  }
}
```

### GET /debug/stack

Returns the frames at the specified page in the debug stacks.

**Parameters**

| Name   | Type   | Required | Description                             |
| ------ | ------ | -------- | --------------------------------------- |
| `page` | number | No       | Returns the specified page (default: 0) |

**Response Codes**

| Code  | Description                         |
| ----- | ----------------------------------- |
| `200` | Request OK                          |
| `204` | No Content - page empty             |
| `400` | Bad Request - no experiment running |
| `500` | Internal Server Error               |

**Response**

```json
{
  "frames": [
    {
        "id": number,
        "displayName": string,
        "sourceCode": string
    }
  ],
}
```

### GET /debug/divergence/flow

Returns the flow divergences at the specified page in the analysis results.

**Parameters**

| Name   | Type   | Required | Description                             |
| ------ | ------ | -------- | --------------------------------------- |
| `page` | number | No       | Returns the specified page (default: 0) |

**Response Codes**

| Code  | Description                         |
| ----- | ----------------------------------- |
| `200` | Request OK                          |
| `204` | No Content - page empty             |
| `400` | Bad Request - no experiment running |
| `500` | Internal Server Error               |

**Response**

```json
{
  "flowDivergences": [
    {
      "id": number,
      "displayName": string,
      "originalPosition": {
        "start": number,
        "stop": number | null
      },
      "modifiedPosition": {
        "start": number,
        "stop": number | null
      }
    }
  ]
}
```

### GET /debug/divergence/state

Returns the state divergences at the specified page in the analysis results.

**Parameters**

| Name   | Type   | Required | Description                             |
| ------ | ------ | -------- | --------------------------------------- |
| `page` | number | No       | Returns the specified page (default: 0) |


**Response Codes**

| Code  | Description                         |
| ----- | ----------------------------------- |
| `200` | Request OK                          |
| `204` | No Content - page empty             |
| `400` | Bad Request - no experiment running |
| `500` | Internal Server Error               |

**Response**

```json
{
  "stateDivergences": [
    {
      "id": number,
      "displayName": string,
      "originalPosition": number,
      "modifiedPosition": number
    }
  ]
}
```