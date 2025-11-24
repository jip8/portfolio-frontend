# ArticleResp


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**local** | **string** |  | [optional] [default to undefined]
**published_at** | **string** |  | [optional] [default to undefined]
**revelance** | **number** |  | [optional] [default to undefined]
**links** | [**Array&lt;LinkResp&gt;**](LinkResp.md) |  | [optional] [default to undefined]
**attachments** | [**Array&lt;AttachmentResp&gt;**](AttachmentResp.md) |  | [optional] [default to undefined]
**skills** | [**Array&lt;SkillResp&gt;**](SkillResp.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ArticleResp } from './api';

const instance: ArticleResp = {
    id,
    title,
    description,
    local,
    published_at,
    revelance,
    links,
    attachments,
    skills,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
