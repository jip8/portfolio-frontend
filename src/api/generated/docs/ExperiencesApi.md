# ExperiencesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**experiencesGet**](#experiencesget) | **GET** /experiences | List all experiences|
|[**experiencesIdDelete**](#experiencesiddelete) | **DELETE** /experiences/{id} | Delete an experience by ID|
|[**experiencesIdGet**](#experiencesidget) | **GET** /experiences/{id} | Get an experience by ID|
|[**experiencesIdPut**](#experiencesidput) | **PUT** /experiences/{id} | Update an experience by ID|
|[**experiencesPost**](#experiencespost) | **POST** /experiences | Create a new experience|

# **experiencesGet**
> ExperienceList experiencesGet()


### Example

```typescript
import {
    ExperiencesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperiencesApi(configuration);

const { status, data } = await apiInstance.experiencesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ExperienceList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of experiences |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **experiencesIdDelete**
> experiencesIdDelete()


### Example

```typescript
import {
    ExperiencesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperiencesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.experiencesIdDelete(
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
|**204** | Experience deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **experiencesIdGet**
> ExperienceResp experiencesIdGet()


### Example

```typescript
import {
    ExperiencesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperiencesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.experiencesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ExperienceResp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A single experience |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **experiencesIdPut**
> ExperienceResp experiencesIdPut(experienceFlat)


### Example

```typescript
import {
    ExperiencesApi,
    Configuration,
    ExperienceFlat
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperiencesApi(configuration);

let id: number; // (default to undefined)
let experienceFlat: ExperienceFlat; //

const { status, data } = await apiInstance.experiencesIdPut(
    id,
    experienceFlat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **experienceFlat** | **ExperienceFlat**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ExperienceResp**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Experience updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **experiencesPost**
> ExperienceResp experiencesPost(experienceFlat)


### Example

```typescript
import {
    ExperiencesApi,
    Configuration,
    ExperienceFlat
} from './api';

const configuration = new Configuration();
const apiInstance = new ExperiencesApi(configuration);

let experienceFlat: ExperienceFlat; //

const { status, data } = await apiInstance.experiencesPost(
    experienceFlat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **experienceFlat** | **ExperienceFlat**|  | |


### Return type

**ExperienceResp**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Experience created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

