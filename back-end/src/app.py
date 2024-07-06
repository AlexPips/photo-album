from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import database

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
database.init(4)  # Initialize 4 database connection pools
database.check_and_create_tables()  # Check and create tables if they don't exist

@app.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    connector = database.MySQLConnector()
    query = "SELECT id, name, username, email, address, phone, website, company FROM users"
    results = connector.executeQuery(query)
    connector.close()
    
    # Convert users list to a dictionary format with keys included
    users_with_keys = [{'id': result[0],
                        'name': result[1],
                        'username': result[2],
                        'email': result[3],
                        'address': result[4],
                        'phone': result[5],
                        'website': result[6],
                        'company': result[7]} for result in results]
    
    return jsonify(users_with_keys)

@app.route('/albums', methods=['GET'])
@cross_origin()
def get_albums():
    connector = database.MySQLConnector()
    query = "SELECT id, userId, title FROM albums"
    albums = connector.executeQuery(query)
    connector.close()
    
    # Convert albums list to a dictionary format with keys included
    albums_with_keys = [{'id': album[0],
                         'userId': album[1],
                         'title': album[2]} for album in albums]
    
    return jsonify(albums_with_keys)

@app.route('/photos', methods=['GET'])
@cross_origin()
def get_photos():
    connector = database.MySQLConnector()
    query = "SELECT id, albumId, title, url, thumbnailUrl FROM photos"
    photos = connector.executeQuery(query)
    connector.close()
    
    # Convert photos list to a dictionary format with keys included
    photos_with_keys = [{'id': photo[0],
                         'albumId': photo[1],
                         'title': photo[2],
                         'url': photo[3],
                         'thumbnailUrl': photo[4]} for photo in photos]
    
    return jsonify(photos_with_keys)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
