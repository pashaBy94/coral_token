import "@stdlib/deploy";
import "./messages";

contract JetonWallet with Deployable {
    parent: Address;
    owner: Address;
    balance: Int as coins;
    init(parent: Address, owner: Address) {
        self.parent = parent;
        self.owner = owner;
        self.balance = 0;
    }
    receive(msg: InternalAdd){
        if(msg.origin == self.parent){
            require(sender() == self.parent,"Parent Only");

        } else {
            let init: StateInit = initOf JetonWallet(self.parent, msg.origin);
            require(sender() == contractAddress(init),"");
        }
        self.balance = self.balance + msg.amount;
    }
    receive(msg: Transfer){
        require(sender() == self.owner,"Only owner");
        require(self.balance >= msg.amount,"Not enogh balance");
        self.balance = self.balance - msg.amount;   
        let init: StateInit = initOf JetonWallet(self.parent, msg.to);
        send(SendParameters{
            to: contractAddress(init),
            body: InternalAdd{amount: msg.amount, origin: self.owner}.toCell(),
            value: ton("0.03"),
            mode: SendIgnoreErrors ,
            code: init.code,
            data: init.data
        });
        self.reply("transferd".asComment());
    }
}
