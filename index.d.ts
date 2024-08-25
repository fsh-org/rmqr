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
    }, format?: string | null, type?: string | null, size?: number | null): any;
}
export const strategy: {
    balanced: number;
    'min-height': number;
    minHeight: number;
    'min-width': number;
    minWidth: number;
};
export namespace correction {
    let auto: number;
    let medium: number;
    let high: number;
}
export { rMQR as rmqr };
