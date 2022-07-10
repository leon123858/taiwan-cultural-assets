/**
 * should install typescript, ts-node, mocha local
 */

import { expect } from 'chai';
import {
	getAntiquitiesIntroduce,
	getAntiquitiesListByRegion,
	getMonumentsIntroduce,
	getMonumentsListByRegion,
	taiwanCities,
	taiwanCitiesAreas,
} from '../src/index';

describe(`script execute success`, function () {
	this.timeout(5 * 1000);
	before(async () => {
		// should run "yarn script first"
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
			'釣魚臺',
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
			'南海島',
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
});
