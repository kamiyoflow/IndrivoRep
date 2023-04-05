using IndrivoHW.Bll.Profiles;
using IndrivoHW.Dal;
using IndrivoHW.Dal.Interfaces;
using IndrivoHW.Dal.Repositories;
using IndrivoHW.Domain.Auth;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var connectionString = builder.Configuration.GetConnectionString("IndrivoHWConnection");
builder.Services.AddDbContext<IndrivoHWDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IIndrivoHWRepository, IndrivoHWRepository>();

builder.Services.AddIdentity<User, Role>(options => options.Password.RequiredLength = 8)
     .AddEntityFrameworkStores<IndrivoHWDbContext>();

builder.Services.AddAutoMapper(typeof(LoginHistoryProfile));
builder.Services.AddAutoMapper(typeof(AccountProfile));

builder.Services.AddCors(options =>
{

     options.AddDefaultPolicy(
         policy =>
         {
              policy.WithOrigins("http://localhost:3000")
   .AllowAnyHeader()
   .AllowAnyMethod();
         });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
     app.UseSwagger();
     app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
