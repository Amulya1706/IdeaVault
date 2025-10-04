module idea_vault::ideavault {
    use std::string;
    use std::signer;
    use aptos_framework::timestamp;

    struct Proof has key, store {
        owner: address,
        hash_hex: string::String,
        ts_micro: u64,
    }

    /// Idempotent: overwrite if the resource already exists.
    public entry fun store_proof(account: &signer, hash_hex: string::String) {
        let addr = signer::address_of(account);
        let ts = timestamp::now_microseconds();

        if (exists<Proof>(addr)) {
            let p = borrow_global_mut<Proof>(addr);
            p.hash_hex = hash_hex;
            p.ts_micro = ts;
        } else {
            move_to(account, Proof { owner: addr, hash_hex, ts_micro: ts });
        }
    }

    /// Read-only view so you can call with `aptos move view`
    #[view]
    public fun read_proof(addr: address): (string::String, u64) acquires Proof {
        let p = borrow_global<Proof>(addr);
        (p.hash_hex, p.ts_micro)
    }
}
