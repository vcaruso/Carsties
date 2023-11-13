using Xunit;

namespace AuctionService.IntegrationTests;

[CollectionDefinition("Shared collection")]
public class SharedFixtures : ICollectionFixture<CustomWebAppFactory>
{

}
