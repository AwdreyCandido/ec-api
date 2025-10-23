// MIGRATIONS COMMAND

/*

# CREATE NEW MIGRATION
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/{Migration Name} -d ./typeorm-cli.config.ts

# EXECUTE MIGRATION
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./typeorm-cli.config.ts

*/

/*

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'pass',
  database: 'ecommerce',
  entities: [User, Product, Store, Review, Order, OrderGroup],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;

*/
