// tslint:disable-next-line:max-classes-per-file
export class ApplicationSettings {
    public cookieSecret = '77add1d5f41223d5582fca736a5cb335';
}

// tslint:disable-next-line:max-classes-per-file
export class DocumentDatabaseSettings {
    public host = process.env.HOST || 'https://localhost:8081';
    public authKey = process.env.AUTH_KEY ||
     'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==';
    public databaseId = 'Polishes.Gallery';
    public collectionId = 'Polishes';
}

// tslint:disable-next-line:max-classes-per-file
export class Settings {
    public static application = new ApplicationSettings();
    public static documentDb = new DocumentDatabaseSettings();
}
