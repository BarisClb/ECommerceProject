using Application;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

//// Service Registrations
// MsSQL Connection
builder.Services.ImplementPersistenceServices(builder.Configuration.GetConnectionString("MsSQL"));
builder.Services.ImplementApplicationServices();


// Adding CORS
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

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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