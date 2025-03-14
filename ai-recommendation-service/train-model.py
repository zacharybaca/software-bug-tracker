import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("data.csv")

# Convert text data (Bug Description) into numerical features
vectorizer = TfidfVectorizer()
X_text = vectorizer.fit_transform(df["Bug Description"])

# Convert category and assigned developer into numerical values
category_encoder = LabelEncoder()
df["Category"] = category_encoder.fit_transform(df["Category"])

developer_encoder = LabelEncoder()
y = developer_encoder.fit_transform(df["Assigned Developer"])

# Combine text features and category
import scipy.sparse
X = scipy.sparse.hstack((X_text, df["Category"].values.reshape(-1, 1)))

# Train a RandomForest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save the trained model and encoders
joblib.dump(model, "bug_assignment_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
joblib.dump(category_encoder, "category_encoder.pkl")
joblib.dump(developer_encoder, "developer_encoder.pkl")

print("Model training complete and saved!")
