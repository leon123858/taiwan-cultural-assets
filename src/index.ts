import Antiquities from './assets/Antiquities';
import id2Antiquities from './assets/id2Antiquities';
import region2Antiquities from './assets/region2Antiquities';
import Monuments from './assets/Monuments';
import id2Monuments from './assets/id2Monuments';
import region2Monuments from './assets/region2Monuments';
import areas from './assets/city_area';
import { IAntiquities, IMonuments } from './types';
/**
 * @description 獲取台灣縣市列表
 * @returns string[]
 */
function taiwanCities() {
	return Object.keys(areas);
}
/**
 * @description 依台灣縣市回傳鄉鎮區列表
 * @param cityName 台灣縣市
 * @returns string[]
 */
function taiwanCitiesAreas(cityName: string) {
	return areas[cityName] as string[];
}

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
	return region2Antiquities[region] as {
		caseId: string;
		caseName: string;
	}[];
}

/**
 * @description 獲取古蹟詳細資料
 * @param AntiquitiesId
 * @returns
 */
function getMonumentsIntroduce(MonumentsId: string) {
	const index = id2Monuments[MonumentsId];
	return Monuments[index] as IMonuments;
}
/**
 * @description 利用地點獲取古蹟列表
 * @param region 地點 ex:宜蘭縣宜蘭市
 * @returns Object {caseId:古蹟編號, caseName:古蹟名稱}
 */
function getMonumentsListByRegion(region: string) {
	return region2Monuments[region] as {
		caseId: string;
		caseName: string;
	}[];
}

export {
	getAntiquitiesIntroduce,
	getAntiquitiesListByRegion,
	getMonumentsIntroduce,
	getMonumentsListByRegion,
	taiwanCities,
	taiwanCitiesAreas,
	IAntiquities,
	IMonuments,
};
