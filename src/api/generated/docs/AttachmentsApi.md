# AttachmentsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**attachmentsUuidGet**](#attachmentsuuidget) | **GET** /attachments/{uuid} | Get an attachment by UUID|

# **attachmentsUuidGet**
> attachmentsUuidGet()


### Example

```typescript
import {
    AttachmentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttachmentsApi(configuration);

let uuid: string; // (default to undefined)

const { status, data } = await apiInstance.attachmentsUuidGet(
    uuid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uuid** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | An attachment file |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

