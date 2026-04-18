import numpy as np
from models.artifacts import (
    persistence_model,
    persistence_preprocessor,
    academic_model,
    academic_preprocessor,
)
from utils.helpers import (
    build_persistence_dataframe,
    build_academic_dataframe,
    to_dense_if_needed,
)


def get_health_status():
    return {
        "status": "ok",
        "persistence_model_loaded": persistence_model is not None,
        "persistence_preprocessor_loaded": persistence_preprocessor is not None,
        "academic_model_loaded": academic_model is not None,
        "academic_preprocessor_loaded": academic_preprocessor is not None,
    }


def run_persistence_prediction(payload):
    input_df = build_persistence_dataframe(payload)
    processed = persistence_preprocessor.transform(input_df)
    processed = to_dense_if_needed(processed)

    raw_pred = persistence_model.predict(processed, verbose=0)
    persistence_score = float(np.array(raw_pred).reshape(-1)[0])
    persistence_label = "Likely to Persist" if persistence_score >= 0.5 else "At Risk"

    return {
        "persistence_score": round(persistence_score, 4),
        "persistence_label": persistence_label,
    }


def run_academic_prediction(payload):
    input_df = build_academic_dataframe(payload)
    processed = academic_preprocessor.transform(input_df)
    processed = to_dense_if_needed(processed)

    raw_pred = academic_model.predict(processed, verbose=0)
    predicted_value = float(np.array(raw_pred).reshape(-1)[0])

    return {
        "predicted_gpa": round(predicted_value, 4),
    }