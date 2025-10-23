import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleAndRevertNullable1761192568197 implements MigrationInterface {
    name = 'AddRoleAndRevertNullable1761192568197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` text NULL DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
    }

}
