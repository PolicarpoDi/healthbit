from flask import Blueprint, jsonify

alimentacao_bp = Blueprint('alimentacao', __name__)

dados_alimentacao = {
    "Vegetariano": [
        "Vegetais (legumes e verduras em geral)",
        "Frutas",
        "Carne magra (aves, peixes, carne sem gordura)",
        "Ovos",
        "Doces (doces de qualquer tipo, bolos recheados com cobertura, biscoitos doces, refrigerantes e sucos industrializados)",
        "Grãos (arroz, milho e outros grãos)",
        "Massas",
        "Leite e seus derivados (iogurte, bebida láctea, coalhada, requeijão, queijo)",
        "Pães"
    ],
    "Vegano": [
        "Vegetais (legumes e verduras em geral)",
        "Frutas",
        "Grãos (arroz, milho e outros grãos)",
        "Massas",
        "Pães"
    ],
    "Sem Restrição": [
        "Vegetais (legumes e verduras em geral)",
        "Frutas",
        "Carne gordurosa (porco, carne bovina com gordura, pele de frango)",
        "Carne magra (aves, peixes, carne sem gordura)",
        "Frituras ou embutidos (salgadinho frito, hambúrguer, carne salgada, presunto, salsicha, mortadela, salame, linguiça e outros)",
        "Ovos",
        "Doces (doces de qualquer tipo, bolos recheados com cobertura, biscoitos doces, refrigerantes e sucos industrializados)",
        "Grãos (arroz, milho e outros grãos)",
        "Massas",
        "Leite e seus derivados (iogurte, bebida láctea, coalhada, requeijão, queijo)",
        "Pães"
    ]
}

@alimentacao_bp.route('/getAlimentacao', methods=['GET'])
def get_alimentacao():
    return jsonify(dados_alimentacao), 200
