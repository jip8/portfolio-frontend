# CoursesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**coursesGet**](#coursesget) | **GET** /courses | List all courses|
|[**coursesIdDelete**](#coursesiddelete) | **DELETE** /courses/{id} | Delete a course by ID|
|[**coursesIdGet**](#coursesidget) | **GET** /courses/{id} | Get a course by ID|
|[**coursesIdPut**](#coursesidput) | **PUT** /courses/{id} | Update a course by ID|
|[**coursesPost**](#coursespost) | **POST** /courses | Create a new course|

# **coursesGet**
> CourseList coursesGet()


### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

const { status, data } = await apiInstance.coursesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CourseList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of courses |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coursesIdDelete**
> coursesIdDelete()


### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.coursesIdDelete(
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
|**204** | Course deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coursesIdGet**
> CourseResp coursesIdGet()


### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.coursesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**CourseResp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A single course |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coursesIdPut**
> CourseResp coursesIdPut(courseFlat)


### Example

```typescript
import {
    CoursesApi,
    Configuration,
    CourseFlat
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let id: number; // (default to undefined)
let courseFlat: CourseFlat; //

const { status, data } = await apiInstance.coursesIdPut(
    id,
    courseFlat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseFlat** | **CourseFlat**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**CourseResp**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Course updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coursesPost**
> CourseResp coursesPost(courseFlat)


### Example

```typescript
import {
    CoursesApi,
    Configuration,
    CourseFlat
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let courseFlat: CourseFlat; //

const { status, data } = await apiInstance.coursesPost(
    courseFlat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseFlat** | **CourseFlat**|  | |


### Return type

**CourseResp**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Course created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

