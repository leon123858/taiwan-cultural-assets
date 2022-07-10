import fetch from 'node-fetch';
import prompts from 'prompts';
//import { readFile } from 'fs/promises';
import { saveAssets } from './saveAssets.mjs';
import { MODE, URL, DATA_SOURCE } from './const.mjs';

const fetchAntiquities = async () => {
	const response = await fetch(URL.古物);
	const data = await response.json();
	const region2Id = {};
	const id2Antiquities = {};
	const list = data.map((element, index) => {
		const {
			caseId,
			belongCity,
			representImage = '',
			caseName = '缺失名稱資訊',
			assetsClassifyName = '缺失級別資訊',
			descSize = '',
			descAge = '',
			descMaterial = '',
			keepDepts = [],
			keepPlaces = [],
			environment = '',
			//reserveStatus = '',
			amount = 1,
		} = element;
		if (caseId) {
			id2Antiquities[caseId] = index;
		}
		if (caseId && belongCity) {
			region2Id[belongCity]
				? region2Id[belongCity].push({ caseId, caseName })
				: (region2Id[belongCity] = [{ caseId, caseName }]);
		}
		return {
			caseId,
			representImage, //圖片網址
			caseName, //古物名稱
			assetsClassifyName, //古物級別
			descAge, //古物年代
			descSize, //尺寸
			descMaterial, //古物材料
			reserveStatus: '', //保存狀態
			holder: keepDepts.map((who) => who.name), //保管單位
			manager: keepDepts.map((who) => who.govInstitutionName), //主管機關
			place: keepPlaces.map((place) => place.name), //保存單位
			address: keepPlaces.map((place) => place.address), //保存地址
			saveSpace: keepPlaces.map((place) => place.saveSpace), //保存空間屬性
			saveSpaceId: keepPlaces.map((place) => place.saveSpaceIdentity), //保存空間文資身分
			environment, //保存環境
			amount, //古物件數
			dataSource: DATA_SOURCE, //資料來源
		};
	});
	await saveAssets(
		[list, id2Antiquities, region2Id],
		['Antiquities', 'id2Antiquities', 'region2Antiquities']
	);
};

const fetchMonuments = async () => {
	const response = await fetch(URL.古蹟);
	const data = await response.json();
	const region2Id = {};
	const id2Monuments = {};
	const list = data.map((element, index) => {
		const {
			caseId,
			belongCity,
			representImage = '',
			caseName = '缺失名稱資訊',
			assetsClassifyName = '缺失級別資訊',
			assetsTypes = '',
			govInstitutionName = '',
			belongAddress = '',
			govInstitution = '',
			govDeptName = '',
			govDeptPhone = '',
		} = element;
		if (caseId) {
			id2Monuments[caseId] = index;
		}
		if (caseId && belongCity) {
			region2Id[belongCity]
				? region2Id[belongCity].push({ caseId, caseName })
				: (region2Id[belongCity] = [{ caseId, caseName }]);
		}
		return {
			caseId,
			belongCity,
			representImage,
			caseName,
			assetsClassifyName,
			assetsTypes: assetsTypes.map((element) => element.name),
			govInstitutionName,
			belongAddress,
			govInstitution,
			govDeptName,
			govDeptPhone,
		};
	});
	await saveAssets(
		[list, id2Monuments, region2Id],
		['Monuments', 'id2Monuments', 'region2Monuments']
	);
};

const main = async () => {
	console.log('此操作會覆蓋過去資料,請確認後再使用');
	const mode = (
		await prompts({
			type: 'select',
			name: 'mode',
			message: '想做甚麼?',
			choices: [
				{ title: '更新全部資訊', value: MODE.全部 },
				{ title: '更新古物資訊', value: MODE.古物 },
				{ title: '更新古蹟資訊', value: MODE.古蹟 },
				{ title: '自訂義DBA腳本', value: MODE.自訂 },
				{ title: '放棄', value: null },
			],
		})
	).mode;
	switch (mode) {
		case MODE.全部:
			await Promise.all([fetchAntiquities(), fetchMonuments()]);
			break;
		case MODE.古物:
			await fetchAntiquities();
			break;
		case MODE.古蹟:
			await fetchMonuments();
			break;
		case MODE.自訂:
			// const jsonList = JSON.parse(await readFile('./script/city_county.json'));
			// const cityList = jsonList.map((v) => {
			// 	return {
			// 		name: v.CityName,
			// 		list: v.AreaList.map((sv) => sv.AreaName),
			// 	};
			// });
			// console.log(cityList);
			// const obj = {};
			// cityList.forEach((element) => {
			// 	obj[element.name] = element.list;
			// });
			// console.log(obj);
			break;
		default:
			console.log('should choose mode');
			break;
	}
};

main()
	.then(() => console.log('process end success'))
	.catch((err) => console.log(err));
