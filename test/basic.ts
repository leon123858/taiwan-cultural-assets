/**
 * should install typescript, ts-node, mocha local
 */

import { expect } from 'chai';
import {
	getAntiquitiesIntroduce,
	getAntiquitiesListByRegion,
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
	it(`Should construct 古蹟`, async () => {});
	it(`Should construct 古物列表`, async () => {
		const json = await import('../src/assets/id2Antiquities');
		expect(Object.keys(json.default).length > 20).is.true;
		const json2 = await import('../src/assets/region2Id');
		expect(Object.keys(json2.default).length > 20).is.true;
	});
	it(`Should construct 古蹟列表`, async () => {});
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
	it(`Should get 古蹟 introduce`, async () => {});
	it(`Should get 古蹟 List`, async () => {});
});
