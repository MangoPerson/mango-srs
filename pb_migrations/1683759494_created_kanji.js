migrate((db) => {
  const collection = new Collection({
    "id": "2lvlxe0umo5wo2a",
    "created": "2023-05-10 22:58:14.034Z",
    "updated": "2023-05-10 22:58:14.034Z",
    "name": "kanji",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4nadhuq7",
        "name": "character",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "thgspykw",
        "name": "ranking",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "u0ts4wpy",
        "name": "onyomi",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "05bp9oje",
        "name": "kunyomi",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "crk5eanh",
        "name": "meanings",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_fAuTVDr` ON `kanji` (\n  `ranking`,\n  `character`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2lvlxe0umo5wo2a");

  return dao.deleteCollection(collection);
})
