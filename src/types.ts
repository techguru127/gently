export interface Product {
    id?: number;
    sku: string;
    name: string;
    attributes: Record<string, any>;
}