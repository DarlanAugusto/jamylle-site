/* =========================================================
   CONFIGURAÇÃO DO SITE — edite só este arquivo.
   ========================================================= */
const SITE = {
  nome: "Jamylle Vitória",
  primeiroNome: "Jamylle",
  titulo: "Manicure e Pedicure",
  cidade: "Araçatuba-SP",
  endereco: "Residencial Paquerê · Araçatuba-SP — atendimento em casa e a domicílio",

  // Somente números: 55 + DDD + número
  whatsapp: "5518981573040",

  // Deixe "" para esconder a rede social
  redes: {
    instagram: "https://instagram.com/jamylle_vit",
    tiktok: "",
    facebook: "",
  },

  bio: "Sou apaixonada pelo universo das unhas e estou em formação profissional como manicure e pedicure. Atendo no Residencial Paquerê e também vou até você, em Araçatuba. Cada atendimento é feito com calma, atenção aos detalhes e todo o cuidado com a higiene, porque você merece se sentir linda e segura.",

  // Escassez honesta: mude ou deixe "" para esconder
  vagasTexto: "Agenda aberta",
  vagasLonga: "Poucos horários disponíveis nesta semana",

  notaPrecos: "Valores especiais de lançamento enquanto monto meu portfólio. No atendimento a domicílio, a taxa varia conforme o bairro. Ficou com dúvida? Me chama 😉",
  msgPrecos: "Oi, Jamylle! Vi seu site e tenho uma dúvida sobre os serviços 💅",

  // Fotos fixas (coloque o arquivo em /img e escreva o caminho)
  fotos: {
    hero: "img/trabalhos/maos-nude.jpg",
    perfil: "img/perfil.jpg",
    antes: "img/trabalhos/maos-antes.jpg",
    depois: "img/trabalhos/maos-branco-leitoso.jpg",
  },

  // Serviços: preco em reais (sem preco → "Valor no WhatsApp"). precoDe aparece riscado. destaque = selo dourado.
  servicos: [
    { nome: "Mão",               desc: "Cutilagem, formato e esmaltação na unha natural.", preco: 30, tempo: "45 min" },
    { nome: "Pé",                desc: "Cutilagem caprichada, lixamento e esmaltação na unha natural.", preco: 40, tempo: "50 min" },
    { nome: "Pé + Mão",          desc: "O combo completo para sair renovada. Economize R$ 5!", preco: 65, precoDe: 70, tempo: "1h30", destaque: "Mais pedido" },
    { nome: "Atendimento a domicílio", desc: "Levo todo o material esterilizado até a sua casa.", tempo: "Araçatuba" },
  ],

  // Categorias usadas no filtro da galeria
  categorias: ["Mãos", "Pés"],

  // Galeria: uma linha por foto
  // { foto: "img/trabalhos/01.jpg", titulo: "Francesinha clássica", categoria: "Mãos" }
  // miniatura: "final" → em montagens verticais (antes | durante | depois), o quadradinho mostra só o resultado
  galeria: [
    { foto: "img/trabalhos/maos-branco-leitoso.jpg", titulo: "Branco leitoso", categoria: "Mãos" },
    { foto: "img/trabalhos/pes-vermelho-antes-depois.jpg", titulo: "Vermelho clássico · antes e depois", categoria: "Pés", miniatura: "final" },
    { foto: "img/trabalhos/maos-nude.jpg", titulo: "Nude rosado", categoria: "Mãos" },
    { foto: "img/trabalhos/pes-nude-antes-depois.jpg", titulo: "Nude caramelo · antes e depois", categoria: "Pés", miniatura: "final" },
    { foto: "img/trabalhos/maos-rosa-malva.jpg", titulo: "Rosa malva", categoria: "Mãos" },
  ],

  // Depoimentos reais de clientes (com permissão). Lista vazia [] esconde a seção.
  // { texto: "Amei o resultado!", autor: "Nome da cliente" }
  depoimentosDemo: false,
  depoimentos: [],

  // Crédito no rodapé: "Site desenvolvido por ...". Contatos vazios não aparecem.
  credito: {
    nome: "Darlan Silva",
    whatsapp: "5518981487723",   // só números: 55 + DDD + número
    linkedin: "https://www.linkedin.com/in/darlanas",
    instagram: "https://instagram.com/darlan.silv4",
  },

  faq: [
    { p: "Onde é o atendimento?", r: "Atendo em casa, no Residencial Paquerê, e também a domicílio em Araçatuba. O endereço completo é enviado na confirmação pelo WhatsApp." },
    { p: "Quanto custa?", r: "Mão R$ 30, pé R$ 40 e o combo pé + mão sai por R$ 65. No atendimento a domicílio, a taxa de deslocamento é combinada pelo WhatsApp, conforme o bairro." },
    { p: "Os materiais são esterilizados?", r: "Sim. Alicates e espátulas passam por limpeza e esterilização, e lixas e palitos são descartáveis, de uso único." },
    { p: "Quanto tempo dura a esmaltação?", r: "Na unha natural, em média de 7 a 10 dias, dependendo da rotina e dos cuidados. Usar luvas nas tarefas de casa ajuda bastante!" },
    { p: "Posso levar uma foto de referência?", r: "Pode e deve! Mande a foto no WhatsApp ao agendar que eu já me preparo para fazer do seu jeito." },
    { p: "Quais as formas de pagamento?", r: "Pix, cartão ou dinheiro." },
  ],
};
