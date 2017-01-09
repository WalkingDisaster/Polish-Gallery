import { AuthOptions, CollectionMeta, DatabaseMeta, DocumentClient, RequestCallback, SqlQuerySpec } from 'documentdb';

import { Observable } from 'rxjs/observable';
import { Settings } from './configuration';

import { BlobService, ExponentialRetryPolicyFilter, StorageServiceClient } from 'azure-storage';

export class DocumentDbService {
    private databaseId = Settings.documentDb.databaseId;
    private collectionId = Settings.documentDb.collectionId;

    public resetDatabase(): Promise<{}> {
        console.log('Reset called.');

        let client = this.createDocumentClient();
        return new Promise((resolve, reject) => {
            this.deleteDatabases(client)
                .then(() => {
                    this.createDatabase(client, this.databaseId)
                        .then((db) => {
                            this.createCollection(client, db, this.collectionId)
                                .then((coll) => {
                                    let sampleData = require('./sample-data.json');
                                    this.createDocuments(client, coll, sampleData)
                                        .then(() => {
                                            console.info('Successfully inserted sample data');
                                            resolve();
                                        })
                                        .catch((err) => {
                                            reject(err);
                                        });
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public getPolishes(): Promise<any> {
        return new Promise((resolve, reject) => {
            let client = this.createDocumentClient();

            this.forCollection(client, this.databaseId, this.collectionId)
                .then((coll) => {
                    let query = this.createQuerySpec(`SELECT * FROM p WHERE p.class = 'Polish'`);
                    let documents = client.queryDocuments(coll._self, query)
                        .toArray((err, docs) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(docs);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public saveImage(data: number[]): Promise<string> {
        return new Promise((resolve, reject) => {
            let retryOptions = new ExponentialRetryPolicyFilter(3, 500, 100, 1500);
            let blobService = new BlobService('http://127.0.0.1:10000/')
                .withFilter(retryOptions);
            blobService.createContainerIfNotExists(
                'polish-images',
                {publicAccessLevel : 'blob'},
                (err, result, response) => {
                if (err) {
                    reject({err, result, response});
                    return;
                }

            });
        });
    }

    private createDocumentClient(): DocumentClient {
        let client = new DocumentClient(Settings.documentDb.host, {
            masterKey: Settings.documentDb.authKey,
        });
        return client;
    }

    private createQuerySpec(query: string): SqlQuerySpec {
        let querySpec = {
            parameters: [],
            query,
        };
        return querySpec;
    }

    private createMetaQuerySpec(key: string, query?: string): SqlQuerySpec {
        let querySpec = {
            parameters: [{
                name: '@id',
                value: key,
            }],
            query: query || 'SELECT * FROM root r WHERE r.id=@id',
        };
        return querySpec;
    }

    private forCollection(client: DocumentClient, databaseId: string, collectionId: string): Promise<CollectionMeta> {
        return new Promise((resolve, reject) => {
            client.queryDatabases(this.createMetaQuerySpec(databaseId)).toArray((err, dbs, headers) => {
                if (err) {
                    reject({ err, dbs, headers });
                    return;
                }
                if (dbs.length > 0) {
                    // get collection
                    let db = dbs[0];
                    client.queryCollections(db._self, this.createMetaQuerySpec(collectionId))
                        .toArray((err2, colls, headers2) => {
                            if (err2) {
                                reject({
                                    err: err2,
                                    colls,
                                    headers: headers2,
                                });
                                return;
                            }
                            if (colls.length > 0) {
                                resolve(colls[0]);
                                return;
                            }
                            reject({
                                err: `Collection "${collectionId}" does not exist.`,
                                headers: headers2,
                            });
                        });

                    return;
                }
                reject({
                    err: `Database "${databaseId}" does not exist.`,
                    headers,
                });
            });
        });
    }

    private deleteDatabases(client: DocumentClient): Promise<{}> {
        return new Promise((resolve, reject) => {
            client.queryDatabases(this.createMetaQuerySpec(this.databaseId))
                .toArray((err, dbs, headers) => {
                    if (err) {
                        reject({ err, dbs, headers });
                        return;
                    }
                    let deletes = dbs.map((db) => {
                        return this.deleteDatabase(client, db);
                    });
                    Promise.all(deletes)
                        .then(resolve)
                        .catch((error) => {
                            reject(error);
                        });
                });
        });
    }

    private deleteDatabase(client: DocumentClient, db: DatabaseMeta): Promise<{}> {
        return new Promise((resolve, reject) => {
            client.deleteDatabase(db._self, {}, (err, x, headers) => {
                if (err) {
                    reject({ err, headers });
                    return;
                }
                console.info(`Deleted database "${db.id}"`);
                resolve();
            });
        });
    }

    private createDatabase(client: DocumentClient, databaseId: string): Promise<DatabaseMeta> {
        return new Promise((resolve, reject) => {
            client.createDatabase({ id: databaseId }, {}, (err, db, headers) => {
                if (err) {
                    reject({ err, db, headers });
                    return;
                }
                console.info(`Created database "${databaseId}"`);
                resolve(db);
            });
        });
    }

    private createCollection(client: DocumentClient, db: DatabaseMeta, collectionId: string): Promise<CollectionMeta> {
        return new Promise((resolve, reject) => {
            client.createCollection(db._self, { id: collectionId }, {}, (err, coll, headers) => {
                if (err) {
                    reject({ err, coll, headers });
                    return;
                }
                console.info(`Created collection "${collectionId}"`);
                resolve(coll);
            });
        });
    }

    private createDocuments(client: DocumentClient, coll: CollectionMeta, documents: any[]): Promise<{}> {
        return new Promise((resolve, reject) => {
            let promises = documents.map((doc) => {
                this.createDocument(client, coll, doc);
            });
            Promise.all(promises)
                .then(resolve)
                .catch((err) => {
                    reject(err);
                });
        });
    }

    private createDocument(client: DocumentClient, coll: CollectionMeta, document: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            client.createDocument(coll._self, document, {}, (err, doc, headers) => {
                if (err) {
                    reject({ err, doc, headers });
                    return;
                }
                console.log(`Inserted record ${doc.id}`);
                resolve();
            });
        });
    }
}
