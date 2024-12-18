import { DataSource } from "typeorm";
import { join } from "path";

let dataSource: DataSource;
let mongoSource: DataSource;

export const AppDataSource = () => {
	if(!dataSource) {
		const isTestEnvironment = process.env.ENVIRONMENT === "development";
		if (isTestEnvironment) {
			dataSource =  new DataSource({
				type: "sqlite",
				database: ":memory:",
				synchronize: true,
				entities: [join(__dirname,"../../../", "infrastructure", "database", "entities", "*.ts")],
				migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
				logging: true
			});
		} else {
			dataSource =  new DataSource({
				type: "postgres",
				database: process.env.DB_NAME,
				host: process.env.DB_HOST,
				port: Number(process.env.DB_PORT),
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				synchronize: process.env.NODE_ENV !== "production",
				entities: [join(__dirname,"../../../", "infrastructure", "database", "entities", "*.ts")],
				migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
				logging: true
			});
		}
	}
	return dataSource;
}


export const MongoDataSource = () => {
	if(!dataSource) {
		const isTestEnvironment = process.env.ENVIRONMENT === "test";
		if (isTestEnvironment) {
			mongoSource = new DataSource({
				type: 'mongodb',
				url: 'mongodb://root:password@mongo:27017/cleanCodeArchitecture?authSource=admin',
				useNewUrlParser: true,
				useUnifiedTopology: true,
				synchronize: process.env.NODE_ENV !== "production",
				logging: true,
				entities: [join(__dirname,"../../../", "infrastructure", "database", "entities", "*.ts")],
			});
		} else {
			mongoSource = new DataSource({
				type: 'mongodb',
				url: 'mongodb://root:password@mongo:27017/cleanCodeArchitecture?authSource=admin',
				useNewUrlParser: true,
				useUnifiedTopology: true,
				synchronize: true,
				logging: true,
				entities: [
				  join(__dirname, '../models/mongo/*.mongos{.ts,.js}'),
				]
			});
		}
	}
	return dataSource;
}
