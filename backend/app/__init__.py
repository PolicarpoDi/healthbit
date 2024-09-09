from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Permitir CORS para habilitar comunicação entre frontend e backend

    from .routes.alimentacao import alimentacao_bp
    from .routes.formulario import formulario_bp

    # Registrar blueprints
    app.register_blueprint(alimentacao_bp)
    app.register_blueprint(formulario_bp)

    return app
