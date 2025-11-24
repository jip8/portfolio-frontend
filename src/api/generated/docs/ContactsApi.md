# ContactsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**contactsGet**](#contactsget) | **GET** /contacts | List all contacts|
|[**contactsIdDelete**](#contactsiddelete) | **DELETE** /contacts/{id} | Delete a contact by ID|
|[**contactsIdGet**](#contactsidget) | **GET** /contacts/{id} | Get a contact by ID|
|[**contactsIdPut**](#contactsidput) | **PUT** /contacts/{id} | Update a contact by ID|
|[**contactsPost**](#contactspost) | **POST** /contacts | Create a new contact|

# **contactsGet**
> ContactList contactsGet()


### Example

```typescript
import {
    ContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContactsApi(configuration);

const { status, data } = await apiInstance.contactsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ContactList**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of contacts |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contactsIdDelete**
> contactsIdDelete()


### Example

```typescript
import {
    ContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContactsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.contactsIdDelete(
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
|**204** | Contact deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contactsIdGet**
> Contact contactsIdGet()


### Example

```typescript
import {
    ContactsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContactsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.contactsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Contact**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A single contact |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contactsIdPut**
> Contact contactsIdPut(contact)


### Example

```typescript
import {
    ContactsApi,
    Configuration,
    Contact
} from './api';

const configuration = new Configuration();
const apiInstance = new ContactsApi(configuration);

let id: number; // (default to undefined)
let contact: Contact; //

const { status, data } = await apiInstance.contactsIdPut(
    id,
    contact
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **contact** | **Contact**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Contact**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Contact updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contactsPost**
> Contact contactsPost(contact)


### Example

```typescript
import {
    ContactsApi,
    Configuration,
    Contact
} from './api';

const configuration = new Configuration();
const apiInstance = new ContactsApi(configuration);

let contact: Contact; //

const { status, data } = await apiInstance.contactsPost(
    contact
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **contact** | **Contact**|  | |


### Return type

**Contact**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Contact created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

