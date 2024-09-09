# Prova Fichas

## 1. Executando a aplicação

### Alem da convencional(local), criei um compose para deploy da aplicação

### Passos para rodar pelo compose

Certifique-se de que você tenha o Docker e o Docker Compose instalados.

No diretório raiz do projeto, onde está o docker-compose.yml, execute o seguinte comando:
```bash
docker-compose up --build
```

Isso irá:

* Construir a aplicação frontend (React) e backend (Flask).
* Subir ambos os serviços, com o frontend disponível em http://localhost:3000 e o backend em http://localhost:5000.

Observações:

* O frontend usa o Nginx para servir os arquivos estáticos.
* O backend Flask estará disponível na porta 5000.
* O Compose gerencia o networking, então o frontend pode se comunicar com o backend usando http://backend:5000.


## 2. Rodando o Backend (Flask) Localmente
Passos para rodar o backend:

Crie um ambiente virtual para isolar as dependências:
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

Instale as dependências listadas no arquivo requirements.txt:
```bash
pip install -r backend/requirements.txt
```

Execute o backend: Navegue até o diretório backend e execute o arquivo app.py:
```bash
cd backend
python app.py
```

Isso iniciará o servidor Flask na porta 5000 por padrão. Você pode acessar o backend em: http://localhost:5000.

## 2.1 Rodando o Frontend (React) Localmente
Passos para rodar o frontend:

Instale as dependências do React: Navegue até o diretório frontend e execute:
```bash
cd frontend
npm install
```

Atualize o .env do frontend: No arquivo .env do frontend, configure a variável REACT_APP_BACKEND_URL para apontar para o backend rodando localmente:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Execute o frontend: Depois de instalar as dependências e configurar o .env, execute:
```bash
npm start
```

Isso iniciará o servidor de desenvolvimento do React na porta 3000. Você pode acessar o frontend em: http://localhost:3000.

## Comunicação entre Frontend e Backend
Agora que ambos estão rodando localmente:

* O frontend acessa o backend utilizando a variável REACT_APP_BACKEND_URL, que está configurada para http://localhost:5000.
* Qualquer requisição feita no React usando axios ou fetch para o backend será direcionada para http://localhost:5000.

## Testando o Projeto Localmente
1. Abra o frontend em http://localhost:3000 no navegador.
2. Preencha o formulário e avance pelas páginas.
3. Quando o formulário for submetido, ele enviará as informações para o backend em http://localhost:5000.
4. No terminal onde o backend está rodando, você verá os dados recebidos sendo impressos no console.

## Resumo:
* Backend: Rodando em http://localhost:5000 usando Flask.
* Frontend: Rodando em http://localhost:3000 usando React.
* Comunicação: Configurada pelo .env do frontend (REACT_APP_BACKEND_URL=http://localhost:5000).