CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE attributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    data_type TEXT NOT NULL CHECK (data_type IN ('string', 'number', 'boolean', 'date')),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE product_attribute_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    attribute_id UUID NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,

    -- Value columns (only one is used based on data_type)
    string_value TEXT,
    number_value NUMERIC,
    boolean_value BOOLEAN,
    date_value DATE,

    created_at TIMESTAMP DEFAULT now(),

    UNIQUE (product_id, attribute_id)
);

SELECT p.*
FROM products p
JOIN product_attribute_values v ON v.product_id = p.id
JOIN attributes a ON a.id = v.attribute_id
WHERE a.name = 'color' AND v.string_value = 'Red';