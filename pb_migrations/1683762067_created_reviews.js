migrate((db) => {
  const collection = new Collection({
    "id": "q095o8i4e9jttmr",
    "created": "2023-05-10 23:41:07.698Z",
    "updated": "2023-05-10 23:41:07.698Z",
    "name": "reviews",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ougulpxz",
        "name": "type",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "kanji",
            "vocab"
          ]
        }
      },
      {
        "system": false,
        "id": "mzc9nhad",
        "name": "kanji",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "2lvlxe0umo5wo2a",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "iiozl28u",
        "name": "vocab",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "8kbw84u3o4y2zq1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "clcvldpt",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "diwp972r",
        "name": "notes",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "zfap18o1",
        "name": "level",
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
        "id": "sybtxmv1",
        "name": "review_time",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "user.id = @request.auth.id",
    "viewRule": "user.id = @request.auth.id",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("q095o8i4e9jttmr");

  return dao.deleteCollection(collection);
})
