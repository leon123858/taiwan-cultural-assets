# taiwan-cultural-assets

the wrapper about OpenAPI(data.boch.gov.tw/data) for taiwan cultural-assets

## example

```
import {
  getAntiquitiesIntroduce,
  getAntiquitiesListByRegion,
  IAntiquities
} from "taiwan-cultural-assets"


const result:IAntiquities = getAntiquitiesIntroduce('20140815000001');
const result2:{ caseId:string, caseName:string }[] = getAntiquitiesListByRegion('臺北市士林區');
// when their is no result ,return "undefined"
```
