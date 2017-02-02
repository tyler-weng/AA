class Player

  attr_accessor :bankroll, :hand, :folded

  def initialize(bankroll)
    @bankroll = bankroll
    @hand = []
    @folded = false
  end

  def self.buy_in(bankroll)
    Player.new(bankroll)
  end

  def deal_in(hand)
    self.hand = hand
  end

  def take_bet(amt)
    raise "not enough money" if amt > @bankroll
    @bankroll -= amt
    amt
  end

  def receive_winnings(amt)
    @bankroll += amt
  end

  def return_cards
    returned = @hand.cards
    @hand = nil
    returned
  end

  def fold
    @folded = true
  end

  def unfold
    @folded = false
  end

  def folded?
    @bankroll == 0 || @folded
  end

end
