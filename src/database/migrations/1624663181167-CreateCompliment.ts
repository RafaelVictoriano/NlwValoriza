import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliment1624663181167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "user_sender",
                        type: "varchar",
                    },
                    {
                        name: "user_receiver",
                        type: "varchar",
                    },
                    {
                        name: "tag_id",
                        type: "varchar",
                    },
                    {
                        name: "message",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_sender"],

                    },
                    {
                        name: "FKUserReceiverCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],

                    },
                    {
                        name: "FKTagCompliments",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],

                    },
                ],
            })
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}
