using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
        options.Events = new JwtBearerEvents();
        options.Events.OnMessageReceived = context =>
        {
            Console.WriteLine("Received Headers:");
            foreach (var header in context.HttpContext.Request.Headers)
            {
                Console.WriteLine($"{header.Key} = {header.Value}");
            }
            Console.WriteLine("End of Headers:");

            return Task.CompletedTask;

        };
        options.Events.OnTokenValidated = context =>
        {
            Console.WriteLine("Token Validated");
            return Task.CompletedTask;
        };
        options.Events.OnAuthenticationFailed = context =>
        {
            Console.Error.WriteLine(context.Exception.Message);
            return Task.CompletedTask;
        };

    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy", b =>
    {
        b.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins(builder.Configuration["ClientApp"]);
    });
});

var app = builder.Build();

app.UseCors();

app.MapReverseProxy();

app.UseAuthentication();
app.UseAuthorization();

app.Run();
