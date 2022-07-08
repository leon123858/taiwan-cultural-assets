import Antiquities from './assets/Antiquities';
import id2Antiquities from './assets/id2Antiquities';
import region2Id from './assets/region2Id';
import { IAntiquities } from './types';
/**
 * @description 獲取古物詳細資料
 * @param AntiquitiesId
 * @returns
 */
function getAntiquitiesIntroduce(AntiquitiesId: string) {
	const index = id2Antiquities[AntiquitiesId];
	return Antiquities[index] as IAntiquities;
}
/**
 * @description 利用地點獲取古物列表
 * @param region 地點 ex:宜蘭縣宜蘭市
 * @returns Object {caseId:古物編號, caseName:古物名稱}
 */
function getAntiquitiesListByRegion(region: string) {
	return region2Id[region] as {
		caseId: string;
		caseName: string;
	}[];
}

export { getAntiquitiesIntroduce, getAntiquitiesListByRegion };
