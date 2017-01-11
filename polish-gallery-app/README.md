# Polish Gallery API
This is the back-end. You must have a local DocumentDB Emulator to run this. If you don't, you'll need to change the configuration file under `src/configuration.ts`
```
export class DocumentDatabaseSettings {
    public host = process.env.HOST || 'https://localhost:8081'; // cloud hosted URL
    public authKey = process.env.AUTH_KEY ||
     'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='; // cloud hosted key
    public databaseId = 'Polishes.Gallery';
    public collectionId = 'Polishes';
}
```
