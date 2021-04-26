import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnAdminConnections1619453816971 implements MigrationInterface {
  private adminColumn: TableColumn;
  private oldAdminColumn: TableColumn;

  constructor(){
    this.adminColumn = new TableColumn({
      name: 'admin_id',
      type: 'varchar',
      isNullable: true,
    });
    this.oldAdminColumn = new TableColumn({
      name: 'admin_id',
      type: 'uuid',
      isNullable: true,
    });

  }

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn('connections',
       'admin_id',
       this.adminColumn);
       await queryRunner.changeColumn('messages',
       'admin_id',
       this.adminColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn('connections',
       'admin_id',
       this.oldAdminColumn);
       await queryRunner.changeColumn('messages',
       'admin_id',
       this.oldAdminColumn);

    }
}
