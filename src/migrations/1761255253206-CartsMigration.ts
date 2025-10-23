import { MigrationInterface, QueryRunner } from "typeorm";

export class CartsMigration1761255253206 implements MigrationInterface {
    name = 'CartsMigration1761255253206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL DEFAULT '1', \`unitPrice\` decimal(10,2) NOT NULL, \`totalPrice\` decimal(10,2) NOT NULL, \`cartId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shopping_carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_61f728b3713b7926454c4b9315\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_edd714311619a5ad09525045838\` FOREIGN KEY (\`cartId\`) REFERENCES \`shopping_carts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_72679d98b31c737937b8932ebe6\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shopping_carts\` ADD CONSTRAINT \`FK_61f728b3713b7926454c4b93157\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shopping_carts\` DROP FOREIGN KEY \`FK_61f728b3713b7926454c4b93157\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_72679d98b31c737937b8932ebe6\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_edd714311619a5ad09525045838\``);
        await queryRunner.query(`DROP INDEX \`REL_61f728b3713b7926454c4b9315\` ON \`shopping_carts\``);
        await queryRunner.query(`DROP TABLE \`shopping_carts\``);
        await queryRunner.query(`DROP TABLE \`cart_items\``);
    }

}
