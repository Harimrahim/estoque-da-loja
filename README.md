✨ Funcionalidades

🍇 Painel da Loja (loja.html)

• Fechamento do dia: a loja informa a pesagem dos consumíveis e a estimativa das embalagens, separados por categoria.
• Validade opcional em qualquer item: botão "📅 Validade" em cada item para informar a validade do lote.
• Pop-up de validade próxima (vence em até 3 dias ou já vencido): "Validade próxima, é recomendável a criação de uma promoção com esse item".
• Giro semanal: o fechamento de segunda-feira também grava o total de todos os itens.
• Mostra o último valor registrado de cada item e permite corrigir o fechamento do mesmo dia.

🛒 Painel do Comprador (comprador.html)

Abre num menu com 5 opções:

• Compra da semana: itens críticos e baixos já vêm marcados com a quantidade sugerida. Ajuste quantidade, valor e fornecedor e registre tudo de uma vez. O estoque é atualizado na hora.
• Cotação: preço por unidade na última compra, média, mais barato e comparação entre fornecedores, com o histórico de cada item.
• Resumo e sugestões: contadores de críticos, baixos e vencendo, mais as sugestões de compra.
• Estoque e itens: categorias (Consumíveis, Embalagens, Outros) que abrem ao tocar, busca por nome (se não existir, cadastra como item novo), filtros Crítico/Baixo/Vencendo, nível crítico editável por item, registro de compra com qualidade (1 a 5 estrelas), fornecedor e validade opcional, e cadastro de itens (escolha vários do cardápio de uma vez ou digite um novo).
• Histórico e giro: últimas compras e comparação do giro entre semanas (consumo estimado = estoque anterior + compras − estoque atual).

📊 Painel do Dono (dono.html)

• Contadores de críticos, baixos e vencendo.
• Categorias para tocar: Itens críticos, Consumíveis e Embalagens.
• Nível crítico editável em cada item. Os copos mostram a conversão em pacotes e caixas (50 copos por pacote, 25 pacotes por caixa).
• Último fechamento, últimas compras e configuração dos avisos (dia de compra e hora do lembrete de fechamento).

🔔 Avisos

Sino 🔔 em todos os painéis, com pop-up automático uma vez por dia em cada aparelho:
estoque crítico, estoque baixando, validade próxima, dia de compra (padrão: quarta-feira), segunda-feira de giro e fechamento pendente (padrão: a partir das 21h).

Os avisos aparecem quando o app é aberto. Notificação com o celular bloqueado exigiria um servidor enviando push (Firebase Cloud Messaging com função agendada, que pede o plano Blaze).

📲 Aplicativo instalável (PWA)

manifest.json, sw.js e ícones. No Chrome do celular: menu ⋮ → Instalar aplicativo. O service worker usa a rede primeiro e guarda o visual para abrir sem internet; os dados sempre vêm do Firebase.

🧠 Como o sistema decide

Situação
Regra
Crítico
estoque ≤ nível crítico do item
Baixo
estoque ≤ 1,5 × nível crítico
Consumo médio
média móvel (70% histórico + 30% do dia) da diferença entre fechamentos consecutivos
Entra em "Compras"
item crítico, baixo ou que dura ≤ 3 dias
Quantidade sugerida
o maior entre 3 × nível crítico e 7 dias de consumo, menos o estoque atual (arredondada em 0,5 para kg/L e para cima, inteira, nos demais)

Unidades: consumíveis em kg (0,65 = 650 g, sem gramas), Leite Condensado Piracanjuba em litro, Açaí (base) em caixa, embalagens em unidade.

🗂️ Estrutura do repositório

├── index.html           Menu inicial (Loja / Comprador / Dono)
├── loja.html            Painel da loja
├── comprador.html       Painel do comprador
├── dono.html            Painel do dono
├── style.css            Visual (paleta da logo: roxo, amarelo, laranja, verde-folha)
├── comum.js             Conexão com Firebase e funções compartilhadas
├── avisos.js            Sistema de avisos (sino e pop-up)
├── firebase-config.js   Chaves do SEU projeto Firebase
├── manifest.json        Manifesto do PWA
├── sw.js                Service worker
├── icon-192.png · icon-512.png · icon-maskable-512.png
├── logo.png             Logo da Sedex do Açaí
├── firestore.rules      Regras do Firestore
└── teste.html           Diagnóstico: confere se todos os arquivos estão no ar

Dados (Firestore)

Coleção
Conteúdo
itens
nome, categoria (adicional, base, embalagem, outro), unidade, estoque, nível crítico (minimo), validade, consumo médio, último fechamento
fechamentos
contagem do dia (um documento por data)
giro
total de todos os itens, gravado nas segundas-feiras
compras
item, quantidade, valor, fornecedor, qualidade, validade, data
config
dia de compra e hora do lembrete de fechamento

🚀 Como instalar do zero

1. Firebase: crie um projeto novo em console.firebase.google.com (use um projeto só para o estoque) e registre um app Web (</>).
2. Chaves: edite firebase-config.js com o seu firebaseConfig. O formato deve começar com export const firebaseConfig = { ... };.
3. Firestore: Firestore Database → Criar banco de dados (modo produção, região southamerica-east1).
4. Regras: em Firestore → Regras, cole o conteúdo de firestore.rules e publique.
5. GitHub Pages: Settings → Pages → Branch main / root → Save. Não é necessário ativar o Authentication.
6. Teste: abra /teste.html no site. Todos os arquivos devem aparecer com ✅.
7. Primeiro uso: no painel do Comprador, Estoque → Carregar itens do cardápio, ajuste os níveis críticos e faça o primeiro fechamento pela Loja.

Itens iniciais: Açaí (base), Leite Condensado, Leite Condensado Piracanjuba, Leite em Pó, Granola, Banana, Kiwi, Uva, Nutella, Creme de Leitinho, Creme de Morango, Creme de Chocolate, Creme de Pistache, Ovomaltine, Amendoim Torrado, Paçoca, Sucrilhos, Gotas de Chocolate, Bis Lacta, Confete, Copo 700/500/400/300 ml, Marmita 700 g, Pote 1 litro, Tampa, Touca, Roleta e Colher.

🔒 Segurança

O sistema foi feito para uso interno sem login e sem senha. Por isso as regras do Firestore são abertas apenas para as coleções do estoque, e compras, fechamentos e giro não podem ser apagados pelo site. Qualquer pessoa com o link e as chaves públicas do projeto consegue ler e gravar nessas coleções, então não divulgue o link. Se um dia for necessário proteger, o caminho é reativar o Firebase Authentication e restringir as regras.

🧾 Histórico de versões

• v0.7 • Menu do comprador: menu inicial com 5 opções, Compra da semana (registro de vários itens de uma vez) e Cotação com histórico de preços e fornecedores.
• v0.6 • Avisos e PWA: sino de avisos nos três painéis, configuração do dia de compra e da hora do fechamento no painel do dono, manifesto, service worker e ícones para instalar como app.
• v0.5 • Unidades e validade: consumíveis em kg, litro e caixa; embalagens em unidades; validade opcional em qualquer item; nível crítico editável no comprador e no dono; botão para atualizar itens antigos; conversão de copos em pacotes no painel do dono.
• v0.4 • Comprador dinâmico: categorias que abrem ao tocar, busca e cadastro digitando o nome, escolha de itens do cardápio, filtros por status, detalhe expansível com formulário de compra.
• v0.3 • Sem login e painel do dono: remoção do login, menu inicial e painel do dono.
• v0.2 • Visual novo: paleta da logo, cabeçalho com degradê, cartões coloridos por status.
• v0.1 • Base: fechamento diário, estoque, validade, compras, sugestão de compra, giro semanal e regras do Firebase.

🗺️ Próximos passos

• ☐ Nota fiscal: anexar foto/PDF à compra e, depois, ler o QR Code da nota.
• ☐ Pedido de compra automático por fornecedor, pronto para enviar pelo WhatsApp.
• ☐ Notificações push com o app fechado (Firebase Cloud Messaging + função agendada, plano Blaze).
• ☐ Gerar APK para Android a partir do PWA (PWABuilder).

Feito para a Sedex do Açaí 💜💛
