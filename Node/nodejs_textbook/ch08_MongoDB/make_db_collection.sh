#!/usr/bin/env bash

> use nodejs
switched to db nodejs
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db
nodejs
> db.createCollection('users')
{ "ok" : 1 }
> db.createCollection('comments')
{ "ok" : 1 }
> show collections
comments
users
> db.users.save({ name: 'zero', age: 24, married: false, comment: '안녕하세요. 간단히 몽고디비의 사용법에 대해서 알아봅시다.',  createdAt: new Date()})
WriteResult({ "nInserted" : 1 })
> db.users.save({ name: 'nero', age: 32, married: true, comment: '안녕하세요. zero 친구 nero 입니다.',  createdAt: new Date()})
WriteResult({ "nInserted" : 1 })
> db.users.find({ name: 'zero'}, { _id: 1 })
{ "_id" : ObjectId("5bc487913b788e4a06bb1991") }
> db.comments.save({ commenter: ObjectId('5bc487913b788e4a06bb1991'), comment: '안녕하세요 zero의 댓글입니다', createdAt: new Date() })
WriteResult({ "nInserted" : 1 })
> db.users.find({})
{ "_id" : ObjectId("5bc487913b788e4a06bb1991"), "name" : "zero", "age" : 24, "married" : false, "comment" : "안녕하세요. 간단히 몽고디비의 사용법에 대해서 알아봅시다.", "createdAt" : ISODate("2018-10-15T12:26:57.726Z") }
{ "_id" : ObjectId("5bc487bf3b788e4a06bb1992"), "name" : "nero", "age" : 32, "married" : true, "comment" : "안녕하세요. zero 친구 nero 입니다.", "createdAt" : ISODate("2018-10-15T12:27:43.880Z") }
> db.users.find()
{ "_id" : ObjectId("5bc487913b788e4a06bb1991"), "name" : "zero", "age" : 24, "married" : false, "comment" : "안녕하세요. 간단히 몽고디비의 사용법에 대해서 알아봅시다.", "createdAt" : ISODate("2018-10-15T12:26:57.726Z") }
{ "_id" : ObjectId("5bc487bf3b788e4a06bb1992"), "name" : "nero", "age" : 32, "married" : true, "comment" : "안녕하세요. zero 친구 nero 입니다.", "createdAt" : ISODate("2018-10-15T12:27:43.880Z") }
> db.commenets.find()
> db.commenets.find({})
> db.comments.find({})
{ "_id" : ObjectId("5bc4886f3b788e4a06bb1993"), "commenter" : ObjectId("5bc487913b788e4a06bb1991"), "comment" : "안녕하세요 zero의 댓글입니다", "createdAt" : ISODate("2018-10-15T12:30:39.430Z") }
> db.comments.find()
{ "_id" : ObjectId("5bc4886f3b788e4a06bb1993"), "commenter" : ObjectId("5bc487913b788e4a06bb1991"), "comment" : "안녕하세요 zero의 댓글입니다", "createdAt" : ISODate("2018-10-15T12:30:39.430Z") }
> db.users.find({}, { _id: 1, name: 1, married: 1 })
{ "_id" : ObjectId("5bc487913b788e4a06bb1991"), "name" : "zero", "married" : false }
{ "_id" : ObjectId("5bc487bf3b788e4a06bb1992"), "name" : "nero", "married" : true }
> db.users.find({}, { _id: 0, name: 1, married: 1 })
{ "name" : "zero", "married" : false }
{ "name" : "nero", "married" : true }
> db.users.find({}, { _id: false, name: true, married: true })
{ "name" : "zero", "married" : false }
{ "name" : "nero", "married" : true }
> db.users.find({ age: { $gt: 30 }, marrid: true }, { _id: false, name: true, married: true })
> db.users.find({ age: { $gt: 30 }, married: true }, { _id: false, name: true, married: true })
{ "name" : "nero", "married" : true }
> db.users.find({ $or:  [ {age: { $gt: 30 } }, { married: true } ] }, { _id: false, name: true, married: true })
{ "name" : "nero", "married" : true }
> db.users.find({ $or:  [ {age: { $gt: 30 } }, { married: false } ] }, { _id: false, name: true, married: true })
{ "name" : "zero", "married" : false }
{ "name" : "nero", "married" : true }
> db.users.find({}, { _id: false, name: true, married: true }).sort({ age: -1 })
{ "name" : "nero", "married" : true }
{ "name" : "zero", "married" : false }
> db.users.find({}, { _id: false, name: true, married: true }).sort({ age: 1 })
{ "name" : "zero", "married" : false }
{ "name" : "nero", "married" : true }
> db.users.find({}, { _id: false, name: true, married: true }).sort({ age: 1 }).limit(1)
{ "name" : "zero", "married" : false }
> db.users.find({}, { _id: false, name: true, married: true }).sort({ age: 1 }).limit(1).skip(1)
{ "name" : "nero", "married" : true }
> db.users.update({ name: 'nero' }, { $set: { comment: 'changed' } })
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find({ name: 'nero' })
{ "_id" : ObjectId("5bc487bf3b788e4a06bb1992"), "name" : "nero", "age" : 32, "married" : true, "comment" : "changed", "createdAt" : ISODate("2018-10-15T12:27:43.880Z") }
> db.users.delete({ name: 'nero' })
2018-10-15T21:42:17.590+0900 E QUERY    [js] TypeError: db.users.delete is not a function :
@(shell):1:1
> db.users.remove({ name: 'nero' })
WriteResult({ "nRemoved" : 1 })
>
