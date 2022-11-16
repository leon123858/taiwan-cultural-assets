/**
 * should install typescript, ts-node, mocha local
 */

import { expect } from 'chai';
import {
	getAntiquitiesIdList,
	getAntiquitiesIntroduce,
	getAntiquitiesListByRegion,
	getMonumentsIntroduce,
	getMonumentsListByRegion,
	taiwanCities,
	taiwanCitiesAreas,
	splitTaiwanAreas,
} from '../src/index';

describe(`script execute success`, function () {
	this.timeout(5 * 1000);
	before(async () => {
		console.log('should run "yarn script first"');
	});
	it(`Should construct 古物`, async () => {
		const list = await import('../src/assets/Antiquities');
		expect(list.default.length > 2000).is.true;
	});
	it(`Should construct 古蹟`, async () => {
		const list = await import('../src/assets/Monuments');
		expect(list.default.length > 1000).is.true;
	});
	it(`Should construct 古物列表`, async () => {
		const json = await import('../src/assets/id2Antiquities');
		expect(Object.keys(json.default).length > 200).is.true;
		const json2 = await import('../src/assets/region2Antiquities');
		expect(Object.keys(json2.default).length > 20).is.true;
	});
	it(`Should construct 古蹟列表`, async () => {
		const json = await import('../src/assets/id2Monuments');
		expect(Object.keys(json.default).length > 200).is.true;
		const json2 = await import('../src/assets/region2Monuments');
		expect(Object.keys(json2.default).length > 20).is.true;
	});
});

describe(`functions get data success`, () => {
	it(`Should get 古物 introduce`, async () => {
		const result = getAntiquitiesIntroduce('55688');
		expect(result).is.undefined;
		const result2 = getAntiquitiesIntroduce('20140815000001');
		expect(result2).is.not.undefined;
		expect(result2).eqls({
			caseId: '20140815000001',
			representImage:
				'https://data.boch.gov.tw/old_upload/_upload/Assets_new/antiquity/39126/photo/pic018.jpg',
			caseName: '臺湾野球史',
			assetsClassifyName: '一般古物',
			descAge: '西元1932年（日治昭和7年）',
			descSize: '長18.6公分  寬12.8公分  厚4.2公分',
			descMaterial: '紙質',
			reserveStatus: '',
			holder: ['財OOOOOOOOOOO'],
			manager: ['嘉義市政府'],
			place: ['財OOOOOOOOOOO'],
			address: ['嘉義市東區忠孝路275號'],
			saveSpace: ['指定/登錄'],
			saveSpaceId: ['府授文資字第1035102952號'],
			environment: '庫房或展覽空間',
			amount: 1,
			dataSource: '文化資料開放服務網',
		});
	});
	it(`Should get 古物 List`, async () => {
		const result = getAntiquitiesListByRegion('AAAAA');
		expect(result).is.undefined;
		const result2 = getAntiquitiesListByRegion('臺北市士林區');
		expect(result2).is.not.undefined;
	});
	it(`Should get 古蹟 introduce`, async () => {
		const result = getMonumentsIntroduce('55688');
		expect(result).is.undefined;
		const result2 = getMonumentsIntroduce('19980430000001');
		expect(result2).is.not.undefined;
		expect(result2).eqls({
			caseId: '19980430000001',
			belongCity: '嘉義市東區',
			representImage:
				'https://data.boch.gov.tw/upload/representImageFile/2021-04-01/13bdb094-e508-467a-8142-00bb424e815a/P_20210319_144805.jpg',
			caseName: '嘉義仁武宮',
			assetsClassifyName: '縣(市)定古蹟',
			assetsTypes: ['寺廟'],
			govInstitutionName: '嘉義市政府',
			belongAddress: '嘉義市東區仁武里8鄰北榮街54號',
			govInstitution: '嘉義市政府文化局',
			govDeptName: '文化資產科',
			govDeptPhone: '2788225#502',
		});
	});
	it(`Should get 古蹟 List`, async () => {
		const result = getMonumentsListByRegion('AAAAA');
		expect(result).is.undefined;
		const result2 = getMonumentsListByRegion('臺北市士林區');
		expect(result2).is.not.undefined;
	});
	it('Should get city_area success', async () => {
		expect(taiwanCities()).eqls([
			'臺北市',
			'基隆市',
			'新北市',
			'連江縣',
			'宜蘭縣',
			'新竹市',
			'新竹縣',
			'桃園市',
			'苗栗縣',
			'臺中市',
			'彰化縣',
			'南投縣',
			'嘉義市',
			'嘉義縣',
			'雲林縣',
			'臺南市',
			'高雄市',
			'澎湖縣',
			'金門縣',
			'屏東縣',
			'臺東縣',
			'花蓮縣',
		]);
		expect(taiwanCitiesAreas('台北市')).is.undefined;
		expect(taiwanCitiesAreas('臺北市')).eqls([
			'中正區',
			'大同區',
			'中山區',
			'松山區',
			'大安區',
			'萬華區',
			'信義區',
			'士林區',
			'北投區',
			'內湖區',
			'南港區',
			'文山區',
		]);
	});
	it('Should get 古物 id list', async () => {
		expect(getAntiquitiesIdList().length).is.greaterThanOrEqual(2400);
	});
	it('Should split city area', async () => {
		const tmp = splitTaiwanAreas('宜蘭縣宜蘭市');
		expect(tmp).eqls(['宜蘭縣', '宜蘭市']);
		const tmp2 = splitTaiwanAreas('臺北市東區');
		expect(tmp2).eqls(['臺北市', '東區']);
		try {
			splitTaiwanAreas('測試市東區');
			throw 'no error';
		} catch (err) {
			expect(err).is.not.eql('no error');
		}
	});
});
