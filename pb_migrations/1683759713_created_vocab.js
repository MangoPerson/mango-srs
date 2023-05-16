migrate((db) => {
  const collection = new Collection({
    "id": "8kbw84u3o4y2zq1",
    "created": "2023-05-10 23:01:53.949Z",
    "updated": "2023-05-10 23:01:53.949Z",
    "name": "vocab",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6npfjstz",
        "name": "term",
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
        "id": "hcym9zmh",
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
        "id": "ghkohqfc",
        "name": "readings",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "m5dpffch",
        "name": "meanings",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "b5lkojhf",
        "name": "kanji",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "2lvlxe0umo5wo2a",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_OmQPZz4` ON `vocab` (\n  `ranking`,\n  `term`\n)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8kbw84u3o4y2zq1");

  return dao.deleteCollection(collection);
})
