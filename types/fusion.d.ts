declare module 'fusion:environment';

declare module 'fusion:static' {
    const fusionStatic: React.ComponentType<{id: string; htmlOnly?: boolean}>;
    export default fusionStatic;
}

declare module 'fusion:context';

declare module 'fusion:themes';

declare const Fusion: {
    deployment?: string;
};
