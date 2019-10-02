using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;

namespace DatingApp_Api.Migrations
{
    public partial class TestSP : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(File.ReadAllText("SqlQueries/CreateProcuder.sql"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
