export interface IAntiquities {
	/**@description 古物編號*/
	caseId: string;
	/**@description 圖片網址*/
	representImage: string;
	/**@description 古物名稱*/
	caseName: string; //古物名稱
	/**@description 古物級別*/
	assetsClassifyName: string; //古物級別
	/**@description 古物年代*/
	descAge: string; //古物年代
	/**@description 尺寸*/
	descSize: string; //尺寸
	/**@description 古物材料*/
	descMaterial: string; //古物材料
	/**@description 保存狀態*/
	reserveStatus: string; //保存狀態
	/**@description 保管單位*/
	holder: string[]; //保管單位
	/**@description 主管機關*/
	manager: string[]; //主管機關
	/**@description 保存單位*/
	place: string[]; //保存單位
	/**@description 保存地址*/
	address: string[]; //保存地址
	/**@description 保存空間屬性*/
	saveSpace: string[]; //保存空間屬性
	/**@description 保存空間文資身分*/
	saveSpaceId: string[]; //保存空間文資身分
	/**@description 保存環境*/
	environment: string; //保存環境
	/**@description 古物件數*/
	amount: number; //古物件數
	/**@description 資料來源*/
	dataSource: string; //資料來源
}
/**
 * caseName(古蹟名稱)
caseId(古蹟代碼)
assetsClassifyName(古蹟級別)
assetsTypes
[{"name"}]（古蹟種類）
govInstitutionName(主管機關)
belongAddress(古蹟地址)
belongCity(所在地區)
govInstitution(機關名稱)
govDeptName(主管單位)
govDeptPhone(機關電話)
 */
export interface IMonuments {}
