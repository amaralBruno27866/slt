import pool from './db';

interface QueryResult<T = any> {  
  command: string;
  rowCount: number;
  rows: T[];
  fields: Array<{
    name: string;
    tableID: number;
    columnID: number;
    dataTypeID: number;
    dataTypeSize: string | null;
    dataTypeModifier: string | null;
    format: string | null;
  }>;
  _parsers: Array<(value: string) => T>; 
}

interface QueryablePool {
  query: <T = any>(text: string, params?: any[]) => Promise<QueryResult<T>>;
}

const typedPool = pool as unknown as QueryablePool;

async function createSchema() {
  try {
    await typedPool.query(`CREATE SCHEMA IF NOT EXISTS slt;`);
    console.log('Schema "slt" created or already exists');
  } catch (err) {
    console.error('Error creating schema "slt":', err);
    throw err;
  }
}

/* -------------------------------------------------------------------------- */
/*                            TABLES GROUP #1                                 */
/* -------------------------------------------------------------------------- */

async function createAddress() {
  try {
    await typedPool.query(
      `CREATE TABLE IF NOT EXISTS slt.address (
        id SERIAL PRIMARY KEY,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        province VARCHAR(100) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
    console.log('Table "address" created successfully');
  } catch (err) {
    console.error('Error creating table "address":', err);
  }
}

async function createContactInfo() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.contact_info (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
    console.log('Table "contact_info" created successfully');
  } catch (err) {
    console.error('Error creating table "contact_info":', err);
  }
}

async function createInsuranceCompany() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.insurance_company (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        adjuster_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        claim_number VARCHAR(50) NOT NULL,
        policy_number NUMERIC(12, 0) NOT NULL,
        date_accident DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
    console.log('Table "insurance_company" created successfully');
  } catch (err) {
    console.error('Error creating table "insurance_company":', err);
  }
}

async function createAnswer() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.answer (
        id SERIAL PRIMARY KEY,
        question_id INTEGER NOT NULL,
        type VARCHAR(50) NOT NULL,
        value VARCHAR(255) NOT NULL,
        FOREIGN KEY (question_id) REFERENCES slt.question(id) ON DELETE CASCADE
      );`
    );
    console.log('Table "answer" created successfully');
  } catch (err) {
    console.error('Error creating table "answer":', err);
  }
}

/* -------------------------------------------------------------------------- */
/*                            TABLES GROUP #2                                 */
/* -------------------------------------------------------------------------- */

async function createAssessor() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.assessor (
        id SERIAL PRIMARY KEY,
        contact_info_id INTEGER NOT NULL,
        address_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contact_info_id) REFERENCES slt.contact_info(id) ON DELETE CASCADE,
        FOREIGN KEY (address_id) REFERENCES slt.address(id) ON DELETE CASCADE
      );`
    );
    console.log('Table "assessor" created successfully');
  } catch (err) {
    console.error('Error creating table "assessor":', err);
  }
}

async function createClient() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.client (
        id SERIAL PRIMARY KEY,
        contact_info_id INTEGER NOT NULL,
        birth_date DATE NOT NULL,
        gender VARCHAR(10) NOT NULL,
        address_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contact_info_id) REFERENCES slt.contact_info(id) ON DELETE CASCADE,
        FOREIGN KEY (address_id) REFERENCES slt.address(id) ON DELETE CASCADE
      );`
    );
    console.log('Table "client" created successfully');
  } catch (err) {
    console.error('Error creating table "client":', err);
  }
}

async function createQuestion() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.question (
        id SERIAL PRIMARY KEY,
        question_text VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );
    console.log('Table "question" created successfully');
  } catch (err) {
    console.error('Error creating table "question":', err);
  }
}

async function createFamilyPhysician() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.family_physician (
        id SERIAL PRIMARY KEY,
        contact_info_id INTEGER NOT NULL,
        address_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contact_info_id) REFERENCES slt.contact_info(id) ON DELETE CASCADE,
        FOREIGN KEY (address_id) REFERENCES slt.address(id) ON DELETE CASCADE
      );`
    ); 
    console.log('Table "family_physician" created successfully');
  } catch (err) {
    console.error('Error creating table "family_physician":', err);
  }
}

async function createLegalRepresentativeInfo() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.legal_representative_info (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(100) NOT NULL,
        contact_info_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contact_info_id) REFERENCES slt.contact_info(id) ON DELETE CASCADE
      );`
    );
    console.log('Table "legal_representative_info" created successfully');
  } catch (err) {
    console.error('Error creating table "legal_representative_info":', err);
  }
}

async function createEmergencyContact() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.emergency_contact (
        id SERIAL PRIMARY KEY,
        contact_info_id INTEGER NOT NULL,
        relationship VARCHAR(100) NOT NULL,
        alternative_phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contact_info_id) REFERENCES slt.contact_info(id) ON DELETE CASCADE
      );`
    );
    console.log('Table "emergency_contact" created successfully');
  } catch (err) {
    console.error('Error creating table "emergency_contact":', err);
  }
}

/* -------------------------------------------------------------------------- */
/*                            TABLES GROUP #2                                 */
/* -------------------------------------------------------------------------- */

async function createForm() {
  try {
    await typedPool.query(
      `CREATE TABLE IF NOT EXISTS slt.form (
        id SERIAL PRIMARY KEY,
        form_name VARCHAR(255) NOT NULL,
        code VARCHAR(5) NOT NULL
      );`
    );
    console.log('Table "form" created successfully');
  } catch (err) {
    console.error('Error creating table "form":', err);
  }
}

async function createCaseProfile() {
  try {
    await typedPool.query(
      `
      CREATE TABLE IF NOT EXISTS slt.case_profile (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        assessor_id INTEGER NOT NULL,
        client_id INTEGER NOT NULL,
        family_physician_id INTEGER NOT NULL,
        emergency_contact_id INTEGER NOT NULL,
        legal_representative_info_id INTEGER NOT NULL,
        insurance_company_id INTEGER NOT NULL,
        form_id INTEGER NOT NULL,
        FOREIGN KEY (assessor_id) REFERENCES slt.assessor(id) ON DELETE CASCADE,
        FOREIGN KEY (client_id) REFERENCES slt.client(id) ON DELETE CASCADE,
        FOREIGN KEY (family_physician_id) REFERENCES slt.family_physician(id) ON DELETE CASCADE,
        FOREIGN KEY (emergency_contact_id) REFERENCES slt.emergency_contact(id) ON DELETE CASCADE,
        FOREIGN KEY (legal_representative_info_id) REFERENCES slt.legal_representative_info(id) ON DELETE CASCADE,
        FOREIGN KEY (insurance_company_id) REFERENCES slt.insurance_company(id) ON DELETE CASCADE,
        FOREIGN KEY (form_id) REFERENCES slt.form(id) ON DELETE CASCADE
      );`
    );
    console.log('Table "case_profile" created successfully');
  } catch (err) {
    console.error('Error creating table "case_profile":', err);
  }
}

/* -------------------------------------------------------------------------- */
/*                            HELPER FUNCTIONS                                */
/* -------------------------------------------------------------------------- */

async function createUpdateFunction() {
  try {
    await typedPool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    console.log('Update function "update_updated_at_column" created successfully');
  } catch (err) {
    console.error('Error creating update function:', err);
    throw err;
  }
}

async function createUpdatedAtTrigger(tableName: string) {
  try {
    await typedPool.query(`
      CREATE TRIGGER trigger_${tableName}_updated_at
      BEFORE UPDATE ON slt.${tableName}
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
    `);
    console.log(`Trigger for table "${tableName}" created successfully`);
  } catch (err) {
    console.error(`Error creating trigger for table "${tableName}":`, err);
  }
}

async function createTriggersForUpdatedAt() {
  const tables = [
    'address',
    'contact_info',
    'insurance_company',
    'question',
    'assessor',
    'client',
    'family_physician',
    'legal_representative_info',
    'emergency_contact',
    'case_profile'
  ];
  
  await createUpdateFunction();
  
  for (const table of tables) {
    await createUpdatedAtTrigger(table);
  }
}

/* -------------------------------------------------------------------------- */
/*                               MIGRATIONS                                   */
/* -------------------------------------------------------------------------- */

async function runMigrations() {
  try {
    await createSchema();
    await createAddress();
    await createContactInfo();
    await createInsuranceCompany();
    await createQuestion();
    await createAnswer();
    await createAssessor();
    await createClient();
    await createFamilyPhysician();
    await createLegalRepresentativeInfo();
    await createEmergencyContact();
    await createForm();
    await createCaseProfile();

    console.log('All tables created successfully');
    
    await createTriggersForUpdatedAt();
    console.log('All triggers created successfully');

    console.log('All migrations completed successfully');
  } catch (err) {
    console.error('Error during migrations:', err);
  } finally {
    process.exit(0);
  }
}

runMigrations();