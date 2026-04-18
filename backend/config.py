import os
import traceback
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "output")

PERSISTENCE_MODEL_PATH = os.path.join(OUTPUT_DIR, "persistence_model.h5")
PERSISTENCE_PREPROCESSOR_PATH = os.path.join(OUTPUT_DIR, "persistence_preprocessor.pkl")

ACADEMIC_MODEL_PATH = os.path.join(OUTPUT_DIR, "academic_model.h5")
ACADEMIC_PREPROCESSOR_PATH = os.path.join(OUTPUT_DIR, "academic_preprocessor.pkl")
 
# -----------------------------
# Load persistence artifacts
# -----------------------------
if not os.path.exists(PERSISTENCE_MODEL_PATH):
    raise FileNotFoundError(f"Missing file: {PERSISTENCE_MODEL_PATH}")

if not os.path.exists(PERSISTENCE_PREPROCESSOR_PATH):
    raise FileNotFoundError(f"Missing file: {PERSISTENCE_PREPROCESSOR_PATH}")

persistence_model = load_model(PERSISTENCE_MODEL_PATH, compile=False)
persistence_preprocessor = joblib.load(PERSISTENCE_PREPROCESSOR_PATH)

# -----------------------------
# Load academic artifacts
# -----------------------------
if not os.path.exists(ACADEMIC_MODEL_PATH):
    raise FileNotFoundError(f"Missing file: {ACADEMIC_MODEL_PATH}")

if not os.path.exists(ACADEMIC_PREPROCESSOR_PATH):
    raise FileNotFoundError(f"Missing file: {ACADEMIC_PREPROCESSOR_PATH}")

academic_model = load_model(ACADEMIC_MODEL_PATH, compile=False)
academic_preprocessor = joblib.load(ACADEMIC_PREPROCESSOR_PATH)
 
# -----------------------------
# Expected columns
# -----------------------------
PERSISTENCE_COLUMNS = [
    "First_Term_GPA",
    "Second_Term_GPA",
    "Math_Score",
    "HS_Average",
    "First_Language",
    "Funding",
    "School",
    "FastTrack",
    "Coop",
    "Residency",
    "Gender",
    "Prev_Education",
    "Age_Group",
    "English_Grade",
]

ACADEMIC_COLUMNS = [
    "First_Term_GPA",
    "Math_Score",
    "HS_Average",
    "First_Language",
    "Funding",
    "School",
    "FastTrack",
    "Coop",
    "Residency",
    "Gender",
    "Prev_Education",
    "Age_Group",
    "English_Grade",
]

# -----------------------------
# Helpers
# -----------------------------
def validate_required_fields(data, required_fields):
    missing = [field for field in required_fields if field not in data]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}"
    return True, None


def safe_float(value, field_name):
    try:
        return float(value)
    except (TypeError, ValueError):
        raise ValueError(f"Field '{field_name}' must be a number.")


def safe_int(value, field_name):
    try:
        return int(value)
    except (TypeError, ValueError):
        raise ValueError(f"Field '{field_name}' must be an integer.")


def to_dense_if_needed(matrix):
    if hasattr(matrix, "toarray"):
        return matrix.toarray()
    return matrix


def build_persistence_dataframe(payload):
    row = {
        "First_Term_GPA": safe_float(payload["firstTermGpa"], "firstTermGpa"),
        "Second_Term_GPA": safe_float(payload["secondTermGpa"], "secondTermGpa"),
        "Math_Score": safe_float(payload["mathScore"], "mathScore"),
        "HS_Average": safe_float(payload["hsAverage"], "hsAverage"),
        "First_Language": safe_int(payload["firstLanguage"], "firstLanguage"),
        "Funding": safe_int(payload["funding"], "funding"),
        "School": safe_int(payload["school"], "school"),
        "FastTrack": safe_int(payload["fastTrack"], "fastTrack"),
        "Coop": safe_int(payload["coop"], "coop"),
        "Residency": safe_int(payload["residency"], "residency"),
        "Gender": safe_int(payload["gender"], "gender"),
        "Prev_Education": safe_int(payload["prevEducation"], "prevEducation"),
        "Age_Group": safe_int(payload["ageGroup"], "ageGroup"),
        "English_Grade": safe_int(payload["englishGrade"], "englishGrade"),
    }

    return pd.DataFrame([row], columns=PERSISTENCE_COLUMNS)


def build_academic_dataframe(payload):
    row = {
         "First_Term_GPA": safe_float(payload["firstTermGpa"], "firstTermGpa"),
        "Math_Score": safe_float(payload["mathScore"], "mathScore"),
        "HS_Average": safe_float(payload["hsAverage"], "hsAverage"),
        "First_Language": safe_int(payload["firstLanguage"], "firstLanguage"),
        "Funding": safe_int(payload["funding"], "funding"),
        "School": safe_int(payload["school"], "school"),
        "FastTrack": safe_int(payload["fastTrack"], "fastTrack"),
        "Coop": safe_int(payload["coop"], "coop"),
        "Residency": safe_int(payload["residency"], "residency"),
        "Gender": safe_int(payload["gender"], "gender"),
        "Prev_Education": safe_int(payload["prevEducation"], "prevEducation"),
        "Age_Group": safe_int(payload["ageGroup"], "ageGroup"),
        "English_Grade": safe_int(payload["englishGrade"], "englishGrade"),
    }

    return pd.DataFrame([row], columns=ACADEMIC_COLUMNS)

# -----------------------------
# Routes
# -----------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Student success prediction API is running.",
        "endpoints": [
            "GET /health",
            "POST /predict-persistence",
            "POST /predict-academic",
        ]
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "persistence_model_loaded": persistence_model is not None,
        "persistence_preprocessor_loaded": persistence_preprocessor is not None,
        "academic_model_loaded": academic_model is not None,
        "academic_preprocessor_loaded": academic_preprocessor is not None,
    })


@app.route("/predict-persistence", methods=["POST"])
def predict_persistence():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({"error": "Request body must be valid JSON."}), 400

        required_fields = [
            "firstTermGpa",
            "secondTermGpa",
            "mathScore",
            "hsAverage",
            "firstLanguage",
            "funding",
            "school",
            "fastTrack",
            "coop",
            "residency",
            "gender",
            "prevEducation",
            "ageGroup",
            "englishGrade",
        ]

        is_valid, error_message = validate_required_fields(data, required_fields)
        if not is_valid:
            return jsonify({"error": error_message}), 400

        input_df = build_persistence_dataframe(data)
        processed = persistence_preprocessor.transform(input_df)
        processed = to_dense_if_needed(processed)

        raw_pred = persistence_model.predict(processed, verbose=0)
        persistence_score = float(np.array(raw_pred).reshape(-1)[0])
        persistence_label = "Likely to Persist" if persistence_score >= 0.5 else "At Risk"

        return jsonify({
            "persistence_score": round(persistence_score, 4),
            "persistence_label": persistence_label
        })

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route("/predict-academic", methods=["POST"])
def predict_academic():
    
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({"error": "Request body must be valid JSON."}), 400

        required_fields = [
            "firstTermGpa",
            "mathScore",
            "hsAverage",
            "firstLanguage",
            "funding",
            "school",
            "fastTrack",
            "coop",
            "residency",
            "gender",
            "prevEducation",
            "ageGroup",
            "englishGrade",
        ]

        is_valid, error_message = validate_required_fields(data, required_fields)
        if not is_valid:
            return jsonify({"error": error_message}), 400
  

        input_df = build_academic_dataframe(data)
        processed = academic_preprocessor.transform(input_df)
        processed = to_dense_if_needed(processed)

        raw_pred = academic_model.predict(processed, verbose=0)
        predicted_value = float(np.array(raw_pred).reshape(-1)[0])

        return jsonify({
            "predicted_gpa": round(predicted_value, 4)
        })

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)