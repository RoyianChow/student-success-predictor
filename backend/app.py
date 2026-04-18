from flask import Flask
from flask_cors import CORS
from controllers.prediction_controller import prediction_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(prediction_bp)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)