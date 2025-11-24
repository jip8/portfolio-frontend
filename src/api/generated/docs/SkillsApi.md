# SkillsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**skillsGet**](#skillsget) | **GET** /skills | List all skills|
|[**skillsPut**](#skillsput) | **PUT** /skills | Update skills|

# **skillsGet**
> SkillList skillsGet()


### Example

```typescript
import {
    SkillsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SkillsApi(configuration);

const { status, data } = await apiInstance.skillsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SkillList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of skills |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **skillsPut**
> SkillList skillsPut(skillFlat)


### Example

```typescript
import {
    SkillsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SkillsApi(configuration);

let skillFlat: Array<SkillFlat>; //

const { status, data } = await apiInstance.skillsPut(
    skillFlat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **skillFlat** | **Array<SkillFlat>**|  | |


### Return type

**SkillList**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Skills updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

