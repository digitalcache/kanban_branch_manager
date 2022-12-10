export interface BranchButton {
    type: string;
    name: string;
    moveLeft(name: string, type: string): void;
    moveRight(name: string, type: string): void;
}