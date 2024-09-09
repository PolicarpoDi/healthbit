from flask import Blueprint, request, jsonify
import logging

formulario_bp = Blueprint('formulario', __name__)

logging.basicConfig(level=logging.INFO)

@formulario_bp.route('/submitFormulario', methods=['POST'])
def submit_formulario():
    try:
        data = request.get_json()  
        print("Formulário recebido:")
        print(data)
        logging.info("Formulário recebido:")
        logging.info(data)
        return jsonify({"message": "Formulário submetido com sucesso!"}), 200
    except Exception as e:
        print(f"Erro ao processar o formulário: {e}")
        logging.error(f"Erro ao processar o formulário: {e}")
        return jsonify({"error": "Erro ao processar o formulário"}), 400
