export class Transaction {
    constructor(
        private userId: string,
        private date: string,
        private type: string,
        private value: number,
        private description: string,
        private createdAt: string,
        private updatedAt: string,
    ) { }
}