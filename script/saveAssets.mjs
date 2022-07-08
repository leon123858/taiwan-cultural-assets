import { ASSETS_PATH } from './const.mjs';
import fs from 'fs/promises';

export const saveAssets = async (dataList, nameList) => {
	const promiseList = [];
	promiseList.push(
		fs.writeFile(
			`${ASSETS_PATH}${nameList[0]}.ts`,
			'export default' + JSON.stringify(dataList[0]) + ' as any[]',
			{
				encoding: 'utf-8',
			}
		)
	);
	promiseList.push(
		fs.writeFile(
			`${ASSETS_PATH}${nameList[1]}.ts`,
			'export default' +
				JSON.stringify(dataList[1]) +
				' as {[key:string]:number}',
			{
				encoding: 'utf-8',
			}
		)
	);
	promiseList.push(
		fs.writeFile(
			`${ASSETS_PATH}${nameList[2]}.ts`,
			'export default' +
				JSON.stringify(dataList[2]) +
				' as {[key:string]:{caseId:string,caseName:string}[]}',
			{
				encoding: 'utf-8',
			}
		)
	);
	await Promise.all(promiseList);
};
