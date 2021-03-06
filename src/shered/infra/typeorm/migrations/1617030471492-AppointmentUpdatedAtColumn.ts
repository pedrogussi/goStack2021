import {MigrationInterface, QueryRunner ,TableColumn} from "typeorm";

export default class AppointmentUpdatedAtColumn1617030471492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'updated_at')
    }

}
