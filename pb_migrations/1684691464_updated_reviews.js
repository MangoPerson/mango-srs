migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q095o8i4e9jttmr")

  collection.listRule = "user_id.id = @request.auth.id"
  collection.viewRule = "user_id.id = @request.auth.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "clcvldpt",
    "name": "user_id",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q095o8i4e9jttmr")

  collection.listRule = null
  collection.viewRule = null

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
