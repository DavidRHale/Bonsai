using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class MoreBonsaiDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Design",
                table: "Bonsais",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EstimatedAge",
                table: "Bonsais",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PotType",
                table: "Bonsais",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Design",
                table: "Bonsais");

            migrationBuilder.DropColumn(
                name: "EstimatedAge",
                table: "Bonsais");

            migrationBuilder.DropColumn(
                name: "PotType",
                table: "Bonsais");
        }
    }
}
