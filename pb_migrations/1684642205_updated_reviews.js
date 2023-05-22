migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q095o8i4e9jttmr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ffv8xaix",
    "name": "term",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q095o8i4e9jttmr")

  // update
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

  return dao.saveCollection(collection)
})
