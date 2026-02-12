# 🐔 Granja Backend

Backend responsável pelo controle e automação de uma granja via MQTT.

Este serviço envia comandos para um ESP32 que executa o firmware
[embedded-farm](https://github.com/FagnerTimoteo/embedded-farm),
responsável por sensores e atuadores físicos.

O sistema permite monitoramento em tempo real e automação de dispositivos
como ventilação, iluminação e outros equipamentos da granja.

## Arquitetura

Backend ⇄ MQTT ⇄ ESP32 (embedded-farm) ⇄ Sensores/Atuadores

## Frontend

Este backend é utilizado junto com o frontend:
[https://github.com/joelrodriguesvieira/front-end-farm-management](https://github.com/joelrodriguesvieira/front-end-farm-management.git)

## Projetos relacionados

- Firmware ESP32: embedded-farm
- Frontend: front-end-farm-management

Backend em Node.js com Express e MongoDB para gerenciamento de dados da granja.

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/FagnerTimoteo/granja-back.git
cd granja-back
```

2. Instale as dependências:
```bash
npm install
npm install bcryptjs jsonwebtoken mongoose express
npm install mqtt
```

## 🛠️ Desenvolvimento

1. Para rodar o servidor com nodemon:
``` bash
npm start
```

2. O servidor iniciará em:
``` bash
http://localhost:3000
```

## 🚀 Produção
Para rodar o servidor no modo de produção:
``` bash
npm start
```

## 🗄️ Banco de Dados
Este projeto usa MongoDB local.
``` bash
# String de conexão:
mongodb://127.0.0.1:27017/banco
```

Certifique-se de estar com o MongoDB rodando antes de iniciar o backend.

- **POST**
```bash
```

- **GET**
```bash
```

### 📦 Tecnologias Utilizadas:
1. Node.js
2. Express
3. MongoDB
4. Mongoose
5. CORS
6. Nodemon (dev)
