import { PartnerOrmEntity } from '../../../../database/entities/partner.orm-entity';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { authConfig } from "../config/auth.config";
import argon2 from '@node-rs/argon2';
import { AppDataSource } from '../../../../orm/typeorm/data-source';
import dotenv from "dotenv";

const DEFAULT_PASSWORD = 'secret123';
dotenv.config();

async function loadFixtures() {
  try {
    await AppDataSource().initialize();

    const userRepo = AppDataSource().getRepository(UserOrmEntity);
    const partnerRepo = AppDataSource().getRepository(PartnerOrmEntity);

    const existingPartners = await partnerRepo.find();
    if (existingPartners.length === 0) {
      const partners = await partnerRepo.save([
        {
          id: 'd9a68e70-15d2-4d3d-9b49-3a72ec6d319a',
          nom: 'Livreurs Express',
          contactInfo: 'contact@livreurs-express.com'
        },
        {
          id: 'd4b01d42-1b9e-4a3a-8e3a-8d2c0f6e5a1b',
          nom: 'Concessionnaire Triumph Paris',
          contactInfo: 'paris@triumph.com'
        }
      ]);

      console.log('✅ Partners fixtures loaded');

      const hashedPassword = await argon2.hash(DEFAULT_PASSWORD, authConfig.hashOptions);
      await userRepo.save([
        {
          id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
          name: 'Manager Livreurs',
          email: 'manager@livreurs.com',
          password: hashedPassword,
          partner: partners[0],
          role: ['staff'],
          isVerified: true
        },
        {
          id: 'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
          name: 'Technicien Triumph',
          email: 'tech@triumph.com',
          password: hashedPassword,
          partner: partners[1],
          role: ['client'],
          isVerified: true
        }
      ]);

      await AppDataSource().destroy();
      console.log('✅ Users fixtures loaded');
    } else {
      console.log('ℹ️  Fixtures already exist, skipping...');
    }
  } catch (error) {
    console.error('❌ Error loading fixtures:', error);
  }
}

async function run() {
  console.log('🚀 Loading fixtures...');
  await loadFixtures();
  console.log('✅ Fixtures loaded successfully!');
  process.exit(0);
}

run().catch((error) => {
  console.error('❌ Error loading fixtures:', error);
  process.exit(1);
});