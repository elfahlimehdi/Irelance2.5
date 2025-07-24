/*
  # Seed Data for IRELANCE E-commerce

  1. Categories
  2. Brands
  3. Sample Products
*/

-- Insert Categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Cameras', 'cameras', 'Professional surveillance and security cameras', 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Air Conditioning', 'air-conditioning', 'Cooling and climate control systems', 'https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Security Systems', 'security-systems', 'Complete security and alarm systems', 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Laptops', 'laptops', 'Professional and personal laptops', 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Solar Panels', 'solar-panels', 'Renewable energy solutions', 'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Access Control', 'access-control', 'Door and access management systems', 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Fire Systems', 'fire-systems', 'Fire detection and suppression systems', 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Electronic Equipment', 'electronic-equipment', 'Various electronic devices and components', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400');

-- Insert Brands
INSERT INTO brands (name, slug, logo_url, website) VALUES
('LG', 'lg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LG_logo_%282015%29.svg/200px-LG_logo_%282015%29.svg.png', 'https://www.lg.com'),
('Samsung', 'samsung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png', 'https://www.samsung.com'),
('Acer', 'acer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/200px-Acer_2011.svg.png', 'https://www.acer.com'),
('Asus', 'asus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/200px-ASUS_Logo.svg.png', 'https://www.asus.com'),
('Hager', 'hager', 'https://www.hager.com/themes/custom/hager/logo.svg', 'https://www.hager.com'),
('Hikvision', 'hikvision', 'https://www.hikvision.com/content/dam/hikvision/en/marketing/brand/logo/hikvision-logo-min.png', 'https://www.hikvision.com'),
('Ingelec', 'ingelec', '/brands/ingelec-logo.png', 'https://www.ingelec.ma'),
('Dell', 'dell', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/200px-Dell_Logo.svg.png', 'https://www.dell.com'),
('Simon', 'simon', '/brands/simon-logo.png', 'https://www.simonelectric.com'),
('HP', 'hp', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/200px-HP_logo_2012.svg.png', 'https://www.hp.com');

-- Get category and brand IDs for sample products
DO $$
DECLARE
    camera_cat_id uuid;
    ac_cat_id uuid;
    security_cat_id uuid;
    laptop_cat_id uuid;
    solar_cat_id uuid;
    
    hikvision_brand_id uuid;
    lg_brand_id uuid;
    samsung_brand_id uuid;
    dell_brand_id uuid;
    hp_brand_id uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO camera_cat_id FROM categories WHERE slug = 'cameras';
    SELECT id INTO ac_cat_id FROM categories WHERE slug = 'air-conditioning';
    SELECT id INTO security_cat_id FROM categories WHERE slug = 'security-systems';
    SELECT id INTO laptop_cat_id FROM categories WHERE slug = 'laptops';
    SELECT id INTO solar_cat_id FROM categories WHERE slug = 'solar-panels';
    
    -- Get brand IDs
    SELECT id INTO hikvision_brand_id FROM brands WHERE slug = 'hikvision';
    SELECT id INTO lg_brand_id FROM brands WHERE slug = 'lg';
    SELECT id INTO samsung_brand_id FROM brands WHERE slug = 'samsung';
    SELECT id INTO dell_brand_id FROM brands WHERE slug = 'dell';
    SELECT id INTO hp_brand_id FROM brands WHERE slug = 'hp';

    -- Insert sample products
    INSERT INTO products (name, slug, description, short_description, price, compare_price, brand_id, category_id, images, specifications, features, availability, stock_quantity, sku, warranty_period) VALUES
    
    -- Cameras
    ('Hikvision DS-2CD2143G0-I 4MP IP Camera', 'hikvision-ds-2cd2143g0-i-4mp', 'Professional 4MP network dome camera with excellent low-light performance and smart detection features. Perfect for indoor and outdoor surveillance applications.', '4MP IP dome camera with smart detection', 2500.00, 2800.00, hikvision_brand_id, camera_cat_id, 
     ARRAY['https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"resolution": "4MP (2688×1520)", "lens": "2.8mm fixed", "night_vision": "30m IR", "compression": "H.265+/H.265/H.264+/H.264"}',
     ARRAY['4MP high resolution', 'Smart detection', 'IR night vision', 'Weatherproof IP67', 'PoE powered'],
     true, 25, 'HIK-DS2CD2143G0I', '3 years'),
     
    ('Hikvision DS-2DE4A425IW-DE PTZ Camera', 'hikvision-ds-2de4a425iw-de-ptz', 'Advanced 4MP PTZ camera with 25x optical zoom and intelligent tracking capabilities. Ideal for large area surveillance.', '4MP PTZ camera with 25x zoom', 8500.00, 9200.00, hikvision_brand_id, camera_cat_id,
     ARRAY['https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"resolution": "4MP", "zoom": "25x optical", "pan_range": "360°", "tilt_range": "-15° to +90°"}',
     ARRAY['25x optical zoom', 'Auto tracking', '360° pan rotation', 'Smart detection', 'Weatherproof'],
     true, 8, 'HIK-DS2DE4A425IWDE', '3 years'),
    
    -- Air Conditioning
    ('LG Dual Inverter 18000 BTU Split AC', 'lg-dual-inverter-18000-btu', 'Energy-efficient dual inverter air conditioner with fast cooling and quiet operation. Perfect for medium to large rooms.', 'Energy-efficient 18000 BTU split AC', 12500.00, 13500.00, lg_brand_id, ac_cat_id,
     ARRAY['https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"capacity": "18000 BTU/h", "energy_rating": "A++", "refrigerant": "R32", "noise_level": "19dB"}',
     ARRAY['Dual Inverter technology', 'Energy saving', 'Fast cooling', 'Quiet operation', 'WiFi control'],
     true, 15, 'LG-DUALINV18K', '5 years compressor'),
     
    ('Samsung Wind-Free 24000 BTU', 'samsung-wind-free-24000-btu', 'Revolutionary Wind-Free cooling technology that cools gently and quietly without direct cold air flow.', 'Wind-Free technology 24000 BTU AC', 15800.00, 17000.00, samsung_brand_id, ac_cat_id,
     ARRAY['https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"capacity": "24000 BTU/h", "energy_rating": "A+++", "technology": "Wind-Free", "coverage": "40-50 sqm"}',
     ARRAY['Wind-Free cooling', 'Digital Inverter', 'SmartThings compatible', 'Fast cooling mode', 'Easy filter cleaning'],
     true, 12, 'SAM-WINDFREE24K', '10 years compressor'),
    
    -- Laptops
    ('Dell Latitude 5520 Business Laptop', 'dell-latitude-5520-business', 'Professional business laptop with Intel Core i7, 16GB RAM, and 512GB SSD. Perfect for business professionals.', 'Intel i7 business laptop with 16GB RAM', 18500.00, 20000.00, dell_brand_id, laptop_cat_id,
     ARRAY['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"processor": "Intel Core i7-1165G7", "ram": "16GB DDR4", "storage": "512GB SSD", "display": "15.6 FHD", "graphics": "Intel Iris Xe"}',
     ARRAY['Intel Core i7 processor', '16GB RAM', '512GB SSD', 'Full HD display', 'Business grade security'],
     true, 20, 'DELL-LAT5520-I7', '3 years'),
     
    ('HP EliteBook 840 G8', 'hp-elitebook-840-g8', 'Premium business laptop with advanced security features and long battery life. Designed for mobile professionals.', 'Premium business laptop with security features', 22000.00, 24000.00, hp_brand_id, laptop_cat_id,
     ARRAY['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"processor": "Intel Core i7-1185G7", "ram": "16GB DDR4", "storage": "1TB SSD", "display": "14 FHD", "battery": "Up to 12 hours"}',
     ARRAY['Intel Core i7 vPro', 'Sure View privacy screen', 'Fingerprint reader', 'Long battery life', 'MIL-STD tested'],
     true, 10, 'HP-ELITE840G8', '3 years'),
    
    -- Security Systems
    ('Complete Wireless Alarm System', 'complete-wireless-alarm-system', 'Comprehensive wireless security system with door/window sensors, motion detectors, and smartphone app control.', 'Complete wireless security system kit', 4500.00, 5000.00, hikvision_brand_id, security_cat_id,
     ARRAY['https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"sensors": "8 door/window + 4 motion", "range": "Up to 100m", "connectivity": "WiFi + GSM", "app": "iOS/Android"}',
     ARRAY['Wireless installation', 'Smartphone control', 'GSM backup', '24/7 monitoring ready', 'Expandable system'],
     true, 18, 'SEC-WIRELESS-KIT', '2 years'),
    
    -- Solar Panels
    ('Monocrystalline Solar Panel 400W', 'monocrystalline-solar-panel-400w', 'High-efficiency monocrystalline solar panel with 25-year warranty. Perfect for residential and commercial installations.', 'High-efficiency 400W solar panel', 1800.00, 2000.00, lg_brand_id, solar_cat_id,
     ARRAY['https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=600'],
     '{"power": "400W", "efficiency": "21.1%", "voltage": "24V", "dimensions": "2108×1048×35mm", "weight": "22kg"}',
     ARRAY['High efficiency 21.1%', 'Monocrystalline technology', '25-year warranty', 'Weather resistant', 'Easy installation'],
     true, 50, 'SOLAR-MONO400W', '25 years');

END $$;