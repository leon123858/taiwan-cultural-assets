import fetch from 'node-fetch';
import prompts from 'prompts';
import fs from 'fs/promises';
import { MODE, URL, DATA_SOURCE, ASSETS_PATH } from './const.mjs';

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
	const promiseList = [];
	promiseList.push(
		fs.writeFile(
			`${ASSETS_PATH}Antiquities.ts`,
			'export default' + JSON.stringify(list) + ' as any[]',
			{
				encoding: 'utf-8',
			}
		)
	);
	promiseList.push(
		fs.writeFile(
			`${ASSETS_PATH}id2Antiquities.ts`,
			'export default' +
				JSON.stringify(id2Antiquities) +
				' as {[key:string]:number}',
			{
				encoding: 'utf-8',
			}
		)
	);
	promiseList.push(
		fs.writeFile(
			`${ASSETS_PATH}region2Id.ts`,
			'export default' +
				JSON.stringify(region2Id) +
				' as {[key:string]:{caseId:string,caseName:string}[]}',
			{
				encoding: 'utf-8',
			}
		)
	);
	await Promise.all(promiseList);
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
			break;
		case MODE.古物:
			await fetchAntiquities();
			break;
		case MODE.古蹟:
			console.log('to do, but wait PM');
			break;
		case MODE.自訂:
			break;
		default:
			console.log('should choose mode');
			break;
	}
};

main()
	.then(() => console.log('process end success'))
	.catch((err) => console.log(err));
