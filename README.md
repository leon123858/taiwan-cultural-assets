# taiwan-cultural-assets

the wrapper about OpenAPI(data.boch.gov.tw/data) for taiwan cultural-assets

## example

```
import {
  getAntiquitiesIntroduce,
	getAntiquitiesListByRegion,
	getMonumentsIntroduce,
	getMonumentsListByRegion,
	IAntiquities,
	IMonuments,
} from "taiwan-cultural-assets"

// 呼叫古物
const result:IAntiquities = getAntiquitiesIntroduce('20140815000001');
const result2:{ caseId:string, caseName:string }[] = getAntiquitiesListByRegion('臺北市士林區');
// 呼叫古蹟
const result3:IMonuments = getMonumentsIntroduce('19980430000001');
const result4:{ caseId:string, caseName:string }[] = getMonumentsListByRegion('臺北市士林區');


// note: when their is no result ,return "undefined"
```
