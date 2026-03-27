INSERT INTO organisations (id, name, sector, entity_type, registered_address, regulated_entity, identifier_type, identifier_value, fiu_registration_number)
VALUES 
(gen_random_uuid(), 'ICICI Bank', 'Banking', 'Public Limited Company', 'Mumbai, India', true, 'PAN', 'ICICI12345', NULL),
(gen_random_uuid(), 'HDFC Bank', 'Banking', 'Public Limited Company', 'Mumbai, India', true, 'PAN', 'HDFC12345', NULL),
(gen_random_uuid(), 'Axis Bank', 'Banking', 'Public Limited Company', 'Mumbai, India', true, 'PAN', 'AXIS12345', NULL)
ON CONFLICT (identifier_type, identifier_value) DO NOTHING;
