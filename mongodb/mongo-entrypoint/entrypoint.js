var db = connect("mongodb://root:mongo-db@localhost:27017/chatApp?authSource=admin");
db.createUser(
	    {
		            user: "user",
		            pwd: "mongo-db",
		            roles: [ { role: "readWrite", db: "new_db"} ],
		            passwordDigestor: "server",
	}
)
