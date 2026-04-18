import pandas as pd
from config import PERSISTENCE_COLUMNS, ACADEMIC_COLUMNS
from utils.validators import safe_float, safe_int


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