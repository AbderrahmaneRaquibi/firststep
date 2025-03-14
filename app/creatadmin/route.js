import db from '../lib/db.js';
import bcrypt from 'bcrypt';

async function createAdmin() {
  const adminEmail = 'abderrahmaneraquibi@gmail.com';
  const adminUsername = 'abdoraquibi';
  const adminPassword = '9E0s9{A-[Q.r|]AY.'; // Change this to a secure password
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const [existingAdmin] = await db.execute('SELECT * FROM users WHERE email = ?', [adminEmail]);

  if (existingAdmin.length === 0) {
    await db.execute(
      'INSERT INTO users (username, email, password, is_admin) VALUES (?, ?, ?, ?)',
      [adminUsername, adminEmail, hashedPassword, true]
    );
    console.log('✅ Admin user created successfully.');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }

  process.exit(0);
}

createAdmin().catch((error) => {
  console.error('Error creating admin:', error);
  process.exit(1);
});
