import json
import os
import sys
import requests
import mysql.connector
from mysql.connector import pooling
from mysql.connector.errors import PoolError

dbconfig = {
    "host": "database",                               # Provide a default if not set
    "user": os.environ.get('SQL_USER', 'root'),       # Provide a default if not set
    "password": os.environ.get('SQL_PASSWORD', ''),   # Provide a default if not set
    "database": os.environ.get('SQL_DATABASE', ''),   # Provide a default if not set
    "connect_timeout": 30
}

numberOfPools = 0
currentPoolIndex = 0
connectionPools = []

import time

def init(_noOfPools, initial_delay=1):
    global numberOfPools, connectionPools
    numberOfPools = _noOfPools
    retries = 0

    while True:
        try:
            for i in range(1, numberOfPools + 1):
                connectionPool = pooling.MySQLConnectionPool(pool_name=f"pool_{i}", pool_size=32, **dbconfig)
                connectionPools.append(connectionPool)
            print(f"\n\U0001F525 MySQL connection pools initialized: {numberOfPools}")
            break  # Exit the loop if successful
        except Exception as e:
            retries += 1
            print(f"Error connecting to DB: {e}")
            delay = initial_delay * (2 ** (retries - 1))  # Exponential backoff
            print(f"Retrying in {delay} seconds...")
            time.sleep(delay)

class MySQLConnector:
    def __init__(self):
        global currentPoolIndex
        try:
            self.connection = connectionPools[currentPoolIndex].get_connection()   # get a connection from a pool
            currentPoolIndex += 1
            if currentPoolIndex == numberOfPools:
                currentPoolIndex = 0
            # print(f"{currentPoolIndex}." , end='', flush=True)
            # sys.stdout.flush()
        except PoolError as e:
            print("\n\U0001F6A9 MYSQL Connection pool error!")
            sys.stdout.flush()
        
    def close(self):
        if self.connection:
            self.connection.close()

    def executeQuery(self, _query, _params=None, _fetchOne=False):
        result = ""
        try:
            cursor = self.connection.cursor()
            if _params is not None:
                cursor.execute(_query, _params)
            else:
                cursor.execute(_query)
            if _query.lower().startswith("select"):
                if _fetchOne:
                    result = cursor.fetchone()
                else:
                    result = cursor.fetchall()
            else:
                self.connection.commit()
                if _query.lower().startswith("insert"):
                    result = cursor.lastrowid
                else:
                    result = None
        except mysql.connector.Error as e:
            print(f"MySQL Query Error: {e}")
        cursor.close()
        return result
    
def executeBatchQuery(self, _query, _params):
    result = ""
    try:
        cursor = self.connection.cursor()
        if _params is not None:
            cursor.executemany(_query, _params)
        else:
            cursor.execute(_query)
        if _query.lower().startswith("select"):
            result = cursor.fetchall()
        else:
            self.connection.commit()
            if _query.lower().startswith("insert"):
                result = cursor.lastrowid
            else:
                result = None
    except mysql.connector.Error as e:
        print(f"MySQL Batch Query Error: {e}")
    finally:
        cursor.close()
    return result

def check_and_create_tables():
    queries = {
        "users": """
            CREATE TABLE users (
                id INT PRIMARY KEY,
                name VARCHAR(255),
                username VARCHAR(255),
                email VARCHAR(255),
                address JSON,
                phone VARCHAR(255),
                website VARCHAR(255),
                company JSON
            )
        """,
        "albums": """
            CREATE TABLE albums (
                id INT PRIMARY KEY,
                userId INT,
                title VARCHAR(255)
            )
        """,
        "photos": """
            CREATE TABLE photos (
                id INT PRIMARY KEY,
                albumId INT,
                title VARCHAR(255),
                url VARCHAR(255),
                thumbnailUrl VARCHAR(255)
            )
        """
    }

    data_urls = {
        "users": "https://jsonplaceholder.typicode.com/users",
        "albums": "https://jsonplaceholder.typicode.com/albums",
        "photos": "https://jsonplaceholder.typicode.com/photos"
    }

    connector = MySQLConnector()

    for table, query in queries.items():
        check_query = f"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = '{table}'"
        result = connector.executeQuery(check_query, _fetchOne=True)
        if result and result[0] == 0:
            print(f"Table {table} does not exist. Creating and populating...")
            connector.executeQuery(query)

            # Fetch data from URL
            response = requests.get(data_urls[table])
            data = response.json()

            # Prepare and execute batch insert query
            if table == "users":
                insert_query = """
                    INSERT INTO users (id, name, username, email, address, phone, website, company) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """
                values = [(user['id'], user['name'], user['username'], user['email'], 
                           json.dumps(user['address']), user['phone'], user['website'], 
                           json.dumps(user['company'])) for user in data]
            elif table == "albums":
                insert_query = """
                    INSERT INTO albums (id, userId, title) 
                    VALUES (%s, %s, %s)
                """
                values = [(album['id'], album['userId'], album['title']) for album in data]
            elif table == "photos":
                insert_query = """
                    INSERT INTO photos (id, albumId, title, url, thumbnailUrl) 
                    VALUES (%s, %s, %s, %s, %s)
                """
                values = [(photo['id'], photo['albumId'], photo['title'], photo['url'], photo['thumbnailUrl']) for photo in data]

            connector.executeBatchQuery(insert_query, values)
            print(f"Table {table} created and populated.")
        else:
            print(f"Table {table} already exists.")

    connector.close()