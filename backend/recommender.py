import pickle
import spacy
from sklearn.metrics.pairwise import cosine_similarity

# Load model
with open("recommender_model.pkl", "rb") as f:
    model = pickle.load(f)

vectorizer = model["vectorizer"]
tfidf_matrix = model["tfidf_matrix"]
df = model["products"]

# Load SpaCy
nlp = spacy.load("en_core_web_sm")

def clean_category(text):
    doc = nlp(text.lower())
    return " ".join([token.lemma_ for token in doc if token.is_alpha and not token.is_stop])

def recommend_products(input_category, top_n=10):
    cleaned_input = clean_category(input_category)
    input_vec = vectorizer.transform([cleaned_input])
    cosine_similarities = cosine_similarity(input_vec, tfidf_matrix).flatten()
    indices = cosine_similarities.argsort()[-top_n:][::-1]
    results = df.iloc[indices][['ID', 'Title', 'Name', 'Category', 'Material', 'Brand', 'Price', 'Rating', 'Reviews', 'Description', 'URL', 'img_url', 'inStock', 'inStockText', 'CleanCategory']].to_dict(orient="records")
    print("Recommended Results: ", results)
    return results

