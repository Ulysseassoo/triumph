import { DataSource } from "typeorm"
import { join } from "path"

if (process.env.LOAD_DOTENV !== 'false') {
	const dotenv = require('dotenv');
	dotenv.config();
}
  

let dataSource: DataSource;

export const AppDataSource = () => {
	if(!dataSource) {
		const isTestEnvironment = process.env.ENVIRONMENT === "test";
		if (isTestEnvironment) {
			dataSource =  new DataSource({
				type: "sqlite",
				database: ":memory:",
				synchronize: true,
				entities: [join(__dirname,"../../../", "infrastructure", "database", "entities", "*.ts")],
				migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
				logging: false
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
				logging: false
			});
		}
	}
	console.log(dataSource.options)
	return dataSource;
}
