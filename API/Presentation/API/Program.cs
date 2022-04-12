using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Adding Custom Services

builder.Services.ImplementPersistenceServices(builder.Configuration.GetConnectionString("MsSQL"));

// Adding CORS Options

// Cors Options
builder.Services.AddCors(options =>
{
    options.AddPolicy("ECommerceProject",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000",
                                       "http://localhost:3001")
                                       .AllowAnyHeader()
                                       .AllowAnyMethod();
        });
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Using Cors
app.UseCors("ECommerceProject");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
