import traceback
from flask import Blueprint, jsonify, request
from utils.validators import validate_required_fields
from services.prediction_service import (
    get_health_status,
    run_persistence_prediction,
    run_academic_prediction,
)

prediction_bp = Blueprint("prediction_bp", __name__)

PERSISTENCE_REQUIRED_FIELDS = [
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

ACADEMIC_REQUIRED_FIELDS = [
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


@prediction_bp.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Student success prediction API is running.",
        "endpoints": [
            "GET /health",
            "POST /predict-persistence",
            "POST /predict-academic",
        ]
    })


@prediction_bp.route("/health", methods=["GET"])
def health():
    return jsonify(get_health_status())


@prediction_bp.route("/predict-persistence", methods=["POST"])
def predict_persistence():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({"error": "Request body must be valid JSON."}), 400

        is_valid, error_message = validate_required_fields(data, PERSISTENCE_REQUIRED_FIELDS)
        if not is_valid:
            return jsonify({"error": error_message}), 400

        result = run_persistence_prediction(data)
        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@prediction_bp.route("/predict-academic", methods=["POST"])
def predict_academic():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({"error": "Request body must be valid JSON."}), 400

        is_valid, error_message = validate_required_fields(data, ACADEMIC_REQUIRED_FIELDS)
        if not is_valid:
            return jsonify({"error": error_message}), 400

        result = run_academic_prediction(data)
        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500