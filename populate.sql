USE `freedb_ecommerce-test`;

-- ========================================
-- 1. STORES
-- ========================================
INSERT INTO stores (name, description, logoUrl, email, phone, ratings, createdAt, updatedAt)
VALUES
('TechStore Recife', 'Loja especializada em eletrônicos e notebooks de alto desempenho.', 'https://i.pinimg.com/736x/87/21/df/8721dfd04bceae654cdbdfcdc1d0658d.jpg', 'contato@techstore.com', '81999990001', 4.8, NOW(), NOW()),
('MobileCenter', 'Loja de smartphones, acessórios e gadgets.', 'https://i.pinimg.com/736x/87/21/df/8721dfd04bceae654cdbdfcdc1d0658d.jpg', 'suporte@mobilecenter.com', '81999990002', 4.5, NOW(), NOW()),
('BookWorld', 'Livraria com vasta coleção de clássicos e lançamentos.', 'https://i.pinimg.com/736x/87/21/df/8721dfd04bceae654cdbdfcdc1d0658d.jpg', 'contato@bookworld.com', '81999990003', 4.7, NOW(), NOW()),
('FashionHub', 'Roupas e acessórios esportivos e casuais.', 'https://i.pinimg.com/736x/87/21/df/8721dfd04bceae654cdbdfcdc1d0658d.jpg', 'vendas@fashionhub.com', '81999990004', 4.6, NOW(), NOW()),
('SoundHouse', 'Equipamentos de áudio e fones de ouvido de alta qualidade.', 'https://i.pinimg.com/736x/87/21/df/8721dfd04bceae654cdbdfcdc1d0658d.jpg', 'info@soundhouse.com', '81999990005', 4.9, NOW(), NOW());

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
(1, 'Notebook Dell Inspiron', 'Notebook de alto desempenho com 16GB RAM e SSD 512GB', 4800.00, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 10),
(2, 'Smartphone Samsung A55', 'Smartphone com ótima câmera e bateria de longa duração', 2200.00, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 25),
(5, 'Fone Bluetooth JBL', 'Fone sem fio com cancelamento de ruído e microfone embutido', 350.00, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 40),
(3, 'Livro - Dom Casmurro', 'Clássico da literatura brasileira, de Machado de Assis', 45.90, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 100),
(4, 'Camiseta Esportiva Nike', 'Camiseta leve e respirável para treinos', 129.99, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 50),
(1, 'Mouse Gamer Redragon', 'Mouse ergonômico com sensor de alta precisão e LEDs RGB', 199.99, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 30),
(1, 'Monitor LG Ultrawide', 'Monitor de 29 polegadas com resolução Full HD', 1350.00, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 15),
(2, 'Capa de Silicone Samsung', 'Capa protetora resistente para Galaxy A55', 89.90, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 80),
(3, 'Livro - 1984', 'Obra distópica de George Orwell, essencial para amantes da literatura.', 59.90, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 120),
(4, 'Tênis Adidas Runfalcon', 'Tênis confortável para corridas leves e caminhadas.', 299.99, 'https://i.pinimg.com/1200x/ec/fc/c2/ecfcc23bf2b34c2798adb155b48516d6.jpg', 45);

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
(5, 5, 3, 'Boa qualidade, mas achei o preço um pouco alto.', NOW()),
(3, 1, 4, 'Funciona bem, mas o carregador esquenta um pouco.', NOW()),
(2, 3, 5, 'Excelente qualidade de som! Uso todos os dias.', NOW()),
(5, 2, 4, 'Notebook rápido, só peca um pouco na bateria.', NOW()),
(4, 4, 5, 'História envolvente, recomendo muito.', NOW()),
(3, 5, 2, 'Esperava mais pelo preço, acabamento simples.', NOW()),
(1, 2, 5, 'Perfeito para o trabalho e estudos. Super leve.', NOW()),
(2, 1, 3, 'Bom celular, mas o sistema trava às vezes.', NOW()),
(5, 3, 5, 'Headset maravilhoso, ótimo microfone.', NOW()),
(3, 4, 4, 'Livro muito bom, só achei o final previsível.', NOW()),
(4, 5, 4, 'Qualidade boa e entrega rápida.', NOW()),
(1, 6, 5, 'Mouse muito preciso e confortável.', NOW()),
(2, 7, 4, 'Imagem linda, mas os cabos poderiam ser maiores.', NOW()),
(3, 8, 5, 'Capa super resistente e bonita.', NOW()),
(4, 9, 5, 'Leitura incrível, fez refletir bastante.', NOW()),
(5, 10, 4, 'Tênis leve e confortável, ótimo para academia.', NOW());
