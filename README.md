# taiwan-cultural-assets

the wrapper about OpenAPI(data.boch.gov.tw/data) for taiwan cultural-assets

## example

```
import {
	getAntiquitiesIdList,
  getAntiquitiesIntroduce,
	getAntiquitiesListByRegion,
	getMonumentsIntroduce,
	getMonumentsListByRegion,
	taiwanCities,
	taiwanCitiesAreas,
	IAntiquities,
	IMonuments,
} from "taiwan-cultural-assets"

// 呼叫古物
const result:IAntiquities = getAntiquitiesIntroduce('20140815000001');
const result2:{ caseId:string, caseName:string }[] = getAntiquitiesListByRegion('臺北市士林區');
// 呼叫古蹟
const result3:IMonuments = getMonumentsIntroduce('19980430000001');
const result4:{ caseId:string, caseName:string }[] = getMonumentsListByRegion('臺北市士林區');
// 臺灣縣市列表
console.log(taiwanCities() as string[]);
// 台灣縣市的區域
console.log(taiwanCitiesAreas('臺北市') as string[]);
// 獲取全部古物 id
console.log(getAntiquitiesIdList());
// 分割城市加地區的字串
console.log(splitTaiwanAreas("宜蘭縣宜蘭市") as [string,string]) // [宜蘭縣,宜蘭市]

// note: when their is no result ,return "undefined"
```
