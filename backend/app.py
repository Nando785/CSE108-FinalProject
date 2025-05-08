from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
import mysql.connector
import sqlite3
from sqlite3 import Error

app = Flask(__name__)
bcrypt = Bcrypt(app)

DB_FILE = "database.sqlite"

# Configure MySQL connection
db_config = {
    'host': 'localhost',
    'user': 'your_db_user',
    'password': 'your_db_password',
    'database': 'your_db_name'
}

# Functions for connecting to database
def openConnection(_dbFile):
    conn = None
    try:
        conn = sqlite3.connect(_dbFile)
        print("successfully opened connection")
    except Error as e:
        print(e)

    return conn

# Function for closing database connection
def closeConnection(_conn, _dbFile):
    
    try:
        _conn.close()
        print("successfully closed connection")
    except Error as e:
        print(e)

# Create a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    # Extract data
    username = data.get('username')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        conn = openConnection(DB_FILE)
        cursor = conn.cursor()

        query = '''
            INSERT INTO user (u_username, u_password, u_firstName, u_lastName)
            VALUES (?, ?, ?, ?)
        '''
        values = (username, hashed_password, first_name, last_name)
        cursor.execute(query, values)
        conn.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except sqlite3.Error as err:
        return jsonify({'error': str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        closeConnection(conn, DB_FILE)

if __name__ == '__main__':
    app.run(debug=True)
