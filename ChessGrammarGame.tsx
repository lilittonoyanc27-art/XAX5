import React, { useState, useEffect, useMemo } from 'react';
import { Chess, Move } from 'chess.js';
import { Chessboard } from 'react-chessboard';
const Board = Chessboard as any;
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Navigation,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Sword
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  explanation: string;
  explanationAm: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Ինչպե՞ս կլինի իսպաներեն «Թեքվիր աջ»:',
    options: ['Gira a la izquierda', 'Gira a la derecha', 'Sigue todo recto'],
    correct: 'Gira a la derecha',
    explanation: '"Derecha" significa derecha.',
    explanationAm: '«Derecha» նշանակում է աջ:'
  },
  {
    id: 2,
    text: 'Ինչպե՞ս կլինի իսպաներեն «Թեքվիր ձախ»:',
    options: ['Gira a la izquierda', 'Gira a la derecha', 'Sigue todo recto'],
    correct: 'Gira a la izquierda',
    explanation: '"Izquierda" significa izquierda.',
    explanationAm: '«Izquierda» նշանակում է ձախ:'
  },
  {
    id: 3,
    text: 'Լրացրեք նախադասությունը. "El rey está en el ____ del tablero" (Թագավորը տախտակի ԿԵՆՏՐՈՆՈՒՄ է):',
    options: ['lejos', 'cerca', 'centro'],
    correct: 'centro',
    explanation: '"Centro" se usa para el medio de algo.',
    explanationAm: '«Centro»-ն օգտագործվում է ինչ-որ բանի մեջտեղը նշելու համար:'
  },
  {
    id: 4,
    text: 'Ինչպե՞ս կլինի իսպաներեն «Գնա ուղիղ»:',
    options: ['Gira a la derecha', 'Sigue todo recto', 'Está cerca'],
    correct: 'Sigue todo recto',
    explanation: '"Todo recto" significa en línea recta.',
    explanationAm: '«Todo recto» նշանակում է ուղիղ գծով:'
  },
  {
    id: 5,
    text: 'Լրացրեք նախադասությունը. "La reina está ____ del rey" (Թագուհին թագավորին ՄՈՏ է):',
    options: ['lejos', 'cerca', 'derecha'],
    correct: 'cerca',
    explanation: '"Cerca" indica proximidad.',
    explanationAm: '«Cerca»-ն ցույց է տալիս մոտիկություն:'
  },
  {
    id: 6,
    text: 'Ինչպե՞ս կլինի իսպաներեն «Հեռու»:',
    options: ['Cerca', 'Lejos', 'Centro'],
    correct: 'Lejos',
    explanation: '"Lejos" indica gran distancia.',
    explanationAm: '«Lejos»-ը ցույց է տալիս մեծ հեռավորություն:'
  }
];

export default function ChessGrammarGame() {
  const [game, setGame] = useState(new Chess());
  const [moveCredit, setMoveCredit] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; messageAm: string } | null>(null);
  const [moveStatus, setMoveStatus] = useState<string>('Պատասխանիր հարցին, որպեսզի քայլ կատարես:');

  const isGameOver = game.isGameOver();
  const isCheckmate = game.isCheckmate();
  const isDraw = game.isDraw();

  const currentQuestion = QUESTIONS[currentQuestionIndex % QUESTIONS.length];

  const makeAMove = React.useCallback((move: any) => {
    try {
      const gameCopy = new Chess(game.fen());
      const result = gameCopy.move(move);
      
      if (result) {
        setGame(gameCopy);
        setMoveCredit(false);
        setMoveStatus('Քայլը կատարված է: Հաջորդ հարցը...');
        
        if (!gameCopy.isGameOver()) {
          // Automatic computer move after 1 second
          setTimeout(() => {
            setGame((currentBoard) => {
              const boardCopy = new Chess(currentBoard.fen());
              const moves = boardCopy.moves();
              if (moves.length > 0 && boardCopy.turn() === 'b') {
                const computerMove = moves[Math.floor(Math.random() * moves.length)];
                boardCopy.move(computerMove);
                
                if (boardCopy.isGameOver()) {
                  setMoveStatus('Խաղն ավարտվեց!');
                } else {
                  setMoveStatus('Մրցակիցը կատարեց իր քայլը: Պատասխանիր հաջորդ հարցին:');
                  setCurrentQuestionIndex(prev => prev + 1);
                  setFeedback(null);
                  setSelectedOption(null);
                }
                return boardCopy;
              }
              return currentBoard;
            });
          }, 1000);
        } else {
          setMoveStatus('Խաղն ավարտվեց!');
        }
        return true;
      } else {
        setMoveStatus('Անթույլատրելի քայլ: Փորձիր մեկ այլ քայլ:');
        return false;
      }
    } catch (e) {
      console.error("Move error:", e);
      setMoveStatus('Անթույլատրելի քայլ:');
      return false;
    }
  }, [game]);

  const onDrop = React.useCallback((sourceSquare: string, targetSquare: string) => {
    if (isGameOver) return false;
    
    // Get the piece from the game state
    const piece = game.get(sourceSquare as any);
    
    // Ensure it's white's turn and user is moving a white piece
    if (game.turn() !== 'w' || !piece || piece.color !== 'w') return false;
    
    if (!moveCredit) {
      setMoveStatus('Սխալ! Նախ պետք է ճիշտ պատասխանել հարցին:');
      return false;
    }
    
    return makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
  }, [game, isGameOver, moveCredit, makeAMove]);

  // Prevent dragging if it's not the user's turn
  const isDraggablePiece = React.useCallback(({ piece }: { piece: string }) => {
    if (isGameOver) return false;
    if (game.turn() !== 'w') return false;
    if (piece[0] !== 'w') return false; 
    return true;
  }, [game, isGameOver]);

  const handleOptionClick = (option: string) => {
    if (feedback?.isCorrect) return;
    
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correct;
    
    setFeedback({
      isCorrect,
      message: currentQuestion.explanation,
      messageAm: currentQuestion.explanationAm
    });

    if (isCorrect) {
      setMoveCredit(true);
      setMoveStatus('Ճիշտ է! Այժմ կարող ես կատարել քո քայլը շախմատի տախտակի վրա:');
    } else {
      setMoveCredit(false);
      setMoveStatus('Սխալ պատասխան: Փորձիր նորից, որպեսզի քայլի իրավունք ստանաս:');
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setMoveCredit(false);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setSelectedOption(null);
    setMoveStatus('Պատասխանիր հարցին, որպեսզի քայլ կատարես:');
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] text-slate-800 font-sans p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-6xl w-full space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sword className="w-4 h-4" />
            Շախմատային Գրամատիկա
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
            ՍՈՎՈՐԻՐ <span className="text-orange-500">ԻՍՊԱՆԵՐԵՆ</span> ԽԱՂԱԼՈՎ
          </h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Ճիշտ պատասխանիր իսպաներենի հարցերին, որպեսզի ստանաս քայլ կատարելու հնարավորություն: Բոլոր ֆիգուրները տեղում են:
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chessboard Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`p-4 bg-white rounded-[2.5rem] shadow-2xl border-4 overflow-hidden aspect-square max-w-[600px] mx-auto relative transition-all duration-500 ${moveCredit ? 'border-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.3)]' : 'border-orange-200'}`}>
              {isGameOver && (
                <div className="absolute inset-0 z-10 bg-black/60 flex flex-col items-center justify-center text-white p-8 text-center rounded-[2rem]">
                  <Trophy className="w-16 h-16 text-yellow-400 mb-4" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                    {isCheckmate ? 'ՄԱՏ!' : 'ՈՉ-ՈՔԻ'}
                  </h2>
                  <p className="text-lg opacity-80 mb-6">
                    {isCheckmate 
                      ? (game.turn() === 'w' ? 'Սևերը հաղթեցին' : 'Սպիտակները հաղթեցին')
                      : 'Խաղն ավարտվեց ոչ-ոքի:'}
                  </p>
                  <button 
                    onClick={resetGame}
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all"
                  >
                    ԽԱՂԱԼ ՆՈՐԻՑ
                  </button>
                </div>
              )}
              <Board 
                id="BasicBoard"
                key={`board-${game.fen()}-${moveCredit}`}
                position={game.fen()} 
                onPieceDrop={onDrop}
                isDraggablePiece={isDraggablePiece}
                boardOrientation="white"
                customDarkSquareStyle={{ backgroundColor: '#f97316' }}
                customLightSquareStyle={{ backgroundColor: '#ffedd5' }}
                animationDuration={200}
                arePiecesDraggable={moveCredit && !isGameOver && game.turn() === 'w'}
              />
            </div>
            
            {/* Status Bar */}
            <div className={`p-4 rounded-2xl border-2 text-center font-bold text-sm uppercase tracking-wider transition-all ${moveCredit ? 'bg-emerald-100 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100' : 'bg-white border-orange-100 text-slate-400'}`}>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  {moveCredit ? <ShieldCheck className="w-5 h-5" /> : <Navigation className="w-5 h-5" />}
                  {moveStatus}
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${game.turn() === 'w' ? 'bg-white border border-slate-300' : 'bg-slate-800'}`} />
                  <span className="text-[10px]">{game.turn() === 'w' ? 'Քո հերթն է' : 'Մրցակցի հերթն է'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8 rounded-[2.5rem] space-y-8 shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-orange-500 font-mono text-xs uppercase tracking-widest">
                    <Lightbulb className="w-4 h-4" />
                    Հարց {currentQuestionIndex + 1}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                    {currentQuestion.text}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      disabled={feedback?.isCorrect}
                      className={`
                        p-5 rounded-2xl text-left font-bold text-lg transition-all border-2
                        ${selectedOption === option 
                          ? (option === currentQuestion.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700')
                          : 'bg-white border-orange-50 hover:border-orange-200 hover:bg-orange-50/30'}
                        ${feedback && option === currentQuestion.correct && selectedOption !== option ? 'border-emerald-500 bg-emerald-50/50' : ''}
                      `}
                    >
                      <div className="flex justify-between items-center">
                        {option}
                        {selectedOption === option && (
                          option === currentQuestion.correct ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-2xl border ${feedback.isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}
                  >
                    <p className="font-bold mb-1">{feedback.isCorrect ? 'Ճիշտ է!' : 'Սխալ է'}</p>
                    <p className="text-sm opacity-80 mb-2">{feedback.messageAm}</p>
                    <p className="text-xs italic opacity-60">{feedback.message}</p>
                  </motion.div>
                )}

                {feedback?.isCorrect && !moveCredit && (
                   <button
                    onClick={() => {
                      setFeedback(null);
                      setSelectedOption(null);
                      setCurrentQuestionIndex(prev => prev + 1);
                    }}
                    className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    ՀԱՋՈՐԴ ՀԱՐՑԸ <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Game Stats/Info */}
            <div className="p-6 bg-white/40 rounded-[2rem] border border-orange-100 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 text-center">Ինչպես խաղալ</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">1.</span> Պատասխանիր հարցին ճիշտ:
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">2.</span> Ստացիր քայլի իրավունք (Move Credit):
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">3.</span> Տեղաշարժիր քո ֆիգուրը տախտակի վրա:
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-500 font-bold">4.</span> Մրցակիցը կպատասխանի իր քայլով:
                </li>
              </ul>
              <button 
                onClick={resetGame}
                className="w-full py-3 bg-white border border-orange-200 text-orange-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Վերսկսել խաղը
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-orange-100 flex justify-between items-center text-orange-600/30 text-xs font-mono uppercase tracking-widest pb-8">
          <div className="flex items-center gap-2">
            <Sword className="w-4 h-4" />
            <span>Spanish Chess Grammar</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>A0 Level</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
