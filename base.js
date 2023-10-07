//Define o estado do jogo 
let gameState = 'start';
        
        //Seleciona os paddles 
        let paddle_1 = document.querySelector('.paddle_1');
        let paddle_2 = document.querySelector('.paddle_2');
        //Seleciona o placar
        const score_1 = document.querySelector('.player_1_score');
        const score_2 = document.querySelector('.player_2_score');
        //Seleciona as coordenadas dos paddles
        let paddle_1_coord = paddle_1.getBoundingClientRect();
        let paddle_2_coord = paddle_2.getBoundingClientRect();
        let paddle_common = document.querySelector('.paddle').getBoundingClientRect();

        //Seleciona o board (tabuleiro)
        const board = document.querySelector('.board');

        //Configurações inicias da bola e suas coordenadas 
        const initial_ball = document.querySelector('.ball');
        const ball = document.querySelector('.ball');
        const initial_ball_coord = ball.getBoundingClientRect();
        let ball_coord = initial_ball_coord;
        const board_coord = board.getBoundingClientRect();
        

        const message = document.querySelector('.message');
        let dx = Math.floor(Math.random() * 4) + 3;
        let dy = Math.floor(Math.random() * 4) + 3;
        let dxd = Math.floor(Math.random() * 2);
        let dyd = Math.floor(Math.random() * 2);

        //BONUS
        // Cria um novo elemento HTML para representar o bônus
        const bonus = document.createElement('div');
        bonus.classList.add('bonus');

        
        // Posiciona o bônus aleatoriamente no tabuleiro de jogo
        bonus.style.top = Math.floor(Math.random() * board.offsetHeight) + 'px';
        bonus.style.left = Math.floor(Math.random() * board.offsetWidth) + 'px';

        // Adiciona o bônus ao tabuleiro de jogo
        board.appendChild(bonus);
        // Adiciona um listener de eventos ao elemento `bonus` para detectar quando a bola colidiu com ele
        bonus.addEventListener('collision', () => {
          function update() {
            // Verifica a colisão da bola com o bônus
            if (ball_coord.getBoundingClientRect().intersects(bonus.getBoundingClientRect())) {
              // Atualiza a cor dos paddles
              paddle_1.style.backgroundColor = Math.floor(Math.random() * 255) + ',' +
                                              Math.floor(Math.random() * 255) + ',' +
                                              Math.floor(Math.random() * 255);
              paddle_2.style.backgroundColor = Math.floor(Math.random() * 255) + ',' +
                                              Math.floor(Math.random() * 255) + ',' +
                                              Math.floor(Math.random() * 255);
          
              // Remove o bônus do tabuleiro
              bonus.remove();
            }}});

              
        //Adiciona um listener de eventos ao documento para fazer a captura dos pressionamentos de teclas
        document.addEventListener('keydown', (e) => {
          //Se a tecla pressionada for enter, o jogo começa
          if (e.key == 'Enter') {
            gameState = gameState == 'start' ? 'play' : 'start';
            //Se o jogo estiver em andamento, a bola começa a se movimentar
            if (gameState == 'play') {
              message.innerHTML = 'Game Started';
              message.style.left = 42 + 'vw';
              requestAnimationFrame(() => {
                dx = 4;
                dy = 4;
                dxd = Math.floor(Math.random() * 2);
                dyd = Math.floor(Math.random() * 2);
                moveBall(dx, dy, dxd, dyd);  
              });
            }
          }
          if (gameState == 'play') {
            //Movimentação do paddle 1 para cima, baixo, esquerda e direita
            if (e.key == 'w') {
              paddle_1.style.top =
                Math.max(
                  board_coord.top,
                  paddle_1_coord.top - window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }
            if (e.key == 's') {
              paddle_1.style.top =
                Math.min(
                  board_coord.bottom - paddle_common.height,
                  paddle_1_coord.top + window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }
            if (e.key == 'a') {
              paddle_1.style.left =
                Math.max(
                  board_coord.left,
                  paddle_1_coord.left - window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }
            if (e.key == 'd') {
              paddle_1.style.left =
                Math.min(
                  board_coord.right - (paddle_common.height*0.15),
                  paddle_1_coord.right + window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }

            //Movimentação do paddle 2 para cima, baixo, esquerda e direita
            if (e.key == 'ArrowUp') {
              paddle_2.style.top =
                Math.max(
                  board_coord.top,
                  paddle_2_coord.top - window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            if (e.key == 'ArrowDown') {
              paddle_2.style.top =
                Math.min(
                  board_coord.bottom - paddle_common.height,
                  paddle_2_coord.top + window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            if (e.key == 'ArrowLeft') {
              paddle_2.style.left =
                Math.max(
                  board_coord.left,
                  paddle_2_coord.left - window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            if (e.key == 'ArrowRight') {
              paddle_2.style.left =
                Math.min(
                  board_coord.right - (paddle_common.height*0.15),
                  paddle_2_coord.right + window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            
            //invalidar tecla alt
            if(e.key == "Alt"){
              e.preventDefault();
              //alert("tecla Invalida");
            }
          }
        });

        //Função de movimentação da bola onde dx é a direção horizontal, dy é a direção vertical e dxd e dyd é a direção da bola no proximo update
        function moveBall(dx, dy, dxd, dyd) {
          if (ball_coord.top <= board_coord.top) {
            dyd = 1;
          }       
          //Verifica se a bola colidiu com as bordas do tabuleiro, se sim o jogo é reiniciado
          if (ball_coord.bottom >= board_coord.bottom) {
            dyd = 0;
          }
          //Verifica se a bola colidiu com o paddle 1, se sim a direção da bola é invertida
          if (
            ball_coord.left <= paddle_1_coord.right &&
            ball_coord.top >= paddle_1_coord.top &&
            ball_coord.bottom <= paddle_1_coord.bottom
          ) {
            dxd = 1;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          //Verifica se a bola colidiu com o paddle 2, se sim a direção da bola é invertida
          if (
            ball_coord.right >= paddle_2_coord.left &&
            ball_coord.top >= paddle_2_coord.top &&
            ball_coord.bottom <= paddle_2_coord.bottom
          ) {
            dxd = 0;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          if (
            ball_coord.left <= board_coord.left ||
            ball_coord.right >= board_coord.right
          ) {
            //Atualiza o placar
            if (ball_coord.left <= board_coord.left) {
              score_2.innerHTML = +score_2.innerHTML + 1;
            } else {
              score_1.innerHTML = +score_1.innerHTML + 1;
            }
            gameState = 'start';   
            ball_coord = initial_ball_coord;
            ball.style = initial_ball.style;
            message.innerHTML = 'Press Enter to Play Pong';
            message.style.left = 38 + 'vw'; 
            return;
          }
          // Atualiza as coordenadas da bola
          ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
          ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
          ball_coord = ball.getBoundingClientRect();
          // Chama a função novamente
          requestAnimationFrame(() => {
            moveBall(dx, dy, dxd, dyd);
            update();
          });
        }