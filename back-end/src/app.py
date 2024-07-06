from flask import Flask, jsonify
import database

app = Flask(__name__)
database.init(4)  # Initialize 4 database connection pools
database.check_and_create_tables()  # Check and create tables if they don't exist

@app.route('/users', methods=['GET'])
def get_users():
    connector = database.MySQLConnector()
    query = "SELECT * FROM users"
    users = connector.executeQuery(query)
    connector.close()
    return jsonify(users)

@app.route('/albums', methods=['GET'])
def get_albums():
    connector = database.MySQLConnector()
    query = "SELECT * FROM albums"
    albums = connector.executeQuery(query)
    connector.close()
    return jsonify(albums)

@app.route('/photos', methods=['GET'])
def get_photos():
    connector = database.MySQLConnector()
    query = "SELECT * FROM photos"
    photos = connector.executeQuery(query)
    connector.close()
    return jsonify(photos)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
