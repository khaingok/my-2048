import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

type Board = number[][];
type Direction = "up" | "down" | "left" | "right";

const SIZE = 4;

const createEmptyBoard = (): Board =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const cloneBoard = (b: Board): Board => b.map(row => [...row]);

const transpose = (b: Board): Board =>
  b[0].map((_, c) => b.map(r => r[c]));

const reverseRows = (b: Board): Board => b.map(r => [...r].reverse());

/** Slide + combine one row to the left. (UNCHANGED) */
const slideAndCombineRow = (row: number[]) => {
  const filtered = row.filter(v => v !== 0);
  const newRow: number[] = [];
  let gained = 0;
  let i = 0;

  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      newRow.push(merged);
      gained += merged;
      i += 2;
    } else {
      newRow.push(filtered[i]);
      i++;
    }
  }

  while (newRow.length < SIZE) newRow.push(0);
  const moved = newRow.some((v, idx) => v !== row[idx]);

  return { newRow, gained, moved };
};

const moveLeft = (b: Board) => {
  let totalGained = 0;
  let anyMoved = false;
  const newBoard = b.map(row => {
    const { newRow, gained, moved } = slideAndCombineRow(row);
    totalGained += gained;
    if (moved) anyMoved = true;
    return newRow;
  });
  return { board: newBoard, gained: totalGained, moved: anyMoved };
};

const moveRight = (b: Board) => {
  const reversed = reverseRows(b);
  const { board, gained, moved } = moveLeft(reversed);
  return { board: reverseRows(board), gained, moved };
};

const moveUp = (b: Board) => {
  const transposed = transpose(b);
  const { board, gained, moved } = moveLeft(transposed);
  return { board: transpose(board), gained, moved };
};

const moveDown = (b: Board) => {
  const transposed = transpose(b);
  const { board, gained, moved } = moveRight(transposed);
  return { board: transpose(board), gained, moved };
};

const getRandomEmptyCell = (b: Board): [number, number] | null => {
  const empties: [number, number][] = [];
  b.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell === 0) empties.push([r, c]);
    })
  );
  if (empties.length === 0) return null;
  return empties[Math.floor(Math.random() * empties.length)];
};

const spawnTile = (b: Board): Board => {
  const newB = cloneBoard(b);
  const cell = getRandomEmptyCell(newB);
  if (!cell) return newB;
  const [r, c] = cell;
  newB[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newB;
};

const hasAnyMoves = (b: Board) => {
  // Any empty spaces
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (b[r][c] === 0) return true;
    }
  }
  // Any mergeable neighbors
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (c < SIZE - 1 && b[r][c] === b[r][c + 1]) return true;
      if (r < SIZE - 1 && b[r][c] === b[r + 1][c]) return true;
    }
  }
  return false;
};

export const useGameLogic = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [score, setScore] = useState<number>(0);

  // Best score persisted in localStorage
  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem("bestScore");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [gameOver, setGameOver] = useState<boolean>(false);

  // startGame (keeps your existing start behavior)
  const startGame = useCallback(() => {
    let b = createEmptyBoard();
    b = spawnTile(b);
    b = spawnTile(b);
    setBoard(b);
    setScore(0);
    setGameOver(false);
  }, []);

  // expose restart() as a stable alias to startGame
  const restart = useCallback(() => {
    startGame();
  }, [startGame]);

  const move = useCallback(
    (direction: Direction) => {
      if (gameOver) return;

      let result:
        | { board: Board; gained: number; moved: boolean }
        | undefined;

      if (direction === "left") result = moveLeft(board);
      else if (direction === "right") result = moveRight(board);
      else if (direction === "up") result = moveUp(board);
      else if (direction === "down") result = moveDown(board);

      if (!result || !result.moved) return;

      const newBoard = spawnTile(result.board);
      setBoard(newBoard);

      if (result.gained > 0) {
        // update score and best score (functional update to be safe)
        setScore(prev => {
          const newScore = prev + result.gained;
          // update best if needed
          if (newScore > bestScore) {
            setBestScore(newScore);
            localStorage.setItem("bestScore", String(newScore));
          }
          return newScore;
        });
      }

      if (!hasAnyMoves(newBoard)) {
        setGameOver(true);
      }
    },
    // keep same deps plus bestScore (we only read it here)
    [board, gameOver, bestScore]
  );

  // keyboard listener (unchanged mapping)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.startsWith("Arrow")) e.preventDefault();
      if (e.key === "ArrowUp") move("up");
      else if (e.key === "ArrowDown") move("down");
      else if (e.key === "ArrowLeft") move("left");
      else if (e.key === "ArrowRight") move("right");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  // start on mount (same as before)
  useEffect(() => {
    startGame();
  }, [startGame]);
  

  // Save game to backend
  const saveGame = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save your game.");
      return;
    }
    try {
      await axios.post(
        `${API_BASE}/api/game`,
        { board, score, bestScore },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Game saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save game");
    }
  };

  // Load game from backend
  const loadGame = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to load your game.");
      return;
    }
    try {
      const { data } = await axios.get(`${API_BASE}/api/game`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBoard(data.board);
      setScore(data.score);
      setGameOver(!hasAnyMoves(data.board));
      alert("Game loaded!");
    } catch (err) {
      console.error(err);
      alert("No saved game found");
    }
  };

  return {
    board,
    score,
    bestScore,
    gameOver,
    move,
    startGame,
    restart,
    saveGame,
    loadGame
  };
};
