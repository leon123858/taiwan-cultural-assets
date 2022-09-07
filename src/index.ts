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
 * 拆分連在一起的字串和地區
 * @param cityArea
 * @returns [城市,地區]
 * @example
 * const tmp = splitTaiwanAreas("宜蘭縣宜蘭市");
 * console.log(tmp) // [宜蘭縣,宜蘭市]
 */
function splitTaiwanAreas(cityArea: string) {
	const cities = Object.keys(areas);
	const city = cities.find((element) => {
		return cityArea.indexOf(element) === 0;
	});
	if (!city) {
		throw new Error('string not mapping to any city in taiwan');
	}
	return [city, cityArea.slice(city.length)] as [string, string];
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
/**
 * @description 獲取古物 id 列表
 * @returns string[] 古物 id 列表
 */
function getAntiquitiesIdList() {
	return Antiquities.map((v) => v.caseId) as string[];
}

export {
	getAntiquitiesIntroduce,
	getAntiquitiesListByRegion,
	getMonumentsIntroduce,
	getMonumentsListByRegion,
	taiwanCities,
	taiwanCitiesAreas,
	getAntiquitiesIdList,
	splitTaiwanAreas,
	IAntiquities,
	IMonuments,
};
