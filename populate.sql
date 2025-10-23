USE ecommerce;

-- ========================================
-- 1. STORES
-- ========================================
INSERT INTO stores (name, description, logoUrl, email, phone, ratings, createdAt, updatedAt)
VALUES
('TechStore Recife', 'Loja especializada em eletrônicos e notebooks de alto desempenho.', 'https://example.com/techstore-logo.jpg', 'contato@techstore.com', '81999990001', 4.8, NOW(), NOW()),
('MobileCenter', 'Loja de smartphones, acessórios e gadgets.', 'https://example.com/mobilecenter-logo.jpg', 'suporte@mobilecenter.com', '81999990002', 4.5, NOW(), NOW()),
('BookWorld', 'Livraria com vasta coleção de clássicos e lançamentos.', 'https://example.com/bookworld-logo.jpg', 'contato@bookworld.com', '81999990003', 4.7, NOW(), NOW()),
('FashionHub', 'Roupas e acessórios esportivos e casuais.', 'https://example.com/fashionhub-logo.jpg', 'vendas@fashionhub.com', '81999990004', 4.6, NOW(), NOW()),
('SoundHouse', 'Equipamentos de áudio e fones de ouvido de alta qualidade.', 'https://example.com/soundhouse-logo.jpg', 'info@soundhouse.com', '81999990005', 4.9, NOW(), NOW());

-- ========================================
-- 2. USERS
-- ========================================
INSERT INTO users (name, email, password, address, role)
VALUES 
('Alice Souza', 'alice@example.com', 'hashedpassword1', 'Rua das Flores, 123 - Recife', 'client'),
('Bruno Lima', 'bruno@example.com', 'hashedpassword2', 'Av. Boa Viagem, 450 - Recife', 'owner'),
('Carla Mendes', 'carla@example.com', 'hashedpassword3', 'Rua Verde, 78 - Olinda', 'admin'),
('Daniel Rocha', 'daniel@example.com', 'hashedpassword4', 'Rua Central, 22 - Jaboatão', 'client'),
('Elisa Torres', 'elisa@example.com', 'hashedpassword5', 'Rua da Praia, 90 - Paulista', 'owner');

-- ========================================
-- 3. PRODUCTS
-- ========================================
INSERT INTO products (storeId, name, description, price, imageUrl, stock)
VALUES
(1, 'Notebook Dell Inspiron', 'Notebook de alto desempenho com 16GB RAM e SSD 512GB', 4800.00, 'https://example.com/notebook.jpg', 10),
(2, 'Smartphone Samsung A55', 'Smartphone com ótima câmera e bateria de longa duração', 2200.00, 'https://example.com/samsung.jpg', 25),
(5, 'Fone Bluetooth JBL', 'Fone sem fio com cancelamento de ruído e microfone embutido', 350.00, 'https://example.com/jbl.jpg', 40),
(3, 'Livro - Dom Casmurro', 'Clássico da literatura brasileira, de Machado de Assis', 45.90, 'https://example.com/domcasmurro.jpg', 100),
(4, 'Camiseta Esportiva Nike', 'Camiseta leve e respirável para treinos', 129.99, 'https://example.com/nike.jpg', 50);

-- ========================================
-- 4. ORDER GROUPS
-- ========================================
INSERT INTO orders_group (userId, totalShipping, totalAmount, createdAt)
VALUES
(1, 30.00, 4830.00, NOW()),
(2, 25.00, 2225.00, NOW()),
(4, 15.00, 365.00, NOW()),
(1, 20.00, 149.99, NOW()),
(5, 40.00, 5000.00, NOW());

-- ========================================
-- 5. ORDERS
-- ========================================
INSERT INTO orders (userId, productId, orderGroupId, quantity, price, shipping, totalAmount, createdAt)
VALUES
(1, 1, 1, 1, 4800.00, 30.00, 4830.00, NOW()),
(2, 2, 2, 1, 2200.00, 25.00, 2225.00, NOW()),
(4, 3, 3, 1, 350.00, 15.00, 365.00, NOW()),
(1, 5, 4, 1, 129.99, 20.00, 149.99, NOW()),
(5, 1, 5, 1, 4960.00, 40.00, 5000.00, NOW());

-- ========================================
-- 6. REVIEWS
-- ========================================
INSERT INTO reviews (userId, productId, rating, comment, createdAt)
VALUES
(1, 1, 5, 'Produto excelente! Muito rápido e silencioso.', NOW()),
(2, 2, 4, 'Bom custo-benefício, mas poderia ter mais memória.', NOW()),
(4, 3, 5, 'Som muito limpo e ótimo isolamento acústico.', NOW()),
(1, 4, 5, 'Um clássico que nunca envelhece.', NOW()),
(5, 5, 3, 'Boa qualidade, mas achei o preço um pouco alto.', NOW());
