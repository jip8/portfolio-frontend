# AboutApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**aboutGet**](#aboutget) | **GET** /about | Get about me information|
|[**aboutPut**](#aboutput) | **PUT** /about | Update about me information|

# **aboutGet**
> About aboutGet()


### Example

```typescript
import {
    AboutApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AboutApi(configuration);

const { status, data } = await apiInstance.aboutGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**About**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | About me information |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **aboutPut**
> About aboutPut(about)


### Example

```typescript
import {
    AboutApi,
    Configuration,
    About
} from './api';

const configuration = new Configuration();
const apiInstance = new AboutApi(configuration);

let about: About; //

const { status, data } = await apiInstance.aboutPut(
    about
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **about** | **About**|  | |


### Return type

**About**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | About me information updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

