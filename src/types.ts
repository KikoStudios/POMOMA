export interface Player {
  id: string;
  name: string;
  money: number;
  isFolded: boolean;
  currentBet: number;
  loans: Loan[];
  isActive: boolean;
  lastActive: number;
  isAllIn: boolean;
  lastBetAmount: number;
  needsAction: boolean;
  hasEndedBetting: boolean;
}

export interface Loan {
  id: string;
  from: string;
  amount: number;
  interestType: 'overall' | 'per_round' | 'gift';
  interestAmount: number;
  totalOwed: number;
  isPaid: boolean;
}

export interface Card {
  value: string;
  suit: string;
}

export type AsyncGameAction = {
  type: 'JOIN_GAME' | 'SET_INITIAL_STATE';
  payload: Promise<any>;
};

export type SyncGameAction = {
  type: Exclude<GameAction['type'], AsyncGameAction['type']>;
  payload?: any;
};

export type GameAction = AsyncGameAction | SyncGameAction;

export type LoanRequestStatus = 'pending' | 'approved' | 'rejected';

export interface LoanRequest {
  id: string;
  fromPlayerId: string;
  toPlayerId: string;
  amount: number;
  interestType: 'overall' | 'per_round';
  interestAmount: number;
  status: LoanRequestStatus;
  timestamp: number;
}

export interface GameState {
  gameCode: string;
  host: string;
  hostLastActive: number;
  players: Player[];
  currentRound: number;
  currentEpoch: number;
  highestBet: number;
  moneyPool: number;
  bankLoansEnabled: boolean;
  initialMoney: number;
  communityCards: Card[];
  gameStatus: 'waiting' | 'active' | 'finished' | 'cancelled' | 'host_reconnecting';
  lastStateUpdate: number;
  loanRequests?: LoanRequest[];
  spectators: string[];
  actionLog: GameAction[];
  showWinnerSelection: boolean;
}