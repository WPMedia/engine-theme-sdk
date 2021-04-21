const isServerSide = (): boolean => typeof window === 'undefined';

export default isServerSide;
