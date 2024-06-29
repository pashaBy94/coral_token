import "@stdlib/deploy";
import "./jeton_wallet";
import "./messages";

contract JetonMaster with Deployable {
    symbol: String;
    totalCount: Int as coins;
    init(nameJeton: String) {
        self.totalCount = ton("500");
        self.symbol = nameJeton;
        self.mint(sender(), self.totalCount);
    }
    fun mint(to: Address, amount: Int){
        let init: StateInit = initOf JetonWallet(myAddress(), to);
        send(SendParameters{
            to: contractAddress(init),
            body: InternalAdd{amount: amount, origin: myAddress()}.toCell(),
            value: ton("0.03"),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });
    }
}
