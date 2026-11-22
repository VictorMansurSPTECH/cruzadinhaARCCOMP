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

## Fases

O jogo tem 5 fases, escolhidas pelos botões no topo da página:

1. **Visão geral do processador**: 16 palavras (a cruzadinha principal).
2. **Memórias**: RAM, ROM, EEPROM, FLASH, CACHE, REGISTRADORES e MEMORIADEMASSA.
3. **Barramentos e controle**: ADDRESSBUS, DATABUS, DMA, UC, ULA e CPU.
4. **Processadores**: MICROCONTROLADOR, DUALCORE, QUADCORE, CPU, CACHE, ULA e UC.
5. **Revisão geral**: 10 palavras misturando todos os temas.

Ao completar uma fase, aparece o botão **Próxima fase**. Se as vidas acabarem, o botão **Tentar de novo** recomeça a mesma fase.

## Palavras e pistas (Fase 1)

As pistas são as mesmas em todas as fases, então a tabela abaixo serve para todas.

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
│   ├── dados.js     # fases, palavras, pistas e posições no tabuleiro
│   └── jogo.js      # lógica: tabuleiro, validação, vidas e tela final
└── README.md
```

## Tecnologias

HTML, CSS e JavaScript puros, sem bibliotecas externas.

## Diário de prompts

Registro resumido das solicitações feitas durante o desenvolvimento do jogo, com o que foi feito em cada uma.

| # | Prompt (resumo) | O que foi feito |
|---|-----------------|-----------------|
| 1 | Criar uma cruzadinha no navegador sobre Arquitetura Computacional, com dicas, estrutura de pastas para JS e CSS, boas práticas, uso só do que o aluno domina, README, paleta SPTech, cabeçalho, corpo, painel de dicas com botões anterior/próxima, validação por arraste com pop-up vermelho, contador de vidas e tela final com acertos e aproveitamento. | Primeira versão do jogo: `index.html`, `css/style.css`, `js/dados.js`, `js/jogo.js` e `README.md`, com as 16 palavras do documento orientador. |
| 2 | Reenvio do mesmo pedido, com novos arquivos anexados. | Mantida a versão anterior, sem alterações. |
| 3 | "Refaça a estrutura e deixe tudo em uma única pasta." | Arquivos reunidos na raiz de `arqcomp-cruzadinha/`. |
| 4 | "O que tem em arqcomp cruzadinha?" | Descrição dos arquivos da pasta. |
| 5 | "Não deixe em arquivo zip." | Removido o zip; arquivos soltos. |
| 6 | "Agrupe do jeito que você estava fazendo, mas sem pasta compactada." | Restaurada a estrutura com `css/` e `js/`, sem zip. |
| 7 | "Refaça o código." | `js/jogo.js` reescrito de forma mais limpa, com funções auxiliares e a mesma lógica. |
| 8 | "Agora compacte tudo em uma única pasta zip." | Gerado `arqcomp-cruzadinha.zip`. |
| 9 | Envio do projeto em zip (com histórico Git) e pedido para atuar como desenvolvedor de jogos de cruzadinha, criar de 4 a 5 fases com o conteúdo da conversa, deixar tudo em português e entregar em zip. | Criadas 5 fases (visão geral, memórias, barramentos e controle, processadores e revisão geral), com menu para escolher a fase, botão de próxima fase e de tentar de novo. Tabuleiros gerados e validados automaticamente. |
| 10 | "Não entregue um arquivo zip; entregue cada arquivo separado que você modificou." | Arquivos modificados entregues separadamente. |
| 11 | "Me mostre os códigos." | Exibição do código dos arquivos. |
| 12 | "Melhor me traga o arquivo .zip." | Gerado novamente `arqcomp-cruzadinha.zip`, com `css/` e `js/`. |
| 13 | Criar um diário de prompts de toda a conversa para colocar no README. | Esta seção. |
