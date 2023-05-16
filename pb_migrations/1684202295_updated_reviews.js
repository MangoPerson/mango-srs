migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q095o8i4e9jttmr")

  // remove
  collection.schema.removeField("mzc9nhad")

  // remove
  collection.schema.removeField("iiozl28u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ffv8xaix",
    "name": "term_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ougulpxz",
    "name": "term_type",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q095o8i4e9jttmr")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("ffv8xaix")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
