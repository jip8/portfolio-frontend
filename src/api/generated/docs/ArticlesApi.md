# ArticlesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**articlesGet**](#articlesget) | **GET** /articles | List all articles|
|[**articlesIdAttachmentsDelete**](#articlesidattachmentsdelete) | **DELETE** /articles/{id}/attachments | Delete attachment from an article|
|[**articlesIdAttachmentsPost**](#articlesidattachmentspost) | **POST** /articles/{id}/attachments | Insert attachment to an article|
|[**articlesIdDelete**](#articlesiddelete) | **DELETE** /articles/{id} | Delete an article by ID|
|[**articlesIdGet**](#articlesidget) | **GET** /articles/{id} | Get an article by ID|
|[**articlesIdPut**](#articlesidput) | **PUT** /articles/{id} | Update an article by ID|
|[**articlesPost**](#articlespost) | **POST** /articles | Create a new article|

# **articlesGet**
> ArticleList articlesGet()


### Example

```typescript
import {
    ArticlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArticlesApi(configuration);

const { status, data } = await apiInstance.articlesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ArticleList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of articles |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **articlesIdAttachmentsDelete**
> articlesIdAttachmentsDelete()


### Example

```typescript
import {
    ArticlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArticlesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.articlesIdAttachmentsDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Attachment deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **articlesIdAttachmentsPost**
> articlesIdAttachmentsPost()


### Example

```typescript
import {
    ArticlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArticlesApi(configuration);

let id: number; // (default to undefined)
let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.articlesIdAttachmentsPost(
    id,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|
| **file** | [**File**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Attachment inserted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **articlesIdDelete**
> articlesIdDelete()


### Example

```typescript
import {
    ArticlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArticlesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.articlesIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Article deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **articlesIdGet**
> ArticleResp articlesIdGet()


### Example

```typescript
import {
    ArticlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ArticlesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.articlesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ArticleResp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A single article |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **articlesIdPut**
> ArticleResp articlesIdPut(articleFlat)


### Example

```typescript
import {
    ArticlesApi,
    Configuration,
    ArticleFlat
} from './api';

const configuration = new Configuration();
const apiInstance = new ArticlesApi(configuration);

let id: number; // (default to undefined)
let articleFlat: ArticleFlat; //

const { status, data } = await apiInstance.articlesIdPut(
    id,
    articleFlat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **articleFlat** | **ArticleFlat**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ArticleResp**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Article updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **articlesPost**
> ArticleResp articlesPost(articleFlat)


### Example

```typescript
import {
    ArticlesApi,
    Configuration,
    ArticleFlat
} from './api';

const configuration = new Configuration();
const apiInstance = new ArticlesApi(configuration);

let articleFlat: ArticleFlat; //

const { status, data } = await apiInstance.articlesPost(
    articleFlat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **articleFlat** | **ArticleFlat**|  | |


### Return type

**ArticleResp**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Article created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

