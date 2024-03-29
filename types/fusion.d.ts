declare module "fusion:environment";

declare module "fusion:static" {
	const fusionStatic: React.ComponentType<{ id: string }>;
	export default fusionStatic;
}

declare module "fusion:context";

declare module "fusion:properties";

declare module "fusion:themes";

declare const Fusion: {
	deployment?: string;
};
