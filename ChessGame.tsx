const handleCellClick = (x: number, y: number) => {
    if (gameState !== 'waitingForMove') return;

    // Ստուգում ենք՝ արդյոք քայլը թույլատրելի է (հարևան վանդակ)
    const dx = Math.abs(x - playerPos.x);
    const dy = Math.abs(y - playerPos.y);
    
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1)) {
      // 1. Սկզբից թարմացնում ենք դիրքը
      setPlayerPos({ x, y });
      
      // 2. Ստուգում ենք հաղթանակը
      if (x === pabloPos.x && y === pabloPos.y) {
        setGameState('won');
        return;
      }

      // 3. Փոքր դադարից հետո անցնում ենք հաջորդ հարցին
      setTimeout(() => {
        setGameState('playing');
        nextQuestion();
      }, 600); // Այս դադարը թույլ է տալիս անիմացիային ավարտվել
    }
  };
