// ==========================================================
// DADOS DO JOGO
// Cada fase tem: nome, linhas, colunas e a lista de palavras.
// Cada palavra tem: resposta (como vai no tabuleiro), dica,
// linha e coluna do primeiro quadradinho (começando em 0)
// e direcao: "horizontal" ou "vertical".
// ==========================================================

var FASES = [
  {
    nome: "Visão geral do processador",
    linhas: 16,
    colunas: 14,
    palavras: [
      {
        resposta: "UC",
        dica: "Módulo da CPU que busca instruções, decodifica e coordena os demais componentes.",
        linha: 0,
        coluna: 2,
        direcao: "horizontal"
      },
      {
        resposta: "ULA",
        dica: "Parte da CPU que faz as contas e as operações lógicas.",
        linha: 0,
        coluna: 2,
        direcao: "vertical"
      },
      {
        resposta: "MICROCONTROLADOR",
        dica: "Circuito integrado que reúne CPU, memória e periféricos em um único chip.",
        linha: 0,
        coluna: 11,
        direcao: "vertical"
      },
      {
        resposta: "REGISTRADORES",
        dica: "Memórias minúsculas e muito rápidas que ficam dentro da própria CPU.",
        linha: 3,
        coluna: 13,
        direcao: "vertical"
      },
      {
        resposta: "ROM",
        dica: "Memória não volátil de conteúdo fixo, usada para guardar o firmware inicial.",
        linha: 2,
        coluna: 1,
        direcao: "vertical"
      },
      {
        resposta: "RAM",
        dica: "Memória volátil usada pelo sistema para programas e dados em execução.",
        linha: 2,
        coluna: 1,
        direcao: "horizontal"
      },
      {
        resposta: "MEMORIADEMASSA",
        dica: "Unidade de grande capacidade que guarda dados sem energia, como HD e SSD.",
        linha: 2,
        coluna: 3,
        direcao: "vertical"
      },
      {
        resposta: "FLASH",
        dica: "Memória não volátil, usada em pendrives e SSDs, que apaga em blocos.",
        linha: 3,
        coluna: 9,
        direcao: "vertical"
      },
      {
        resposta: "EEPROM",
        dica: "Memória não volátil que pode ser apagada e regravada eletricamente, byte a byte.",
        linha: 9,
        coluna: 7,
        direcao: "vertical"
      },
      {
        resposta: "CACHE",
        dica: "Memória muito rápida e pequena, próxima à CPU, que guarda dados recentes.",
        linha: 8,
        coluna: 2,
        direcao: "horizontal"
      },
      {
        resposta: "CPU",
        dica: "Processador: unidade que executa as instruções do programa.",
        linha: 12,
        coluna: 5,
        direcao: "vertical"
      },
      {
        resposta: "DUALCORE",
        dica: "Processador com dois núcleos de execução no mesmo chip.",
        linha: 4,
        coluna: 6,
        direcao: "horizontal"
      },
      {
        resposta: "QUADCORE",
        dica: "Processador com quatro núcleos de execução no mesmo chip.",
        linha: 12,
        coluna: 1,
        direcao: "horizontal"
      },
      {
        resposta: "DMA",
        dica: "Técnica que permite transferir dados entre periféricos e memória sem sobrecarregar a CPU.",
        linha: 15,
        coluna: 1,
        direcao: "horizontal"
      },
      {
        resposta: "ADDRESSBUS",
        dica: "Qual barramento a CPU utiliza para indicar a posição de memória que deseja acessar? Escreva a resposta na cruzadinha em inglês.",
        linha: 6,
        coluna: 0,
        direcao: "horizontal"
      },
      {
        resposta: "DATABUS",
        dica: "Canal bidirecional por onde trafegam os valores lidos e escritos na memória.",
        linha: 5,
        coluna: 0,
        direcao: "vertical"
      }
    ]
  },
  {
    nome: "Memórias",
    linhas: 7,
    colunas: 14,
    palavras: [
      {
        resposta: "REGISTRADORES",
        dica: "Memórias minúsculas e muito rápidas que ficam dentro da própria CPU.",
        linha: 3,
        coluna: 1,
        direcao: "horizontal"
      },
      {
        resposta: "RAM",
        dica: "Memória volátil usada pelo sistema para programas e dados em execução.",
        linha: 3,
        coluna: 11,
        direcao: "vertical"
      },
      {
        resposta: "ROM",
        dica: "Memória não volátil de conteúdo fixo, usada para guardar o firmware inicial.",
        linha: 3,
        coluna: 1,
        direcao: "vertical"
      },
      {
        resposta: "CACHE",
        dica: "Memória muito rápida e pequena, próxima à CPU, que guarda dados recentes.",
        linha: 2,
        coluna: 8,
        direcao: "vertical"
      },
      {
        resposta: "EEPROM",
        dica: "Memória não volátil que pode ser apagada e regravada eletricamente, byte a byte.",
        linha: 0,
        coluna: 1,
        direcao: "vertical"
      },
      {
        resposta: "MEMORIADEMASSA",
        dica: "Unidade de grande capacidade que guarda dados sem energia, como HD e SSD.",
        linha: 0,
        coluna: 0,
        direcao: "horizontal"
      },
      {
        resposta: "FLASH",
        dica: "Memória não volátil, usada em pendrives e SSDs, que apaga em blocos.",
        linha: 5,
        coluna: 4,
        direcao: "horizontal"
      }
    ]
  },
  {
    nome: "Barramentos e controle",
    linhas: 5,
    colunas: 10,
    palavras: [
      {
        resposta: "ADDRESSBUS",
        dica: "Qual barramento a CPU utiliza para indicar a posição de memória que deseja acessar? Escreva a resposta na cruzadinha em inglês.",
        linha: 2,
        coluna: 0,
        direcao: "horizontal"
      },
      {
        resposta: "CPU",
        dica: "Processador: unidade que executa as instruções do programa.",
        linha: 0,
        coluna: 8,
        direcao: "vertical"
      },
      {
        resposta: "DMA",
        dica: "Técnica que permite transferir dados entre periféricos e memória sem sobrecarregar a CPU.",
        linha: 2,
        coluna: 1,
        direcao: "vertical"
      },
      {
        resposta: "ULA",
        dica: "Parte da CPU que faz as contas e as operações lógicas.",
        linha: 0,
        coluna: 0,
        direcao: "vertical"
      },
      {
        resposta: "UC",
        dica: "Módulo da CPU que busca instruções, decodifica e coordena os demais componentes.",
        linha: 0,
        coluna: 0,
        direcao: "horizontal"
      },
      {
        resposta: "DATABUS",
        dica: "Canal bidirecional por onde trafegam os valores lidos e escritos na memória.",
        linha: 4,
        coluna: 0,
        direcao: "horizontal"
      }
    ]
  },
  {
    nome: "Processadores",
    linhas: 16,
    colunas: 7,
    palavras: [
      {
        resposta: "CPU",
        dica: "Processador: unidade que executa as instruções do programa.",
        linha: 2,
        coluna: 1,
        direcao: "horizontal"
      },
      {
        resposta: "MICROCONTROLADOR",
        dica: "Circuito integrado que reúne CPU, memória e periféricos em um único chip.",
        linha: 0,
        coluna: 1,
        direcao: "vertical"
      },
      {
        resposta: "CACHE",
        dica: "Memória muito rápida e pequena, próxima à CPU, que guarda dados recentes.",
        linha: 12,
        coluna: 0,
        direcao: "horizontal"
      },
      {
        resposta: "UC",
        dica: "Módulo da CPU que busca instruções, decodifica e coordena os demais componentes.",
        linha: 2,
        coluna: 3,
        direcao: "vertical"
      },
      {
        resposta: "DUALCORE",
        dica: "Processador com dois núcleos de execução no mesmo chip.",
        linha: 5,
        coluna: 4,
        direcao: "vertical"
      },
      {
        resposta: "ULA",
        dica: "Parte da CPU que faz as contas e as operações lógicas.",
        linha: 6,
        coluna: 4,
        direcao: "horizontal"
      },
      {
        resposta: "QUADCORE",
        dica: "Processador com quatro núcleos de execução no mesmo chip.",
        linha: 4,
        coluna: 6,
        direcao: "vertical"
      }
    ]
  },
  {
    nome: "Revisão geral",
    linhas: 14,
    colunas: 16,
    palavras: [
      {
        resposta: "MICROCONTROLADOR",
        dica: "Circuito integrado que reúne CPU, memória e periféricos em um único chip.",
        linha: 4,
        coluna: 0,
        direcao: "horizontal"
      },
      {
        resposta: "MEMORIADEMASSA",
        dica: "Unidade de grande capacidade que guarda dados sem energia, como HD e SSD.",
        linha: 0,
        coluna: 9,
        direcao: "vertical"
      },
      {
        resposta: "REGISTRADORES",
        dica: "Memórias minúsculas e muito rápidas que ficam dentro da própria CPU.",
        linha: 7,
        coluna: 1,
        direcao: "horizontal"
      },
      {
        resposta: "ADDRESSBUS",
        dica: "Qual barramento a CPU utiliza para indicar a posição de memória que deseja acessar? Escreva a resposta na cruzadinha em inglês.",
        linha: 1,
        coluna: 15,
        direcao: "vertical"
      },
      {
        resposta: "QUADCORE",
        dica: "Processador com quatro núcleos de execução no mesmo chip.",
        linha: 0,
        coluna: 2,
        direcao: "vertical"
      },
      {
        resposta: "DATABUS",
        dica: "Canal bidirecional por onde trafegam os valores lidos e escritos na memória.",
        linha: 10,
        coluna: 6,
        direcao: "horizontal"
      },
      {
        resposta: "CACHE",
        dica: "Memória muito rápida e pequena, próxima à CPU, que guarda dados recentes.",
        linha: 3,
        coluna: 12,
        direcao: "vertical"
      },
      {
        resposta: "FLASH",
        dica: "Memória não volátil, usada em pendrives e SSDs, que apaga em blocos.",
        linha: 12,
        coluna: 6,
        direcao: "horizontal"
      },
      {
        resposta: "ROM",
        dica: "Memória não volátil de conteúdo fixo, usada para guardar o firmware inicial.",
        linha: 2,
        coluna: 7,
        direcao: "horizontal"
      },
      {
        resposta: "DMA",
        dica: "Técnica que permite transferir dados entre periféricos e memória sem sobrecarregar a CPU.",
        linha: 3,
        coluna: 0,
        direcao: "vertical"
      }
    ]
  }
];

var VIDAS_INICIAIS = 5;
