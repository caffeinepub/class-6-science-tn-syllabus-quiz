import Principal "mo:core/Principal";

actor {
  public shared ({ caller }) func getEgoPrincipal() : async Principal {
    caller;
  };
};
