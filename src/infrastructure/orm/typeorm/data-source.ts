import { DataSource } from "typeorm"
import { join } from "path"

let dataSource: DataSource;

export const AppDataSource = () => {
	if(!dataSource) {
		const isTestEnvironment = process.env.ENVIRONMENT === "test";
		if (isTestEnvironment) {
			dataSource =  new DataSource({
				type: "postgres",
				host: "localhost",
				port: 5432,
				username: "postgres",
				password: "postgres",
				database: "postgres",
				synchronize: true,
				logging: false,
				entities: [join(__dirname, '../../../../database/entities/*.orm-entity.ts')],
				migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
				subscribers: [],
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
