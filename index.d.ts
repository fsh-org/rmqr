declare const strategy: {
    balanced: number;
    'min-height': number;
    minHeight: number;
    'min-width': number;
    minWidth: number;
};
declare const correction: {
    auto: number;
    medium: number;
    high: number;
};
declare class rMQR {
    /**
  * @param {string} text
  * @param {{ strategy?: number; correction?: number; }} options
  */
    generate(text: string, options?: {
        strategy?: number;
        correction?: number;
    }): Promise<any>;
    /**
  * @param {{ qr: number[][]; width: number; height: number; }} data
  * @param {string?} format
  * @param {string?} type
  * @param {number?} size
  */
    toImage(data: {
        qr: number[][];
        width: number;
        height: number;
    }, format?: string, type?: string, size?: number): Promise<string|unknown>;
}
export { rMQR as rmqr };
