// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	手机: [
		{
			name: "Redmi K20 Pro",
			image: "/images/device/redmik20pro.webp",
			specs: "骁龙 855 / 6.39″ 真全面屏",
			description:
				"弹出式前摄 + 真全面屏，2019 年的经典机器，至今仍是我心里的红米巅峰。",
			link: "https://www.mi.com/redmik20pro",
		},
		{
			name: "HUAWEI Mate 80",
			image: "/images/device/mate80.webp",
			specs: "麒麟 9020 / HarmonyOS 6",
			description:
				"6.75 英寸直屏，麒麟 9020 加持，红枫影像与原色显示，日常主力机。",
			link: "https://consumer.huawei.com/cn/phones/mate80/",
		},
	],
	平板: [
		{
			name: "HUAWEI MatePad Pro 12",
			image: "/images/device/matepadpro.webp",
			specs: "3K 柔性 OLED / 10100mAh",
			description:
				"12 英寸 3K 柔性 OLED 大屏，超轻超薄，看片、记笔记和远程办公都够用。",
			link: "https://consumer.huawei.com/cn/tablets/matepad-pro-12/",
		},
	],
	路由器: [
		{
			name: "GL-MT3000",
			image: "/images/device/mt3000.webp",
			specs: "1000Mbps / 2.5G",
			description:
				"随身 WiFi 6 路由器，出差和家用都合适。",
			link: "https://www.gl-inet.cn/products/gl-mt3000/",
		},
	],
};
