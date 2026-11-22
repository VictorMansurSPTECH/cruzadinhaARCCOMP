# Cruzadinha de Arquitetura Computacional

Jogo de cruzadinha que roda no navegador para treinar os termos da disciplina de Arquitetura Computacional (SPTech, Sprint 3).

**Link do site:** https://SEU-USUARIO.github.io/arqcomp-cruzadinha/

## Como jogar

1. Leia a dica em destaque no painel acima do tabuleiro. Use os botões **Dica anterior** e **Próxima dica** para navegar, ou clique em uma pista nas listas abaixo.
2. Digite as letras diretamente nas casas do tabuleiro.
3. Para validar uma palavra, clique com o mouse na primeira casa dela, mantenha o botão pressionado e solte na última casa (arraste em linha reta).
4. Se as letras estiverem certas, a palavra fica azul. Se estiverem erradas, aparece um alerta vermelho e você perde uma vida.
5. O botão **Conferir** mostra quais palavras estão certas e quais estão erradas.
6. O botão **Reiniciar** limpa o tabuleiro e recomeça o jogo.
7. O jogo termina quando você acerta todas as palavras ou quando suas vidas acabam. Na tela final aparecem a quantidade de acertos e o aproveitamento.

## Palavras e pistas

| Nº | Direção | Palavra | Pista |
|----|---------|---------|-------|
| 1 | Horizontal | UC | Módulo da CPU que busca instruções, decodifica e coordena os demais componentes. |
| 1 | Vertical | ULA | Parte da CPU que faz as contas e as operações lógicas. |
| 2 | Vertical | MICROCONTROLADOR | Circuito integrado que reúne CPU, memória e periféricos em um único chip. |
| 3 | Horizontal | RAM | Memória volátil usada pelo sistema para programas e dados em execução. |
| 3 | Vertical | ROM | Memória não volátil de conteúdo fixo, usada para guardar o firmware inicial. |
| 4 | Vertical | MEMORIADEMASSA | Unidade de grande capacidade que guarda dados sem energia, como HD e SSD. |
| 5 | Vertical | FLASH | Memória não volátil, usada em pendrives e SSDs, que apaga em blocos. |
| 6 | Vertical | REGISTRADORES | Memórias minúsculas e muito rápidas que ficam dentro da própria CPU. |
| 7 | Horizontal | DUALCORE | Processador com dois núcleos de execução no mesmo chip. |
| 8 | Vertical | DATABUS | Canal bidirecional por onde trafegam os valores lidos e escritos na memória. |
| 9 | Horizontal | ADDRESSBUS | Canal por onde a CPU informa a posição de memória que quer acessar. |
| 10 | Horizontal | CACHE | Memória muito rápida e pequena, próxima à CPU, que guarda dados recentes. |
| 11 | Vertical | EEPROM | Memória não volátil que pode ser apagada e regravada eletricamente, byte a byte. |
| 12 | Horizontal | QUADCORE | Processador com quatro núcleos de execução no mesmo chip. |
| 13 | Vertical | CPU | Processador: unidade que executa as instruções do programa. |
| 14 | Horizontal | DMA | Técnica que permite transferir dados entre periféricos e memória sem sobrecarregar a CPU. |

## Estrutura do projeto

```
arqcomp-cruzadinha/
├── index.html       # estrutura da página
├── css/
│   └── style.css    # aparência (paleta SPTech)
├── js/
│   ├── dados.js     # palavras, pistas e posições no tabuleiro
│   └── jogo.js      # lógica: tabuleiro, validação, vidas e tela final
└── README.md
```

## Tecnologias

HTML, CSS e JavaScript puros, sem bibliotecas externas.
