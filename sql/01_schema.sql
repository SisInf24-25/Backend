CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(25),
    lastname VARCHAR(25),
    username VARCHAR(20) NOT NULL UNIQUE,
    mail VARCHAR(50) NOT NULL UNIQUE,
    number CHAR(9),
    password VARCHAR(64) NOT NULL,
    type CHAR(1) NOT NULL CHECK (type IN ('0', '1', '2')),
    active BOOLEAN NOT NULL
);

CREATE TABLE house (
    id SERIAL PRIMARY KEY, 
    title TEXT NOT NULL,
    owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    price NUMERIC(7, 2) NOT NULL,
    n_wc SMALLINT NOT NULL, 
    n_rooms SMALLINT NOT NULL, 
    n_single_beds SMALLINT NOT NULL, 
    n_double_beds SMALLINT NOT NULL, 
    max_guests SMALLINT NOT NULL,
    city VARCHAR(50) NOT NULL, 
    address TEXT NOT NULL,
    lat NUMERIC(8, 6) NOT NULL,
    long NUMERIC(9, 6) NOT NULL,
    conditions BIT(12) NOT NULL, 
    description TEXT,
    public BOOLEAN NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    house_id INTEGER NOT NULL REFERENCES house(id) ON DELETE CASCADE,
    img_link TEXT NOT NULL
);

CREATE TABLE book (
    id SERIAL PRIMARY KEY, 
    guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    guests_number SMALLINT NOT NULL, 
    house_id INTEGER NOT NULL REFERENCES house(id) ON DELETE CASCADE,
    date_in DATE NOT NULL,
    date_out DATE NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE INDEX idx_book ON book(house_id);

CREATE OR REPLACE FUNCTION calculate_price()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar que la fecha de salida sea posterior a la fecha de entrada
    IF NEW.date_out <= NEW.date_in THEN
        RAISE EXCEPTION 'Date';
    END IF;

    -- Obtener el precio por noche de la casa
    SELECT price INTO NEW.price 
    FROM house 
    WHERE id = NEW.house_id;

    -- Calcular el precio total: número de noches * precio por noche
    NEW.price := NEW.price * (NEW.date_out - NEW.date_in);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_or_update_book
BEFORE INSERT OR UPDATE ON book
FOR EACH ROW
EXECUTE FUNCTION calculate_price();


CREATE TABLE house_report (
    id SERIAL PRIMARY KEY, 
    user_reporter INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    house_reported INTEGER NOT NULL REFERENCES house(id) ON DELETE CASCADE, 
    fecha TIMESTAMPTZ NOT NULL,
    viewed BOOLEAN NOT NULL
);

CREATE TABLE user_report(
    id SERIAL PRIMARY KEY, 
    user_reporter INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_reported INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    fecha TIMESTAMPTZ NOT NULL,
    viewed BOOLEAN NOT NULL
);