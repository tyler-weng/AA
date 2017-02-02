require_relative './card'
require_relative './hand'

class Deck

  def initialize(deck = Deck.all_cards)
    @deck = deck
  end

  def self.all_cards
    @deck = []

    Card.suits.each do |suit|
      Card.values.each do |value|
        @deck << Card.new(suit, value)
      end
    end

    @deck
  end

  def count
    @deck.length
  end

  def take(n)
    raise "not enough cards" if n > self.count
    @deck.shift(n)
  end

  def return(cards)
    @deck.push(*cards)
  end

  def shuffle
    @deck.shuffle!
  end

  def deal_hand
    Hand.new(self.take(5))
  end

end
