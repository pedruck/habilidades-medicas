/* Base de conhecimento: resumo "HA N1" (IMG_1550.pdf).
   Trechos entre {{ }} NÃO estão no material — foram complementados e aparecem
   com sublinhado pontilhado roxo no site. */

window.ITENS = {
  bandeja: "Bandeja",
  pincaCheron: "Pinça de Cheron",
  pincaHemo: "Pinça hemostática",
  campoFen: "Campo fenestrado",
  cubaRedonda: "Cuba redonda (para a clorexidina)",
  cubaRim: "Cuba rim",
  gazeEst: "Gazes estéreis",
  foley: "Sonda de Foley (2 ou 3 vias)",
  nelaton: "Sonda de Nelaton (uma via)",
  bolsa: "Bolsa coletora de urina — sistema fechado",
  pvpi: "PVPI tópico ou clorexidina aquosa",
  xilo: "Xilocaína gel / gel hidrossolúvel",
  luvaProc: "Luvas de procedimento",
  luvaEst: "Luvas estéreis (2 pares)",
  agua: "Ampolas de água destilada",
  biombo: "Biombo",
  ser20: "Seringa de 20 ml",
  ser10: "Seringa de 10 ml",
  agulha: "Agulha",
  fita: "Fita adesiva hipoalergênica / esparadrapo / micropore",
  higiene: "Material de higiene íntima (água e sabão)",
  mascara: "Máscara descartável",
  sne: "Sonda nasoenteral (SNE) com fio-guia",
  sng: "Sonda nasogástrica (SNG)",
  gaze: "Gazes",
  esteto: "Estetoscópio",
  sf: "SF 0,9%",
  lanterna: "Lanterna",
  toalha: "Toalha ou papel-toalha",
  coletorUrina: "Frasco/cuba para receber a urina",
  coletorSng: "Frasco/bolsa coletora para drenagem (se sonda aberta)",
  // distratores
  garrote: "Garrote",
  equipoSoro: "Equipo de soro macrogotas",
  bisturi: "Lâmina de bisturi",
  fioSutura: "Fio de sutura",
  scalp: "Scalp / jelco",
  tubo: "Tubo orotraqueal",
  laringo: "Laringoscópio",
  algodao: "Algodão com álcool 70%",
  termometro: "Termômetro",
  espatula: "Abaixador de língua"
};

window.DESTINOS = {
  paciente: { nome: "Fica no paciente", dica: "sonda/sistema em uso, fixado" },
  perfuro: { nome: "Caixa de perfurocortante", dica: "agulhas, ampolas de vidro" },
  infectante: { nome: "Lixo infectante (saco branco)", dica: "gazes, luvas, seringas, campos usados" },
  expurgo: { nome: "Expurgo (reprocessar)", dica: "pinças e cubas permanentes, resíduos líquidos" },
  limpar: { nome: "Limpar com álcool 70% e guardar", dica: "bandeja, estetoscópio, lanterna, biombo" },
  comum: { nome: "Lixo comum", dica: "embalagens de papel/plástico não contaminadas" }
};

window.PROCEDIMENTOS = [
  /* ============================================================ */
  {
    id: "svd",
    grupo: "Sondas",
    nome: "Sondagem vesical de demora",
    sigla: "SVD",
    sub: "Sonda de Foley · técnica estéril",
    cor: "var(--c-svd)",
    intro: [
      "É a introdução de um cateter pela uretra até a bexiga. A sonda de Foley é flexível, confortável, de duas ou três vias, útil quando há necessidade de permanência da sonda.",
      "Indicações: drenagem vesical por obstrução crônica; disfunção vesical (bexiga neurogênica); drenagem vesical após cirurgias urológicas e pélvicas; medida de diurese em pacientes graves; assegurar a higiene perineal e o conforto de pacientes incontinentes de urina e comatosos.",
      "Contraindicado em caso de obstrução mecânica do canal uretral e infecção do trato urinário baixo."
    ],
    obs: [
      "A xilocaína lubrifica o canal uretral.",
      "Na bandeja de cateterismo: pinça de Cheron, pinça hemostática, campo fenestrado, cuba redonda (para colocar a clorexidina) e cuba rim.",
      "Seringa de bico (20 ml) para injetar o gel na uretra masculina."
    ],
    alertas: [
      "Passo 06-B: o material diz “coxas levemente contraídas”; a literatura costuma descrever “coxas levemente afastadas”. Use o termo que o professor usar.",
      "No homem, muitos protocolos mandam introduzir a sonda até a bifurcação (o “Y”) antes de insuflar o balonete, para não insuflar dentro da uretra. O material diz apenas “introduzir até observar a drenagem de urina”.",
      "Reposicionar o prepúcio (passo 21) evita parafimose. Os professores costumam cobrar esse passo."
    ],
    bandeja: {
      itens: [
        ["bandeja"], ["pincaCheron"], ["pincaHemo"], ["campoFen"], ["cubaRedonda"], ["cubaRim"], ["gazeEst"],
        ["foley"], ["bolsa"], ["pvpi"], ["xilo"], ["luvaProc"], ["luvaEst"], ["agua"],
        ["ser20"], ["ser10"], ["agulha"], ["fita"], ["biombo"], ["higiene"]
      ],
      distratores: ["nelaton", "sne", "esteto", "garrote", "equipoSoro", "bisturi", "algodao", "lanterna", "espatula", "scalp"],
      montar: [
        { t: "Conferir a prescrição médica (sonda de demora, calibre)" },
        { t: "Higienizar as mãos {{e limpar a bandeja com álcool 70%}}" },
        { t: "Separar a bandeja de cateterismo vesical {{fechada e dentro da validade}}: pinça de Cheron, pinça hemostática, campo fenestrado, cuba redonda, cuba rim, gazes" },
        { t: "Separar a sonda de Foley, a bolsa coletora de sistema fechado, as seringas de 20 ml e 10 ml, as agulhas e as ampolas de água destilada" },
        { t: "Separar o PVPI tópico/clorexidina, a xilocaína gel (gel hidrossolúvel) e a fita hipoalergênica/esparadrapo" },
        { t: "Separar as luvas de procedimento (higiene íntima) e as luvas estéreis (2 pares)" },
        { t: "Levar o material e o biombo até o paciente" },
        { t: "Abrir a bandeja de cateterismo e adicionar os descartáveis estéreis (sonda, seringas, agulhas, gaze, sistema coletor) dentro da técnica asséptica", ref: "passo 09" }
      ],
      desfazer: [
        { t: "Prender o coletor na parte inferior da cama {{(abaixo do nível da bexiga, sem tocar o chão)}}, depois de colocar data, hora e nome do funcionário", ref: "passo 22" },
        { t: "Auxiliar o paciente a ficar confortável e lavar a área", ref: "passo 23" },
        { t: "{{Descartar agulhas e ampolas na caixa de perfurocortante}}" },
        { t: "{{Descartar gazes, campo fenestrado, seringas e embalagens contaminadas no lixo infectante}}" },
        { t: "Encaminhar o material utilizado (pinças, cubas) ao expurgo", ref: "passo 24" },
        { t: "{{Retirar o biombo e limpar a bandeja com álcool 70%}}" },
        { t: "Retirar as luvas e higienizar as mãos", ref: "passo 25" },
        { t: "Checar o procedimento e fazer as anotações no prontuário", ref: "passos 26–27" }
      ],
      destino: [
        ["foley", "paciente"], ["bolsa", "paciente"], ["agulha", "perfuro"], ["agua", "perfuro", "Ampolas de vidro vazias"],
        ["gazeEst", "infectante", "Gazes usadas na antissepsia"], ["campoFen", "infectante", "Campo fenestrado descartável"],
        ["ser20", "infectante", "Seringas sem agulha"], ["luvaEst", "infectante", "Luvas usadas"],
        ["pincaCheron", "expurgo"], ["pincaHemo", "expurgo"], ["cubaRim", "expurgo"], ["cubaRedonda", "expurgo"],
        ["bandeja", "limpar"], ["biombo", "limpar"], ["fita", "comum", "Embalagens/papel não contaminados"]
      ]
    },
    passos: [
      { f: "Preparo", s: "Conferir a prescrição", t: "Conferir a prescrição médica" },
      { f: "Preparo", s: "Reunir o material e levar até o paciente", t: "Reunir o material e levar até o paciente" },
      { f: "Preparo", s: "Explicar o procedimento", t: "Explicar o procedimento ao paciente" },
      { f: "Preparo", s: "Privacidade (biombo)", t: "Promover a privacidade do paciente (biombo)" },
      { f: "Preparo", s: "Higienizar as mãos", t: "Higienizar as mãos" },
      { f: "Preparo", s: "Posicionar o paciente", t: "Posicionar o paciente", d: ["Feminino: posição dorsal (supino com joelhos flexionados)", "Masculino: posição supina com as coxas levemente contraídas"] },
      { f: "Higiene", s: "Luvas de procedimento + higiene íntima", t: "Calçar luvas de procedimento e realizar a higiene íntima rigorosa com água e sabão (se paciente dependente). Orientar a higienização prévia a pacientes independentes" },
      { f: "Higiene", s: "Retirar luvas e higienizar as mãos", t: "Retirar luvas de procedimento e higienizar as mãos" },
      { f: "Bandeja", s: "Abrir a bandeja e adicionar os descartáveis", t: "Abrir a bandeja de cateterismo e adicionar os materiais descartáveis (sonda de Foley, seringas, agulhas, gaze estéril e sistema coletor fechado) dentro da técnica asséptica" },
      { f: "Bandeja", s: "Calçar luvas estéreis (2 pares)", t: "Calçar luvas estéreis (2 pares)" },
      { f: "Bandeja", s: "Adaptar a Foley ao coletor", t: "Adaptar a sonda de Foley ao coletor de urina sistema fechado" },
      { f: "Bandeja", s: "Gel na seringa de 20 ml (homem) + água destilada na de 10 ml", t: "Com auxílio de um colega, colocar gel hidrossolúvel na seringa de 20 ml (se paciente masculino) e colocar água destilada em seringa de 10 ml" },
      { f: "Bandeja", s: "Testar o cuff (balonete)", t: "Testar o cuff (balonete) com a seringa de 10 ml com água destilada" },
      { f: "Antissepsia", s: "Antissepsia do meato uretral", t: "Realizar antissepsia do meato uretral", d: [
        "Feminino (1): com a mão não dominante, retrair os grandes lábios e manter a posição ao longo do procedimento",
        "Feminino (2): usando pinça na mão dominante esterilizada, pegar gazes estéreis saturadas com solução antisséptica e limpar a área do períneo, da frente para trás, do clitóris na direção do ânus. Com uma nova gaze para cada área, limpar ao longo da dobra dos grandes lábios, perto da dobra dos pequenos lábios e diretamente sobre o centro do meato uretral",
        "Masculino (1): recolher o prepúcio com a mão não dominante, segurar o pênis abaixo da glande e manter a mão não dominante na posição ao longo do procedimento",
        "Masculino (2): com a mão dominante, pegar uma gaze com a pinça e limpar o pênis. Fazer movimento circular do meato uretral para baixo até a base da glande. Repetir a limpeza três vezes, usando uma gaze limpa a cada vez"
      ] },
      { f: "Introdução", s: "Retirar o 1º par de luvas estéreis", t: "Retirar o primeiro par de luva estéril usado na antissepsia" },
      { f: "Introdução", s: "Campo fenestrado sobre a genitália", t: "Posicionar o campo fenestrado sobre a genitália" },
      { f: "Introdução", s: "Lubrificar a sonda (xilocaína)", t: "Lubrificar a sonda com xilocaína. No homem, poderá ser injetado o lubrificante diretamente na uretra através de seringa de 20 ml" },
      { f: "Introdução", s: "Introduzir até drenar urina", t: "Introduzir a sonda delicadamente no meato uretral até observar a drenagem de urina. Quando masculino, levantar o pênis na posição perpendicular ao corpo do paciente" },
      { f: "Introdução", s: "Insuflar o balonete (água destilada)", t: "Insuflar o balonete com água destilada (para fixar)" },
      { f: "Introdução", s: "Tracionar e fixar (coxa / suprapúbica)", t: "Tracionar vagarosamente a sonda e fixar na parte interna da coxa (mulher) e área suprapúbica (homem)" },
      { f: "Finalização", s: "Reposicionar prepúcio + remover antisséptico", t: "Não esquecer de reposicionar o prepúcio e remover o excesso de antisséptico da área meatal" },
      { f: "Finalização", s: "Prender coletor na cama (data, hora, nome)", t: "Prender o coletor na parte inferior da cama após colocar data, hora e nome do funcionário" },
      { f: "Finalização", s: "Conforto do paciente + lavar a área", t: "Auxiliar o paciente a ficar confortável e lavar a área" },
      { f: "Finalização", s: "Material ao expurgo", t: "Encaminhar o material utilizado ao expurgo" },
      { f: "Finalização", s: "Retirar luvas e higienizar as mãos", t: "Retirar luvas e higienizar as mãos" },
      { f: "Finalização", s: "Checar o procedimento", t: "Checar o procedimento" },
      { f: "Finalização", s: "Anotar no prontuário", t: "Realizar as anotações no prontuário" }
    ]
  },

  /* ============================================================ */
  {
    id: "sva",
    grupo: "Sondas",
    nome: "Sondagem vesical de alívio",
    sigla: "SVA",
    sub: "Sonda de Nelaton · técnica estéril",
    cor: "var(--c-sva)",
    adaptado: "O material só traz o passo a passo da sonda de demora. Este roteiro adapta aquele passo a passo para a Nelaton: o que muda está sublinhado em roxo.",
    intro: [
      "A sonda de alívio (Nelaton) não permanece por muito tempo na pessoa: é retirada após o esvaziamento da bexiga.",
      "Indicada para cateterismo intermitente ou de alívio. É fabricada com material mais rígido e tem uma via."
    ],
    obs: [
      "Nelaton: uma via, mais rígida, retirada após o esvaziamento vesical.",
      "Foley: duas ou três vias, flexível, para permanência."
    ],
    alertas: [
      "Sem balonete, não usa seringa de 10 ml nem água destilada e não é fixada.",
      "Sem bolsa coletora: a urina é recebida na cuba rim/frasco. {{Observe e anote o volume e o aspecto.}}"
    ],
    bandeja: {
      itens: [
        ["bandeja"], ["pincaCheron"], ["pincaHemo"], ["campoFen"], ["cubaRedonda"], ["cubaRim", "recebe a urina"], ["gazeEst"],
        ["nelaton"], ["pvpi"], ["xilo"], ["luvaProc"], ["luvaEst"], ["ser20", "gel no homem"], ["biombo"], ["higiene"], ["coletorUrina", "", true]
      ],
      distratores: ["foley", "bolsa", "ser10", "agua", "sne", "esteto", "garrote", "equipoSoro", "fita", "bisturi"],
      montar: [
        { t: "Conferir a prescrição médica (sondagem de alívio)" },
        { t: "Higienizar as mãos {{e limpar a bandeja com álcool 70%}}" },
        { t: "Separar a bandeja de cateterismo: pinça de Cheron, pinça hemostática, campo fenestrado, cuba redonda, cuba rim, gazes" },
        { t: "Separar a {{sonda de Nelaton}}, a seringa de 20 ml (gel, se homem), o PVPI/clorexidina e a xilocaína gel" },
        { t: "{{Não separar bolsa coletora, seringa de 10 ml nem água destilada (a Nelaton não tem balonete)}}" },
        { t: "Separar as luvas de procedimento e as luvas estéreis (2 pares); levar o material e o biombo até o paciente" },
        { t: "Abrir a bandeja e adicionar os descartáveis estéreis dentro da técnica asséptica" }
      ],
      desfazer: [
        { t: "{{Retirar a sonda delicadamente após o esvaziamento da bexiga}}" },
        { t: "Reposicionar o prepúcio e remover o excesso de antisséptico" },
        { t: "{{Observar volume e aspecto da urina e desprezá-la no expurgo}}" },
        { t: "{{Descartar sonda, gazes, campo e seringa no lixo infectante}}" },
        { t: "Encaminhar pinças e cubas ao expurgo" },
        { t: "{{Retirar o biombo e limpar a bandeja com álcool 70%}}" },
        { t: "Retirar as luvas e higienizar as mãos" },
        { t: "Checar e anotar no prontuário {{(incluindo o volume drenado)}}" }
      ],
      destino: [
        ["nelaton", "infectante", "Sonda de Nelaton usada"], ["gazeEst", "infectante", "Gazes usadas"], ["campoFen", "infectante", "Campo fenestrado descartável"],
        ["ser20", "infectante", "Seringa sem agulha"], ["luvaEst", "infectante", "Luvas usadas"],
        ["coletorUrina", "expurgo", "Urina drenada (após medir)"], ["pincaCheron", "expurgo"], ["pincaHemo", "expurgo"], ["cubaRim", "expurgo"], ["cubaRedonda", "expurgo"],
        ["bandeja", "limpar"], ["biombo", "limpar"]
      ]
    },
    passos: [
      { f: "Preparo", s: "Conferir a prescrição", t: "Conferir a prescrição médica" },
      { f: "Preparo", s: "Reunir o material e levar até o paciente", t: "Reunir o material e levar até o paciente" },
      { f: "Preparo", s: "Explicar o procedimento", t: "Explicar o procedimento ao paciente" },
      { f: "Preparo", s: "Privacidade (biombo)", t: "Promover a privacidade do paciente (biombo)" },
      { f: "Preparo", s: "Higienizar as mãos", t: "Higienizar as mãos" },
      { f: "Preparo", s: "Posicionar o paciente", t: "Posicionar o paciente", d: ["Feminino: posição dorsal (supino com joelhos flexionados)", "Masculino: posição supina com as coxas levemente contraídas"] },
      { f: "Higiene", s: "Luvas de procedimento + higiene íntima", t: "Calçar luvas de procedimento e realizar a higiene íntima rigorosa com água e sabão (se paciente dependente)" },
      { f: "Higiene", s: "Retirar luvas e higienizar as mãos", t: "Retirar luvas de procedimento e higienizar as mãos" },
      { f: "Bandeja", s: "Abrir a bandeja e adicionar os descartáveis", t: "Abrir a bandeja de cateterismo e adicionar os descartáveis ({{sonda de Nelaton}}, seringa, gaze estéril) dentro da técnica asséptica" },
      { f: "Bandeja", s: "Calçar luvas estéreis (2 pares)", t: "Calçar luvas estéreis (2 pares)" },
      { f: "Bandeja", s: "Gel na seringa de 20 ml (homem)", t: "Com auxílio de um colega, colocar gel hidrossolúvel na seringa de 20 ml (se paciente masculino)" },
      { f: "Antissepsia", s: "Antissepsia do meato uretral", t: "Realizar antissepsia do meato uretral (mesma técnica da sonda de demora)", d: [
        "Feminino: retrair os grandes lábios com a mão não dominante; com a pinça, gazes com antisséptico da frente para trás (clitóris → ânus), uma gaze nova por área: grandes lábios, pequenos lábios, meato",
        "Masculino: recolher o prepúcio e segurar o pênis abaixo da glande; movimento circular do meato até a base da glande, 3 vezes, gaze limpa a cada vez"
      ] },
      { f: "Introdução", s: "Retirar o 1º par de luvas estéreis", t: "Retirar o primeiro par de luva estéril usado na antissepsia" },
      { f: "Introdução", s: "Campo fenestrado sobre a genitália", t: "Posicionar o campo fenestrado sobre a genitália {{e a cuba rim para receber a urina}}" },
      { f: "Introdução", s: "Lubrificar a sonda (xilocaína)", t: "Lubrificar a sonda com xilocaína (no homem, pode injetar o gel na uretra com a seringa de 20 ml)" },
      { f: "Introdução", s: "Introduzir até drenar urina", t: "Introduzir a sonda delicadamente até observar a drenagem de urina {{na cuba rim}}. No homem, pênis perpendicular ao corpo" },
      { f: "Introdução", s: "Aguardar o esvaziamento", t: "{{Manter a sonda até o esvaziamento da bexiga}}" },
      { f: "Introdução", s: "Retirar a sonda", t: "{{Retirar a sonda delicadamente}} (a Nelaton é retirada após o esvaziamento vesical)" },
      { f: "Finalização", s: "Reposicionar prepúcio + remover antisséptico", t: "Reposicionar o prepúcio e remover o excesso de antisséptico da área meatal" },
      { f: "Finalização", s: "Volume e aspecto da urina", t: "{{Observar volume e aspecto da urina}}" },
      { f: "Finalização", s: "Conforto do paciente", t: "Auxiliar o paciente a ficar confortável" },
      { f: "Finalização", s: "Material ao expurgo", t: "Encaminhar o material utilizado ao expurgo" },
      { f: "Finalização", s: "Retirar luvas e higienizar as mãos", t: "Retirar luvas e higienizar as mãos" },
      { f: "Finalização", s: "Checar e anotar (volume)", t: "Checar o procedimento e realizar as anotações no prontuário {{(volume e aspecto)}}" }
    ]
  },

  /* ============================================================ */
  {
    id: "sne",
    grupo: "Sondas",
    nome: "Sondagem nasoenteral",
    sigla: "SNE",
    sub: "Técnica limpa · confirmação por RX",
    cor: "var(--c-sne)",
    intro: [
      "Ambas (enteral e gástrica) são técnicas limpas (não estéreis).",
      "É uma sonda longa, que vai até o intestino, com duas entradas na extremidade proximal: uma para o guia e outra para confirmar se está no lugar certo. A ponta distal (de tungstênio) permite o teste para saber se está no intestino (RX).",
      "Indicação: administração de dietas e medicamentos de maneira mais confortável e segura, principalmente nos pacientes idosos, acamados e com reflexos diminuídos.",
      "Equipo de alimentação: cor azul. Equipo de medicação e hidratação: transparente.",
      "Pode ficar até 30 dias ou até obstruir."
    ],
    obs: [
      "Mensuração: enrolar a ponta proximal da sonda na mão.",
      "O que diferencia a gástrica da enteral: a mensuração e os testes (a enteral tem um teste a mais, o RX).",
      "Contraindicações naso: desvio de septo, trauma cranioencefálico. Naso e oro: trauma raquimedular.",
      "Cuidado com abdome globoso (na mensuração)."
    ],
    alertas: [
      "Ausculta de 20 ml de ar e aspiração confirmam pouco. A confirmação definitiva da SNE é o RX: só inicie dieta/medicação depois dele (passo 26).",
      "Mensuração: o material traz 3 opções. A marcada como “mais usual no hospital” é nariz → lóbulo da orelha (2×) → xifoide."
    ],
    bandeja: {
      itens: [
        ["bandeja"], ["mascara"], ["sne"], ["xilo", "gel hidrossolúvel"], ["ser20"], ["gaze"], ["esteto"],
        ["luvaProc", "2 pares: troca no passo 11"], ["fita", "fixação na face"], ["sf"], ["lanterna", "se necessário", true], ["biombo", "se necessário", true], ["toalha"]
      ],
      distratores: ["sng", "foley", "luvaEst", "campoFen", "pvpi", "pincaCheron", "bolsa", "ser10", "tubo", "laringo", "espatula", "equipoSoro"],
      montar: [
        { t: "Higienizar as mãos", ref: "passo 01" },
        { t: "Conferir a prescrição médica", ref: "passo 02" },
        { t: "{{Limpar a bandeja com álcool 70%}}" },
        { t: "Separar a SNE (com fio-guia), a seringa de 20 ml, as gazes e o gel hidrossolúvel (xilocaína gel)" },
        { t: "Separar o estetoscópio, o SF 0,9%, a fita adesiva/esparadrapo (fixação) e a toalha ou papel-toalha" },
        { t: "Separar a máscara descartável e as luvas de procedimento {{(2 pares)}}; a lanterna e o biombo se necessário" },
        { t: "Reunir o material e levar para próximo do paciente", ref: "passo 02" }
      ],
      desfazer: [
        { t: "Solicitar que o paciente fique em decúbito lateral direito (para a sonda descer)", ref: "passo 19" },
        { t: "Reunir todo o material e deixar o paciente confortável", ref: "passo 20" },
        { t: "Desprezar o material {{(fio-guia, gazes, seringa e papel no lixo infectante; embalagens no lixo comum)}}", ref: "passo 21" },
        { t: "Higienizar a bandeja {{com álcool 70%}}; {{limpar o estetoscópio e a lanterna}}", ref: "passo 21" },
        { t: "Retirar as luvas de procedimento e a máscara descartável", ref: "passo 22" },
        { t: "Higienizar as mãos", ref: "passo 23" },
        { t: "Realizar anotações no prontuário", ref: "passo 24" },
        { t: "Encaminhar para o RX; após confirmar a localização, iniciar a nutrição/medicação", ref: "passos 25–26" }
      ],
      destino: [
        ["sne", "paciente", "SNE fixada na face"], ["sne", "infectante", "Fio-guia retirado"], ["gaze", "infectante", "Gazes com gel"],
        ["ser20", "infectante", "Seringa usada no teste"], ["toalha", "infectante", "Papel-toalha usado"], ["luvaProc", "infectante", "Luvas de procedimento"],
        ["mascara", "infectante", "Máscara descartável"], ["esteto", "limpar"], ["lanterna", "limpar"], ["bandeja", "limpar"], ["fita", "comum", "Embalagem da sonda"]
      ]
    },
    passos: [
      { f: "Preparo", s: "Higienizar as mãos", t: "Higienizar as mãos" },
      { f: "Preparo", s: "Conferir prescrição, reunir material", t: "Conferir prescrição médica, reunir o material e levar para próximo ao paciente" },
      { f: "Preparo", s: "Explicar ao paciente e ao familiar", t: "Explicar o procedimento ao paciente e ao familiar" },
      { f: "Preparo", s: "Isolar com biombo", t: "Isolar a cama com um biombo" },
      { f: "Preparo", s: "Posição de Fowler", t: "Posicionar o paciente em posição “Fowler”. Caso seja contraindicado, manter em decúbito dorsal, lateralizando a cabeça e inclinando-a para frente", d: ["Fowler: 90°", "Semi-Fowler: 45°"] },
      { f: "Preparo", s: "Máscara + luvas de procedimento", t: "Colocar máscara e calçar luvas de procedimento" },
      { f: "Avaliação", s: "Avaliar narinas, cavidade oral e prótese", t: "Avaliar a desobstrução nasal e/ou desvio de septo; inspecionar a cavidade oral e o uso de prótese dentária" },
      { f: "Avaliação", s: "Toalha sobre o tórax", t: "Colocar toalha ou papel-toalha sobre o tórax do paciente" },
      { f: "Avaliação", s: "Higienizar a narina (SF 0,9%)", t: "Higienizar a narina com SF 0,9% quando necessário" },
      { f: "Mensuração", s: "Mensurar e marcar com fita", t: "Mensurar a sonda, marcando com fita adesiva", d: [
        "Ponta do nariz → lóbulo da orelha; lóbulo da orelha → processo xifoide; processo xifoide → cicatriz umbilical",
        "Ponta do nariz → lóbulo da orelha; lóbulo da orelha → processo xifoide + 10/15 cm",
        "Ponta do nariz → lóbulo da orelha (2×); lóbulo da orelha → processo xifoide (mais usual no hospital)",
        "Cuidado com abdome globoso"
      ] },
      { f: "Introdução", s: "Trocar a luva de procedimento", t: "Trocar para outra luva de procedimento" },
      { f: "Introdução", s: "Lubrificar com gel hidrossolúvel", t: "Lubrificar a sonda com gel hidrossolúvel" },
      { f: "Introdução", s: "Introduzir até a resistência → fletir a cabeça", t: "Introduzir a sonda na narina do paciente até sentir uma resistência; nesse ponto, peça para fletir a cabeça" },
      { f: "Introdução", s: "Pedir para deglutir", t: "Solicitar a colaboração, pedindo para deglutir" },
      { f: "Introdução", s: "Introduzir até o ponto marcado", t: "Continuar introduzindo a sonda até o ponto marcado" },
      { f: "Teste", s: "Testar: 20 ml de ar + ausculta; aspirar", t: "Testar o posicionamento", d: ["Injetando 20 ml de ar com seringa e auscultar com estetoscópio, simultaneamente, a região epigástrica", "Aspirar o conteúdo gástrico"] },
      { f: "Teste", s: "Retirar o fio-guia", t: "Após confirmação do posicionamento, retirar o fio-guia" },
      { f: "Teste", s: "Fixar na face (mesmo lado da narina)", t: "A sonda deverá ser fixada na face, do mesmo lado da narina utilizada, com fita adesiva fina" },
      { f: "Finalização", s: "Decúbito lateral direito", t: "Solicitar que o paciente fique em decúbito lateral direito (para a sonda descer)" },
      { f: "Finalização", s: "Reunir material, paciente confortável", t: "Reunir todo o material e deixar o paciente confortável" },
      { f: "Finalização", s: "Desprezar material e higienizar bandeja", t: "Desprezar o material e higienizar a bandeja" },
      { f: "Finalização", s: "Retirar luvas e máscara", t: "Retirar as luvas de procedimento e a máscara descartável" },
      { f: "Finalização", s: "Higienizar as mãos", t: "Higienizar as mãos" },
      { f: "Finalização", s: "Anotar no prontuário", t: "Realizar anotações no prontuário" },
      { f: "Confirmação", s: "Encaminhar para RX (~1h30)", t: "Encaminhar para o RX. Demora cerca de 1 hora e 30 minutos para a sonda chegar ao local adequado" },
      { f: "Confirmação", s: "Confirmado → iniciar dieta/medicação", t: "Após confirmar a localização, iniciar a nutrição/medicação" }
    ]
  },

  /* ============================================================ */
  {
    id: "sng",
    grupo: "Sondas",
    nome: "Sondagem nasogástrica",
    sigla: "SNG",
    sub: "Técnica limpa · sem fio-guia",
    cor: "var(--c-sng)",
    intro: [
      "É uma sonda em que a extremidade proximal possui uma única entrada e a extremidade distal é cheia de orifícios (por onde a alimentação sai).",
      "Indicação: coletar amostras de conteúdo gástrico (exames), esvaziamento gástrico, nutrição, hidratação e administração de medicamentos aos pacientes impossibilitados de deglutir. Lavado gástrico e descompressão gástrica.",
      "Não existe um limite certo de tempo, mas não pode ficar muitos dias. Se o paciente precisar se alimentar por mais dias, colocar sonda enteral."
    ],
    obs: [
      "Técnica limpa (não estéril).",
      "Contraindicações naso: desvio de septo, TCE. Naso e oro: trauma raquimedular.",
      "Mensuração: ponta do nariz → lóbulo da orelha; lóbulo da orelha → processo xifoide + 2/4 cm."
    ],
    alertas: [
      "Diferente da SNE: não tem fio-guia, não precisa de decúbito lateral direito nem de RX, e a mensuração termina em xifoide + 2/4 cm.",
      "Passo 18: a sonda fica fechada ou aberta conforme a prescrição. {{Aberta = ligada a um frasco coletor para drenagem.}}"
    ],
    bandeja: {
      itens: [
        ["bandeja"], ["sng"], ["xilo", "gel hidrossolúvel"], ["ser20"], ["gaze"], ["esteto"], ["toalha"],
        ["luvaProc", "2 pares: troca no passo 11"], ["fita", "fixação na face"], ["mascara"], ["sf", "se necessário (passo 08)", true], ["biombo", "se necessário (passo 04)", true], ["coletorSng", "se sonda aberta", true]
      ],
      distratores: ["sne", "foley", "luvaEst", "campoFen", "pvpi", "pincaCheron", "bolsa", "ser10", "agua", "tubo", "laringo", "equipoSoro"],
      montar: [
        { t: "Higienizar as mãos", ref: "passo 01" },
        { t: "Conferir a prescrição médica", ref: "passo 02" },
        { t: "{{Limpar a bandeja com álcool 70%}}" },
        { t: "Separar a SNG, a seringa de 20 ml, as gazes e o gel hidrossolúvel" },
        { t: "Separar o estetoscópio, a toalha, o esparadrapo/fita hipoalergênica, a máscara e as luvas de procedimento {{(2 pares)}}" },
        { t: "Se necessário: SF 0,9%, biombo {{e frasco coletor (sonda aberta)}}" },
        { t: "Reunir todo o material na bandeja e levar para próximo do paciente", ref: "passo 02" }
      ],
      desfazer: [
        { t: "Manter a sonda fechada ou aberta, conforme a indicação da prescrição", ref: "passo 18" },
        { t: "{{Descartar gazes, seringa, papel-toalha e embalagens contaminadas no lixo infectante}}" },
        { t: "Recolher todo o material, deixando o ambiente em ordem, e encaminhar ao expurgo", ref: "passo 19" },
        { t: "{{Limpar a bandeja e o estetoscópio com álcool 70%}}" },
        { t: "Retirar as luvas de procedimento e a máscara descartável", ref: "passo 20" },
        { t: "Higienizar as mãos", ref: "passo 21" },
        { t: "Realizar anotações no prontuário", ref: "passo 22" }
      ],
      destino: [
        ["sng", "paciente", "SNG fixada na face"], ["coletorSng", "paciente", "Frasco coletor (se aberta)"],
        ["gaze", "infectante", "Gazes com gel"], ["ser20", "infectante", "Seringa usada no teste"], ["toalha", "infectante", "Papel-toalha usado"],
        ["luvaProc", "infectante", "Luvas de procedimento"], ["mascara", "infectante", "Máscara descartável"],
        ["esteto", "limpar"], ["bandeja", "limpar"], ["fita", "comum", "Embalagem da sonda"]
      ]
    },
    passos: [
      { f: "Preparo", s: "Higienizar as mãos", t: "Higienizar as mãos" },
      { f: "Preparo", s: "Conferir prescrição, reunir material", t: "Conferir a prescrição médica, reunir todo o material na bandeja e levar para próximo ao paciente" },
      { f: "Preparo", s: "Orientar paciente e familiar", t: "Orientar paciente e familiar sobre o procedimento" },
      { f: "Preparo", s: "Biombo, se necessário", t: "Isolar a cama com um biombo, se necessário" },
      { f: "Preparo", s: "Posição de Fowler", t: "Posicionar o paciente em posição “Fowler”" },
      { f: "Preparo", s: "Máscara + luvas de procedimento", t: "Colocar máscara e calçar luvas de procedimento" },
      { f: "Avaliação", s: "Próteses móveis, obstrução, septo", t: "Verificar o uso de próteses dentárias móveis e avaliar obstrução nasal e/ou desvio de septo" },
      { f: "Avaliação", s: "Higienizar a narina (SF), se necessário", t: "Higienizar a narina com solução fisiológica, se necessário" },
      { f: "Avaliação", s: "Toalha no tórax", t: "Colocar a toalha no tórax (ou papel-toalha)" },
      { f: "Mensuração", s: "Medir: nariz-lóbulo-xifoide + 2/4 cm", t: "Medir a sonda, marcando com fita adesiva", d: ["Ponta do nariz → lóbulo da orelha; lóbulo da orelha → processo xifoide + 2/4 cm"] },
      { f: "Introdução", s: "Trocar a luva de procedimento", t: "Trocar de luva de procedimento" },
      { f: "Introdução", s: "Lubrificar (gaze + gel)", t: "Lubrificar a sonda utilizando gaze com gel hidrossolúvel" },
      { f: "Introdução", s: "Introduzir até a resistência → fletir a cabeça", t: "Introduzir na narina do paciente até sentir resistência; nesse ponto, peça ao paciente para fletir a cabeça" },
      { f: "Introdução", s: "Pedir para deglutir", t: "Solicitar a colaboração, pedindo para deglutir" },
      { f: "Introdução", s: "Introduzir até o ponto marcado", t: "Continuar introduzindo a sonda até o ponto marcado" },
      { f: "Teste", s: "Testar: 20 ml de ar + ausculta; aspirar", t: "Testar o posicionamento", d: ["Injetar 20 ml de ar com seringa e auscultar com estetoscópio, simultaneamente, a região epigástrica", "Aspirar o conteúdo gástrico"] },
      { f: "Teste", s: "Fixar na face (mesmo lado da narina)", t: "A sonda deverá ser fixada adicionalmente na face, do mesmo lado da narina utilizada, com fita adesiva fina" },
      { f: "Finalização", s: "Fechada ou aberta (prescrição)", t: "Manter a sonda fechada ou aberta, conforme a indicação da prescrição" },
      { f: "Finalização", s: "Recolher material → expurgo", t: "Recolher todo o material, deixando o ambiente em ordem, e encaminhar ao expurgo" },
      { f: "Finalização", s: "Retirar luvas e máscara", t: "Retirar as luvas de procedimento e a máscara descartável" },
      { f: "Finalização", s: "Higienizar as mãos", t: "Higienizar as mãos" },
      { f: "Finalização", s: "Anotar no prontuário", t: "Realizar anotações no prontuário" }
    ]
  },

  /* ============================================================ */
  {
    id: "maos",
    grupo: "Mãos e paramentação",
    nome: "Higienização simples das mãos",
    sigla: "HM",
    sub: "Água e sabonete · fora do centro cirúrgico",
    cor: "var(--c-maos)",
    intro: [
      "Importante controle de infecções relacionadas à assistência à saúde (IRAS): um dos pilares da prevenção e controle de infecções nos serviços de saúde. A segurança do paciente depende da higienização cuidadosa e frequente das mãos.",
      "Contaminação das mãos: contato direto com o paciente; contato indireto com produtos e equipamentos (bombas de infusão, barras protetoras das camas, estetoscópio...).",
      "Produtos: sabonetes comuns (não têm antimicrobianos, apenas removem a sujeira) e agentes antissépticos (álcool, clorexidina, PVPI, triclosan...).",
      "Materiais: lavatório/pia de lavagem e lavabo cirúrgico; dispensadores de sabonetes e antissépticos; porta papel-toalha; lixeira para descarte do papel-toalha; produtos antissépticos; água limpa; papel-toalha.",
      "Técnicas: higienização simples das mãos; higienização antisséptica das mãos; fricção de antisséptico nas mãos; antissepsia cirúrgica ou preparo pré-operatório das mãos."
    ],
    obs: [
      "A higienização antisséptica segue os mesmos movimentos, trocando o sabonete comum por um antisséptico.",
      "Luvas não substituem a higienização das mãos."
    ],
    alertas: [
      "{{Duração recomendada pela ANVISA: 40 a 60 segundos (água e sabonete). Fricção com álcool: 20 a 30 segundos, mesmos movimentos 2 a 7, sem enxágue.}}",
      "{{Algumas versões do protocolo da ANVISA incluem friccionar os punhos com movimentos circulares antes do enxágue. A figura do material não traz esse passo, então confirme com o professor.}}",
      "{{Antes de começar: retirar adornos (anéis, pulseiras, relógio). Está no material, na seção Antissepsia.}}"
    ],
    passos: [
      { f: "Início", s: "Retirar adornos", t: "{{Retirar adornos (anéis, pulseiras, relógio)}}" },
      { f: "Início", s: "0 · Molhar as mãos", t: "Molhe as mãos com água" },
      { f: "Início", s: "1 · Sabonete na palma", t: "Aplique na palma da mão quantidade suficiente de sabonete líquido para cobrir todas as superfícies das mãos" },
      { f: "Fricção", s: "2 · Palmas entre si", t: "Friccione as palmas das mãos entre si" },
      { f: "Fricção", s: "3 · Palma no dorso, dedos entrelaçados", t: "Friccione a palma direita contra o dorso da mão esquerda entrelaçando os dedos, e vice-versa" },
      { f: "Fricção", s: "4 · Espaços interdigitais", t: "Entrelace os dedos e friccione os espaços interdigitais" },
      { f: "Fricção", s: "5 · Dorso dos dedos (vai e vem)", t: "Friccione o dorso dos dedos de uma mão com a palma da mão oposta, segurando os dedos, com movimento de vai e vem, e vice-versa" },
      { f: "Fricção", s: "6 · Polegar (circular)", t: "Friccione o polegar esquerdo, com o auxílio da palma da mão direita, utilizando-se de movimento circular, e vice-versa" },
      { f: "Fricção", s: "7 · Polpas digitais e unhas", t: "Friccione as polpas digitais e unhas da mão direita contra a palma da mão esquerda, fazendo movimento circular, e vice-versa" },
      { f: "Final", s: "8 · Enxaguar", t: "Enxágue bem as mãos com água" },
      { f: "Final", s: "9 · Secar com papel-toalha", t: "Seque as mãos com papel-toalha descartável" },
      { f: "Final", s: "10 · Fechar a torneira com papel-toalha", t: "No caso de torneiras com contato manual para fechamento, sempre utilize papel-toalha" }
    ]
  },

  /* ============================================================ */
  {
    id: "cirurgica",
    grupo: "Mãos e paramentação",
    nome: "Antissepsia cirúrgica das mãos",
    sigla: "CC",
    sub: "Escovação no centro cirúrgico",
    cor: "var(--c-cir)",
    intro: [
      "Antissepsia: procedimento que tem como objetivo eliminar a microbiota transitória da pele e reduzir a microbiota residente, além de proporcionar efeito residual na pele do profissional e do paciente.",
      "Antissepsia é a desinfecção de um local; assepsia é a higienização preventiva. Busca evitar a contaminação do sítio cirúrgico e de medicamentos e fórmulas lácteas durante procedimentos com barreira estéril.",
      "Esterilização: processo que visa destruir todas as formas de vida microbianas que possam contaminar produtos, materiais e objetos voltados para a saúde (bactérias, vírus e fungos).",
      "Antissepsia: processo que visa reduzir ou inibir o crescimento de microrganismos na pele ou nas mucosas. Utilizam-se os antissépticos.",
      "Degermação: ato de redução ou remoção parcial dos microrganismos da pele ou de outros tecidos por métodos químico-mecânicos (ex.: higienização das mãos com água e sabão).",
      "Indicações: pré-operatório (toda a equipe cirúrgica); procedimentos invasivos (ex.: inserção de cateter intravascular central, drenagem de cavidades, suturas...); preparo e porcionamento de leite humano ordenhado ou fórmulas lácteas para RNs.",
      "O que é necessário: água corrente (controle microbiológico semestral); sabão com antisséptico (clorexidina degermante 4%) e dispensers para sabão líquido com antisséptico; lavatórios/pias com torneiras ou comando que dispensem o contato das mãos."
    ],
    obs: [
      "Ordem para lavagem: unhas → palma e dorso da mão → dedos e interdigitais → antebraço.",
      "Importante: retirar adornos (anéis, pulseiras, relógios...); nunca utilizar unhas artificiais; comunicar o setor em caso de doença periungueal; luvas não substituem a higienização das mãos; não reutilizar escovas."
    ],
    alertas: [
      "Mãos sempre acima dos cotovelos, do início ao fim. A água escorre das mãos para os cotovelos.",
      "{{Antes da escovação você já deve estar com pijama cirúrgico, gorro, máscara e propés (ver Paramentação).}}"
    ],
    ordemExtra: { titulo: "Ordem para lavagem", itens: ["Unhas", "Palma e dorso da mão", "Dedos e interdigitais", "Antebraço"] },
    passos: [
      { f: "Antes", s: "Retirar adornos; sem unhas artificiais", t: "Retirar adornos (anéis, pulseiras, relógios...). Nunca utilizar unhas artificiais; comunicar o setor em caso de doença periungueal" },
      { f: "Escovação", s: "1 · Abrir a torneira e molhar mãos, antebraços e cotovelos", t: "Abrir a torneira, molhar as mãos, antebraços e cotovelos" },
      { f: "Escovação", s: "2 · Antisséptico em concha → mãos, antebraço, cotovelo", t: "Recolher, com as mãos em concha, o antisséptico e espalhar nas mãos, antebraço e cotovelo. No caso de escova impregnada com antisséptico, pressione a parte da esponja contra a pele e espalhe por todas as partes" },
      { f: "Escovação", s: "3 · Limpar sob as unhas (cerdas/limpador)", t: "Limpar sob as unhas com as cerdas da escova ou com limpador de unhas, sob água corrente" },
      { f: "Escovação", s: "4 · Friccionar 3 a 5 min, mãos acima dos cotovelos", t: "Friccionar as mãos, observando espaços interdigitais e antebraço, por no mínimo 3 a 5 minutos, mantendo as mãos acima dos cotovelos", d: ["Ordem: unhas → palma e dorso → dedos e interdigitais → antebraço"] },
      { f: "Enxágue", s: "5 · Enxaguar mãos → cotovelos; fechar com cotovelo/joelho/pé", t: "Enxaguar as mãos em água corrente, no sentido das mãos para os cotovelos, retirando todo resíduo do produto. Fechar a torneira com o cotovelo, joelho ou pés, se a torneira não possuir fotossensor" },
      { f: "Secagem", s: "6 · Secar com compressa estéril (mãos → cotovelo)", t: "Enxugar as mãos em toalhas ou compressas estéreis, com movimentos compressivos, iniciando pelas mãos e seguindo pelo antebraço e cotovelo, atentando para utilizar as diferentes dobras da toalha/compressa para regiões distintas" },
      { f: "Depois", s: "Descartar a escova (não reutilizar)", t: "Não reutilizar escovas {{(descartar após o uso)}}" }
    ]
  },

  /* ============================================================ */
  {
    id: "paramentacao",
    grupo: "Mãos e paramentação",
    nome: "Paramentação cirúrgica",
    sigla: "EPI",
    sub: "Ordem para colocar e retirar",
    cor: "var(--c-par)",
    intro: [
      "É um conjunto de barreiras contra a invasão de microrganismos nos sítios cirúrgicos dos clientes/pacientes e de proteção dos profissionais contra a exposição a sangue e outros fluidos orgânicos.",
      "É indicada para todas as pessoas envolvidas no trabalho do centro cirúrgico, principalmente dentro das salas de operação.",
      "Objetivos: controle da infecção de sítio cirúrgico (ISC); controle da infecção hospitalar (IH); segurança do paciente; segurança da equipe cirúrgica (risco ocupacional); qualidade da assistência prestada ao paciente no ambiente cirúrgico.",
      "1. Troca da roupa convencional pelo pijama cirúrgico (no vestiário, que corresponde à zona de proteção do CC).",
      "2. No CC deve haver um ponto de demarcação entre as áreas de circulação sem restrição e as semirrestritas, que ninguém pode ultrapassar sem estar adequadamente paramentado: pijama cirúrgico, gorro/capuz, propés e máscara facial.",
      "3. Cores diferentes diferenciam os profissionais que atuam no CC (médico, enfermeiras, técnicas de enfermagem, fisioterapeuta, farmácia...).",
      "Componentes: pijama cirúrgico, avental cirúrgico, campos cirúrgicos, luva cirúrgica, propé cirúrgico, gorro/touca cirúrgica, máscara cirúrgica, óculos de proteção."
    ],
    obs: [
      "Tabela: COLOCAR avental → máscara → óculos → gorro → luva. RETIRAR luvas → avental → gorro → óculos → máscara.",
      "Figura (com protetor facial): COLOCAR avental descartável → máscara PFF2/N95 → óculos → touca → protetor facial → luvas. RETIRAR luvas → avental → protetor facial → touca → óculos → máscara.",
      "Mnemônico: a luva é a última a entrar e a primeira a sair; a máscara é a última a sair."
    ],
    alertas: [
      "A tabela do material é a ordem de EPI. No centro cirúrgico, pijama, gorro, máscara e propés já são colocados antes de cruzar a demarcação (ponto 2 do material), e o avental estéril + luvas estéreis só depois da escovação. A aba “Fluxo no CC” junta as duas coisas. Confirme com o professor qual sequência ele avalia.",
      "{{Higienize as mãos ao terminar de retirar os EPIs (e entre etapas, se contaminar).}}"
    ],
    listas: [
      {
        id: "colocar", nome: "Colocar (tabela)", passos: [
          { s: "Avental", t: "Avental" }, { s: "Máscara", t: "Máscara" }, { s: "Óculos", t: "Óculos" }, { s: "Gorro", t: "Gorro" }, { s: "Luva", t: "Luva" }
        ]
      },
      {
        id: "retirar", nome: "Retirar (tabela)", passos: [
          { s: "Luvas", t: "Luvas" }, { s: "Avental", t: "Avental" }, { s: "Gorro", t: "Gorro" }, { s: "Óculos", t: "Óculos" }, { s: "Máscara", t: "Máscara" }
        ]
      },
      {
        id: "colocarFig", nome: "Colocar (figura)", passos: [
          { s: "Avental descartável", t: "Avental descartável" }, { s: "Máscara PFF2/N95", t: "Máscara PFF2/N95" }, { s: "Óculos de proteção", t: "Óculos de proteção" },
          { s: "Touca", t: "Touca" }, { s: "Protetor facial", t: "Protetor facial" }, { s: "Luvas", t: "Luvas" }
        ]
      },
      {
        id: "retirarFig", nome: "Retirar (figura)", passos: [
          { s: "Luvas", t: "Luvas" }, { s: "Avental descartável", t: "Avental descartável" }, { s: "Protetor facial", t: "Protetor facial" },
          { s: "Touca", t: "Touca" }, { s: "Óculos de proteção", t: "Óculos de proteção" }, { s: "Máscara PFF2/N95", t: "Máscara PFF2/N95" }
        ]
      },
      {
        id: "fluxo", nome: "Fluxo no CC", passos: [
          { f: "Vestiário", s: "Trocar a roupa pelo pijama cirúrgico", t: "Trocar a roupa convencional pelo pijama cirúrgico no vestiário (zona de proteção do CC)" },
          { f: "Vestiário", s: "Gorro/capuz, propés e máscara facial", t: "Colocar gorro/capuz, propés e máscara facial: só assim se ultrapassa a demarcação para a área semirrestrita" },
          { f: "Vestiário", s: "Óculos de proteção", t: "{{Colocar os óculos de proteção}}" },
          { f: "Lavabo", s: "Retirar adornos", t: "Retirar adornos (anéis, pulseiras, relógios)" },
          { f: "Lavabo", s: "Escovação cirúrgica (3 a 5 min)", t: "Realizar a antissepsia cirúrgica das mãos (escovação, 3 a 5 minutos, mãos acima dos cotovelos)" },
          { f: "Sala", s: "Secar com compressa estéril", t: "Enxugar com compressa estéril: mãos → antebraço → cotovelo, dobras diferentes" },
          { f: "Sala", s: "Vestir o avental estéril", t: "{{Vestir o avental estéril segurando pela gola, sem tocar a face externa; o circulante amarra as tiras das costas}}" },
          { f: "Sala", s: "Calçar as luvas estéreis", t: "{{Calçar as luvas estéreis cobrindo o punho do avental}}" },
          { f: "Sala", s: "Mãos acima da cintura, à frente do corpo", t: "{{Manter as mãos acima da cintura e à frente do corpo até o início da cirurgia}}" }
        ]
      }
    ]
  }
];
