from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import recommend_products

app = Flask(__name__)
CORS(app)  # 👈 Enable CORS

@app.route('/recommend', methods=['GET'])
def recommend():
    category = request.args.get('category')
    if not category:
        return jsonify({"error": "Category is required"}), 400
    recommendations = recommend_products(category)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
