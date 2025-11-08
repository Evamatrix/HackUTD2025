from flask import Flask, request, jsonify, render_template
from datastorage import datastorage
from transactionClass import transactionClass
from newsHandler import newsHandler

app = Flask(__name__)

# Initialize services
storage = datastorage()
transaction_service = transactionClass()
news_service = newsHandler("ct1nmb9r01qoprggpfk0ct1nmb9r01qoprggpfkg")

@app.route('/')
def index():
    return render_template('index.html')  # Create an index.html for the frontend

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if storage.register_user(username, password):
        return jsonify({"message": "Registration successful!"}), 200
    return jsonify({"message": "Username already exists."}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if storage.validate_login(username, password):
        return jsonify({"message": f"Login successful! Welcome, {username}"}), 200
    return jsonify({"message": "Invalid username or password."}), 401

@app.route('/follow', methods=['POST'])
def follow():
    data = request.json
    username = data.get('username')
    congressman = data.get('congressman')
    if storage.follow_congressman(username, congressman):
        return jsonify({"message": f"You are now following {congressman}."}), 200
    return jsonify({"message": "Error following congressman."}), 400

@app.route('/followed', methods=['GET'])
def followed():
    username = request.args.get('username')
    followed = storage.get_followed_congressmen(username)
    return jsonify({"followed": list(followed)}), 200

@app.route('/news', methods=['GET'])
def news():
    category = request.args.get('category')
    news = news_service.getNews(category)
    if news:
        return jsonify({"news": news[:5]}), 200
    return jsonify({"message": "No news available for this category."}), 404

@app.route('/recent-trades', methods=['GET'])
def recent_trades():
    congressman_name = request.args.get('congressman')
    transaction_service.get_recent_trades(congressman_name)
    return jsonify({"message": "Trades fetched. Check logs for details."}), 200

if __name__ == '__main__':
    app.run(debug=True)