import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AppointmentCreateAndUpdate1617029819949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default:'now()',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'created_at')
    }

}
