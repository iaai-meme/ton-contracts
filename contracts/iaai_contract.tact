import "@stdlib/deploy";
import "@stdlib/ownable";

contract IAAIContract with Ownable, Deployable {
    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }

    receive("transfer") {
        self.requireOwner();
        send(SendParameters{
            to: self.owner,
            value: 0, 
            mode: SendRemainingBalance | SendBounceIfActionFail,
            body: emptyCell()
        });
    }

    receive(str: String) {
    }

    get fun balance(): Int {
        return myBalance();
    }
}
