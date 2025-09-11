// global-types.d.ts

declare module "*.png" {
    const value: number;
    export default value;
}

declare module "*.jpg" {
    const value: number;
    export default value;
}

declare module "*.jpeg" {
    const value: number;
    export default value;
}

declare module "*.gif" {
    const value: number;
    export default value;
}

declare module "*.wav" {
    const value: number;
    export default value;
}

declare module "*.mp3" {
    const value: number;
    export default value;
}

// Help TypeScript understand require() for assets
declare const require: {
    (path: string): any;
};
