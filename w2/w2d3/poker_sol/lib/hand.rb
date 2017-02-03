require_relative './poker_hands'

class Hand

  include PokerHands
  attr_reader :cards

  def initialize(cards)
    raise "must have five cards" unless cards.size == 5
    @cards = cards
  end

  def trade_cards(take_cards, new_cards)
    raise "must have five cards" unless take_cards.size == new_cards.size
    raise "cannot discard unowned card" unless take_cards.all? { |c| @cards.include?(c) }

    traded = @cards.select { |c| take_cards.include?(c) }
    @cards.reject! { |c| take_cards.include?(c) }
    @cards += new_cards
  end

  def self.winner(hands)
    hands.sort{ |h1, h2| h1.rank <=> h2.rank }.last
  end



end
