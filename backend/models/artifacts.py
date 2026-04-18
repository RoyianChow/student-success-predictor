import os
import joblib
from tensorflow.keras.models import load_model
from config import (
    PERSISTENCE_MODEL_PATH,
    PERSISTENCE_PREPROCESSOR_PATH,
    ACADEMIC_MODEL_PATH,
    ACADEMIC_PREPROCESSOR_PATH,
)

def ensure_file_exists(path: str):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Missing file: {path}")

ensure_file_exists(PERSISTENCE_MODEL_PATH)
ensure_file_exists(PERSISTENCE_PREPROCESSOR_PATH)
ensure_file_exists(ACADEMIC_MODEL_PATH)
ensure_file_exists(ACADEMIC_PREPROCESSOR_PATH)

persistence_model = load_model(PERSISTENCE_MODEL_PATH, compile=False)
persistence_preprocessor = joblib.load(PERSISTENCE_PREPROCESSOR_PATH)

academic_model = load_model(ACADEMIC_MODEL_PATH, compile=False)
academic_preprocessor = joblib.load(ACADEMIC_PREPROCESSOR_PATH)