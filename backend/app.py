from flask import Flask, request, jsonify, make_response
from flask_login import LoginManager, login_user, login_required, logout_user, current_user, UserMixin
from flask_cors import CORS

from passlib.hash import bcrypt

import sqlite3
from sqlite3 import Error

app = Flask(__name__)
app.secret_key = 'muchSecretVeryKey'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
# CORS(app, supports_credentials=True)

# app.config.update(
#     SESSION_COOKIE_SAMESITE='Lax',  # Use 'None' with HTTPS
#     SESSION_COOKIE_SECURE=False     # Only set to True if using HTTPS
# )

DB_FILE = "database.sqlite"

class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    @staticmethod
    def get_by_username(username):
        conn = openConnection(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT u_userId, u_username, u_password FROM user WHERE u_username = ?", (username,))
        row = cursor.fetchone()
        cursor.close()
        closeConnection(conn, DB_FILE)

        if row:
            return User(id=row[0], username=row[1], password=row[2])
        return None

    @staticmethod
    def get(user_id):
        conn = openConnection(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT u_userId, u_username, u_password FROM user WHERE u_userId = ?", (user_id,))
        row = cursor.fetchone()
        cursor.close()
        closeConnection(conn, DB_FILE)

        if row:
            return User(id=row[0], username=row[1], password=row[2])
        return None

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'}), 200

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
    first_name = data.get('firstName')
    last_name = data.get('lastName')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Hash the password
    hashed_password = bcrypt.hash(password)
    bcrypt.verify(password, hashed_password)

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

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.get_by_username(username)
    if user and bcrypt.verify(password, user.password):
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/upload', methods=['POST'])
@login_required
def upload():
    image_file = request.files['image']
    description = request.form.get('description')
    user_id = current_user.id
    
    if image_file:
        conn = openConnection(DB_FILE)
        cursor = conn.cursor()
        
        image_data = image_file.read()
        
        print("Post description: ", description)
        
        # Create post in database
        cursor.execute('INSERT INTO userPosts (up_userId, up_body) VALUES (?, ?)',
                  (user_id, description))
        post_id = cursor.lastrowid
        
        print("Post id: ", post_id)
        
        # Upload image to database
        cursor.execute('INSERT INTO images (i_userId, i_postId, i_image) VALUES (?, ?, ?)',
                  (user_id, post_id, image_data))
        conn.commit()
        conn.close()
        return 'Image uploaded successfully', 200

    return 'No image uploaded', 400

@app.route('/check-auth', methods=['GET'])
def check_auth():
    if current_user.is_authenticated:
        return jsonify({'authenticated': True, 'username': current_user.username}), 200
    return jsonify({'authenticated': False}), 401

if __name__ == '__main__':
    app.run(debug=True)
